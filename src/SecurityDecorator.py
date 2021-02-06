from flask import request
from google.auth.transport import requests
import google.oauth2.id_token
from server.ProjektAdministration import ProjektAdministration


def secured(function):
    firebase_request_adapter = requests.Request()

    def wrapper(*args, **kwargs):
        '''
        Hier werden alle in Cookies, welche in der Anmeldung vergeben werden, abgefragt
        '''
        id_token = request.cookies.get("token")
        rolle = request.cookies.get("rolle")
        name = request.cookies.get("name")
        kuerzel = request.cookies.get("kuerzel")
        mat_nr = request.cookies.get("mat_nr")

        error_message = None
        claims = None
        objects = None

        if id_token:
            try:
                #hier wird der firebase token verifiziert
                claims = google.oauth2.id_token.verify_firebase_token(
                    id_token, firebase_request_adapter
                )
                if claims is not None:
                    adm = ProjektAdministration()

                    google_user_id = claims.get("user_id")
                    email = claims.get("email")
                    #wenn die Rolle Student gewählt wurde, wird ein Student erstellt oder aktualisiert
                    if rolle == "Student":
                        student = adm.get_student_by_google_user_id(google_user_id)
                        if student is not None:
                            ''' 
                            Der Student befindet sich bereits in der Datenbank.
                            Demnach wird das Student BO aktualisiert
                            '''
                            student.set_name(name)
                            student.set_email(email)
                            student.set_kuerzel(kuerzel)
                            student.set_mat_nr(mat_nr)
                            adm.save_student(student)
                        else:
                            '''
                            Das System kennt den Studenten nicht.
                            Es wird ein neuer Student angelegt
                            '''
                            student = adm.create_student(name, email, google_user_id, kuerzel, mat_nr)
                    #wenn eine andere Rolle gewählt wurde wird hierfür die Klasse Person verwendet
                    else:
                        person = adm.get_person_by_google_user_id(google_user_id)
                        if person is not None:
                                ''' 
                                Die Person befindet sich bereits in der Datenbank.
                                Demnach wird das Person BO aktualisiert
                                '''
                                person.set_name(name)
                                person.set_email(email)
                                person.set_rolle(rolle)
                                adm.save_person(person)
                        else:
                            '''
                            Das System kennt die Person nicht.
                            Es wird eine neue Person angelegt
                            '''
                            person = adm.create_person(name, email, google_user_id, rolle)

                    print(request.method, request.path, 'asked by:', name, email)

                    objects = function(*args, **kwargs)
                    return objects
                else:
                    return '', 401  # UNAUTHORIZED
            except ValueError as exc:
                '''
                If checks failed (token expired etc this exception will be raised)
                '''
                error_message = str(exc)
                return exc, 401  # UNAUTHORIZED
        return '', 401  # UNAUTHORIZED

    return wrapper
