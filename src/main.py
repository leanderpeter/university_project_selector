# Die WahlfachApp basiert auf Flask
from flask import Flask
# Die Flask Erweiterung Flask CORS wird für Cross-Origin Resource Sharing verwendet
from flask_cors import CORS
# Des Weiteren wird das auf Flask aufbauende Flask-RestX verwendet
from flask_restx import Api, Resource, fields
from flask import request
import json

# Zugriff auf Applikationslogik inklusive BusinessObject-Klassen
from server.ProjektAdministration import ProjektAdministration
from server.bo.Teilnahme import Teilnahme
from server.bo.Projekt import Projekt
from server.bo.Modul import Modul
from server.bo.Semester import Semester
from server.bo.Projektart import Projektart

#SecurityDecorator
from SecurityDecorator import secured


class NullableInteger(fields.Integer):
    """Diese Klasse ermöglicht die Umsetzung eines Integers, welcher auch den Wert null bzw. None haben kann 
    """
    __schema_type__ = ['integer', 'null']
    __schema_example__ = 'nullable integer'

"""Flask wird hiermit instanziert"""
app = Flask(__name__)

CORS(app, support_credentials=True, resources={r'/electivApp/*': {"origins": "*"}})


api = Api(app, version='1.0', title='electivApp API',
          description='Web App for choosing electiv subjects for the university')

"""Namespaces"""
electivApp = api.namespace('electivApp', description='Functions of electivApp')

"""Hier wird definiert, wie die Businessobjects beim Marshelling definiert 
werden sollen"""
bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='ID des BOs'),
})

automat = api.model('Automat',{
    'aktueller_zustand': fields.String(attribute='_aktueller_zustand', description='ID des aktuellen Zustands des Automaten')
})

nbo = api.inherit('NamedBusinessObject', bo, {
    'name': fields.String(attribute='_name', description='Name des BOs'),
})

person = api.inherit('Person', nbo, {
    'email': fields.String(attribute='_email', description='Email der Person'),
    'google_user_id': fields.String(attribute='_google_user_id', description='Google user ID der Person'),
    'rolle': fields.String(attribute='_rolle', description='Rolle der Person')
})

student = api.inherit('Student', person, {
    'mat_nr': fields.Integer(attribute='_mat_nr', description='Die Matrikelnummer des Studenten'),
    'kuerzel': fields.String(attribute='_kuerzel', description='Kuerzel des Studenten')
})

projekt = api.inherit('Projekt', nbo, automat, {
    'max_teilnehmer': fields.Integer(attribute='_max_teilnehmer', description='Maximale Anzahl an teilnehmern'),
    'beschreibung': fields.String(attribute='_projektbeschreibung', description='Kurzbeschreibung des Projekts'),
    'betreuer': fields.String(attribute='_betreuer', description='Name des Betreuers'),
    'externer_partner': fields.String(attribute='_externer_partner', description='Name des externen Partners'),
    'woechentlich': fields.Integer(attribute='_woechentlich',
                                   description='Bool ob das Projekt oeffentlich stattfindet'),
    'anzahl_block_vor': fields.Integer(attribute='_anzahl_block_vor',
                                       description='Anzahl Blocktage vor der Vorlesungszeit'),
    'anzahl_block_in': fields.Integer(attribute='_anzahl_block_in',
                                      description='Anzahl Blocktage in der Vorlesungszeit'),
    'praeferierte_block': fields.String(attribute='_praeferierte_block', description=' Praeferierte Blocktage'),
    'bes_raum': fields.Integer(attribute='_bes_raum', description='Bool ob ein besonderer Raum notwendig ist'),
    'raum': fields.String(attribute='_raum', description='Raum des Projekts'),
    'sprache': fields.String(attribute='_sprache', description='Sprache des Projekts'),
    'dozent': fields.Integer(attribute='_dozent', description='Der Dozent des Projekts'),
    'halbjahr': fields.Integer(attribute='_halbjahr', description='Die ID des Semesters des Projekts'),
    'art': fields.Integer(attribute='_art', description='Die ID der Projektart'),
    'anzahlTeilnehmer': fields.String(attribute='_anzahlTeilnehmer', description='Die Anzahl der angemeldeten Teilnehmer'),
    'teilnehmerListe': fields.String(attribute='_teilnehmerListe', description='Liste mit IDs der Teilnehmer')
})


teilnahme = api.inherit('Teilnahme', bo, {
    'teilnehmer': fields.Integer(attribute='_teilnehmer', description='Die ID des Studenten der Teilnahme'),
    'lehrangebot': fields.Integer(attribute='_lehrangebot', description='Die ID des Projekts der Teilnahme'),
    'anrechnung': NullableInteger(attribute='_anrechnung', description='Das Modul auf das die Teilnahme angerechnet wurde'),
    'resultat': NullableInteger(attribute='_resultat', description='Die ID der Note einer Teilnahme')
})

projektart = api.inherit('Projektart', nbo, {
    'sws': fields.Integer(attribute='_sws',description='Semesterwochenstunden'),
    'ects': fields.Integer(attribute='_ects',description='Ects fuer ein Projekt')
    })

bewertung = api.inherit('Bewertung', bo, {
    'note': fields.Float(attribute='_note', description='Die Note der Teilnahme'),
})

modul = api.inherit('Modul', nbo, {
    'edv_nr': fields.Integer(attribute='_edv_nr', description='Die EDV Nummer eines Moduls'),
})

semester = api.inherit('Semester', nbo, {
})


'''
@electivApp.route('/projekte')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjektListeOperationen(Resource):
    @electivApp.marshal_list_with(projekt)
   
    @secured
    def get(self):
        """Auslesen aller Projekte-Objekte mit Zustand NEU.

        Sollten keine Projekte-Objekte verfügbar sein, so wird eine
        leere Sequenz zurückgegeben."""

        print()
        adm = ProjektAdministration()
        #--------------------------------------------------------------------------- AUF .FORMAT('"{}"') ACHTEN!
        zus = "Neu"
        #--------------------------------------------------------------------------- AUF .FORMAT('"{}"') ACHTEN!
        projekte = adm.get_projekte_by_zustaende('"{}"'.format(zus))
        return projekte
'''

@electivApp.route('/projekte/zustand/<string:id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class Projektverwaltungoperation(Resource):
    @electivApp.marshal_list_with(projekt)

    @secured
    def get(self, id):
        """Auslesen eines bestimmten Projekte-Objekts mit dem aktuellen Zustand
        """
        result = []
        adm = ProjektAdministration()
        projekte = adm.get_projekte()

        if id == "Neu":
            for p in projekte:
                if p.is_in_state(Projekt.Z_NEU):
                    result.append(p)
        elif id == "Genehmigt":
            for r in projekte:
                if r.is_in_state(Projekt.Z_GENEHMIGT):
                    result.append(r)
        elif id == "in Bewertung":
            for s in projekte:
                if s.is_in_state(Projekt.Z_IN_BEWERTUNG):
                    result.append(s)
        elif id == "Abgeschlossen":
            for y in projekte:
                print(y.get_aktueller_zustand())
                if y.is_in_state(Projekt.Z_ABGESCHLOSSEN):
                    result.append(y)
        elif id == "Wahlfreigabe":
            for i in projekte:
                if i.is_in_state(Projekt.Z_WAHLFREIGABE):
                    result.append(i)
        elif id == "Abgelehnt":
            for n in projekte:
                if n.is_in_state(Projekt.Z_ABGELEHNT):
                    result.append(n)

        return result

@electivApp.route('/projekte/zustand/<string:zustand_id>/dozent/<int:dozent_id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjektByZustandByDozentoperation(Resource):
    @electivApp.marshal_list_with(projekt)
    @secured
    def get(self, zustand_id, dozent_id):
        """Auslesen eines Projekte-Objekts mit einem bestimmten Zustand und für einen bestimmten Dozent
        """
        result = []
        adm = ProjektAdministration()
        projekte = adm.get_projekte()
        for p in projekte:
            if str(p.get_aktueller_zustand()) == zustand_id and p.get_dozent() == dozent_id:
                result.append(p)
        return result

@electivApp.route('/projekte/zustand')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class Projektverwaltungzustandoperation(Resource):
    @electivApp.marshal_list_with(projekt)
    
    # @secured
    def put(self):       

        projektId = request.args.get("projektId")
        zustandId = request.args.get("zustandId")
        adm = ProjektAdministration()
        projekte = adm.get_projekte()
        

        for p in projekte:
            if p.get_id() == int(projektId):
                if zustandId == "Wahlfreigabe":
                    p.set_aktueller_zustand(Projekt.Z_WAHLFREIGABE)
                elif zustandId == "in Bewertung":
                    p.set_aktueller_zustand(Projekt.Z_IN_BEWERTUNG)
                elif zustandId == "Neu":
                    p.set_aktueller_zustand(Projekt.Z_NEU)
                elif zustandId == "Genehmigt":
                    p.set_aktueller_zustand(Projekt.Z_GENEHMIGT)
                elif zustandId == "Abgeschlossen":
                    p.set_aktueller_zustand(Projekt.Z_ABGESCHLOSSEN)
                elif zustandId == "Abgelehnt":
                    p.set_aktueller_zustand(Projekt.Z_ABGELEHNT)

                adm.save_projekt(p)
                return p


@electivApp.route('/projekt/<int:id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjektOperationen(Resource):
    @electivApp.marshal_list_with(projekt)
    
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Projekt-Objekts.

        Das auszulesende Objekt wird durch die id in dem URI bestimmt.
        """
        adm = ProjektAdministration()
        projekt = adm.get_projekt_by_id(id)
        return projekt

    @secured
    def delete(self, id):
        """Löschen eines bestimmten Projekt-Objekts.

        Das auszulesende Objekt wird durch die id in dem URI bestimmt.
        """
        adm = ProjektAdministration()
        adm.delete_projekt(id)

@electivApp.route('/teilnahmen/<int:id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TeilnahmeListeOperationen(Resource):
    @electivApp.marshal_list_with(teilnahme)
    
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Teilnahmen-Objekts.

        Das auszulesende Objekt wird durch die id in dem URI bestimmt.
        """

        adm = ProjektAdministration()
        teilnahmen = adm.get_teilnahmen_von_student(id)
        return teilnahmen


@electivApp.route('/teilnahmen/projekt/<int:id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TeilnahmeListeByProjektOperationen(Resource):
    @electivApp.marshal_list_with(teilnahme)
   
    @secured
    def get(self, id):
        """Auslesen von Teilnahmen eines bestimmten Projekts.

        Das auszulesende Objekt wird durch die id in dem URI bestimmt.
        """
        adm = ProjektAdministration()
        teilnahmen = adm.get_teilnahmen_by_projekt_id(id)
        return teilnahmen


@electivApp.route('/student/projekt/<int:id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class StudentListeByProjektOperationen(Resource):
    @electivApp.marshal_list_with(student)
    
    @secured
    def get(self, id):
        """Auslesen von Studenten eines bestimmten Projekts.

        Das auszulesende Objekt wird durch die id in dem URI bestimmt.
        """

        adm = ProjektAdministration()
        students = adm.get_students_by_projekt_id(id)
        return students


@electivApp.route('/person/<int:id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonByIDOperationen(Resource):
    @electivApp.marshal_list_with(person)
   
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Person-Objekts.

        Das auszulesende Objekt wird durch die id in dem URI bestimmt.
        """
        adm = ProjektAdministration()
        person = adm.get_person_by_id(id)
        return person

@electivApp.route('/personen')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonOperationen(Resource):
    @electivApp.marshal_list_with(person)
    
    @secured
    def get(self):
        """Auslesen aller Personen-Objekte.

        Sollten keine User-Objekte verfügbar sein,
        so wird eine leere Sequenz zurückgegeben."""

        adm = ProjektAdministration()
        persons = adm.get_all_persons()
        return persons

    @secured
    def put(self):
        """Update des User-Objekts."""

        userId = request.args.get("id")
        name = request.args.get("name")
        email = request.args.get("email")
        adm = ProjektAdministration()
        user = adm.get_person_by_id(userId)
        user.set_name(name)
        user.set_email(email)
        adm.update_person_by_id(user)

@electivApp.route('/personbygoogle/<string:google_user_id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonByGoogleIDOperationen(Resource):
    @electivApp.marshal_list_with(person)
    
    @secured
    def get(self, google_user_id):
        """Auslesen eines bestimmten User-Objekts.

        Das auszulesende Objekt wird durch die google_user_id in dem URI bestimmt.
        """
        adm = ProjektAdministration()
        person = adm.get_person_by_google_user_id(google_user_id)
        return person


@electivApp.route('/studentbygoogle/<string:google_user_id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class StudentByGoogleIDOperationen(Resource):
    @electivApp.marshal_list_with(student)
    
    @secured
    def get(self, google_user_id):
        """Auslesen eines bestimmten Student-Objekts.

        Das auszulesende Objekt wird durch die google_user_id in dem URI bestimmt.
        """
        adm = ProjektAdministration()
        student = adm.get_student_by_google_user_id(google_user_id)
        return student

@electivApp.route('/studenten')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class StudentenOperationen(Resource):
    @electivApp.marshal_list_with(student)
    
    @secured
    def get(self):
        """Auslesen aller Studenten-Objekte.

        Sollten keine Studenten-Objekte verfügbar sein,
        so wird eine leere Sequenz zurückgegeben."""
        adm = ProjektAdministration()
        studenten = adm.get_alle_studenten()
        return studenten

    @secured
    def put(self):
        """Update des Studenten-Objekts."""

        userId = request.args.get("id")
        name = request.args.get("name")
        matrNr = request.args.get("matrNr")
        adm = ProjektAdministration()
        student = adm.get_student_by_id(userId)
        student.set_name(name)
        student.set_mat_nr(matrNr)
        adm.update_student(student)


@electivApp.route('/student/<int:id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class StudentIDOperationen(Resource):
    @electivApp.marshal_list_with(student)
    
    @secured
    def get(self,id):
        """Auslesen eines bestimmten Student-Objekts.

        Das auszulesende Objekt wird durch die id in dem URI bestimmt.
        """
        adm = ProjektAdministration()
        student = adm.get_student_by_id(id)
        return student

    @secured
    def delete(self, id):
        """Löschen eines bestimmten Student-Objekts.

         Das zu löschende Objekt wird durch die id in dem URI bestimmt.
        """
        adm = ProjektAdministration()
        adm.delete_UserById(id)

 
@electivApp.route('/teilnahme')
@electivApp.response(500, 'Something went wrong')
class TeilnahmeOperationen(Resource):
    @secured
    def delete(self):
        """Löschen eines bestimmten Teihnahme-Objekts.
        
        Anhand der Lehrangebot ID und Teilnehmer ID
        """
        lehrangebotId = request.args.get("lehrangebotId")
        teilnehmerId = request.args.get("teilnehmerId")
        projektAdministration = ProjektAdministration()
        projektAdministration.delete_teilnahme(lehrangebotId, teilnehmerId)

    @secured
    def post(self):
        """Anlegen eines neuen Teinahme-Objekts für ein bestimmtes Lehrangebot."""
        lehrangebotId = request.args.get("lehrangebotId")
        teilnehmerId = request.args.get("teilnehmerId")
        projektAdministration = ProjektAdministration()
        projektAdministration.create_teilnahme(lehrangebotId, teilnehmerId)

@electivApp.route('/teilnahme/<int:id>')
@electivApp.response(500, 'Something went wrong')
class TeilnahmeByIdOperationen(Resource):
    @electivApp.marshal_with(teilnahme)
    @electivApp.expect(teilnahme, validate=True)
    @secured
    def put(self, id):
        """Update eines bestimmten Teilnahme-Objekts."""

        adm = ProjektAdministration()
        teilnahme = Teilnahme.from_dict(api.payload)

        if teilnahme is not None:
            """ Wir verwenden id des Proposals für
             die Erzeugung eines Teilnahme-Objekts. Das serverseitig erzeugte 
             Objekt ist das maßgebliche und  wird auch dem Client zurückgegeben. """
            teilnahme.set_id(id)
            adm.save_teilnahme(teilnahme)
            return '', 200
        else:
            """ Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und
            werfen einen Server-Fehler. """
            return '', 500

@electivApp.route('/teilnahmen/<int:modul_id>/<int:semester_id>')
@electivApp.response(500, 'Something went wrong')
class TeilnahmenByModulundSemesterOperationen(Resource):
    @electivApp.marshal_list_with(teilnahme)

    @secured
    def get(self, modul_id, semester_id):
        """Auslesen von Teinahmen

        Anhand der Modul ID und Semester ID
        """
        adm = ProjektAdministration()
        teilnahmen = adm.get_teilnahmen_by_modul_und_semester(modul_id, semester_id)
        return teilnahmen


@electivApp.route('/teilnahmenbysemester/<int:student_id>/<int:semester_id>')
@electivApp.response(500, 'Something went wrong')
class TeilnahmenBySemesterOperationen(Resource):
    @electivApp.marshal_list_with(teilnahme)

    @secured
    def get(self, student_id, semester_id):
        """Auslesen von Teinahmen für ein bestimmtes Semester

        Anhand der Student ID und Semester ID
        """
        adm = ProjektAdministration()
        teilnahmen = adm.get_teilnahmen_by_semester(student_id, semester_id)
        return teilnahmen


@electivApp.route('/semesterofstudent/<int:id>')
@electivApp.response(500, 'Something went wrong')
class SemesterOfStudentOperationen(Resource):
    @electivApp.marshal_list_with(semester)

    @secured
    def get(self, id):
        """Auslesen aller Semester in dem ein Student eine Teilnahme hat

        """
        adm = ProjektAdministration()
        semester = adm.get_semester_of_student(id)
        return semester

@electivApp.route('/bewertung/<int:id>')
@electivApp.response(500, 'Something went wrong')
class BewertungOperationen(Resource):
    @electivApp.marshal_list_with(bewertung)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Bewertung-Objekts.
            
        Das auszulesende Objekt wird durch die id in dem URI bestimmt.
        """
        adm = ProjektAdministration()
        bewertung = adm.get_bewertung_by_id(id)
        return bewertung


@electivApp.route('/bewertungen')
@electivApp.response(500, 'Something went wrong')
class BewertungenOperationen(Resource):
    @electivApp.marshal_list_with(bewertung)
    @secured
    def get(self):
        """Auslesen aller Bewertungen-Objekte.

        Sollten keine Bewertungen-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ProjektAdministration()
        bewertungen = adm.get_alle_bewertungen()
        return bewertungen

@electivApp.route('/modul/<int:projekt_id>')
@electivApp.response(500, 'Something went wrong')
class ModulByProjektIDOperationen(Resource):
    @electivApp.marshal_list_with(modul)
    @secured
    def get(self, projekt_id):
        """Auslesen eines bestimmten Modul-Objekts.

        Das auszulesende Objekt wird durch die projekt_id in dem URI bestimmt.
        """
        adm = ProjektAdministration()
        modul = adm.get_module_by_projekt_id(projekt_id)
        return modul


@electivApp.route('/module')
@electivApp.response(500, 'Something went wrong')
class ModulOperationen(Resource):
    @electivApp.marshal_list_with(modul)
    def get(self):
        """Auslesen aller Module-Objekte.

        Sollten keine Module-Objekte verfügbar sein,
        so wird eine leere Sequenz zurückgegeben."""
        adm = ProjektAdministration()
        module = adm.get_alle_module()
        return module
    @secured
    def delete(self):
        """Löschen von Module-Objekten.

        """
        id = request.args.get("id")
        adm = ProjektAdministration()
        adm.delete_modul(id)

    @electivApp.marshal_with(modul)
    @electivApp.expect(modul)
    @secured
    def put(self):
        '''
        Updaten eines Moduls
        '''

        adm = ProjektAdministration()
        modul = Modul.from_dict(api.payload)

        if modul is not None:
            """ Wir verwenden modul des Proposals für
             die Erzeugung eines Modul-Objekts. Das serverseitig erzeugte 
             Objekt ist das maßgebliche und  wird auch dem Client zurückgegeben. """
            response = adm.save_modul(modul)
            return response, 200
        else:
            """ Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und
            werfen einen Server-Fehler. """
            return '', 500

    @electivApp.marshal_with(modul, code=200)
    @electivApp.expect(modul)
    @secured
    def post (self):
        """Anlegen eines neuen Modul-Objekts."""
        adm = ProjektAdministration()
        modul = Modul.from_dict(api.payload)

        if modul is not None:
            """ Wir verwenden modul des Proposals für
             die Erzeugung eines Modul-Objekts. Das serverseitig erzeugte 
             Objekt ist das maßgebliche und  wird auch dem Client zurückgegeben. """
            m = adm.create_modul(modul)
            return m, 200
        else: 
            """ Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und
            werfen einen Server-Fehler. """
            return '', 500

@electivApp.route('/projekte_hat_module')
@electivApp.response(500, 'Something went wrong')
class ProjektehatModuleOperationen(Resource):
    @electivApp.marshal_list_with(modul)
    @secured
    def put(self):
        """Update von wählbaren Modulen eines bestimmten Projektes."""

        projekt_id = request.args.get("projekt_id")
        module = json.loads(request.args.get("module"))
        adm = ProjektAdministration()
        adm.update_projekte_hat_module(projekt_id, module)

    @secured
    def post (self):
        """Anlegen der wählbaren Module für ein bestimmtes Projekt."""

        projekt_id = request.args.get("projekt_id")
        module = json.loads(request.args.get("module"))
        adm = ProjektAdministration()
        adm.create_projekte_hat_module(projekt_id, module)

@electivApp.route('/semester')
@electivApp.response(500, 'Something went wrong')
class SemesterOperationen(Resource):
    @electivApp.marshal_list_with(semester)
    @secured
    def get(self):
        """Auslesen aller Semester-Objekten.
        
        Sollten keine User-Objekte verfügbar sein,
        so wird eine leere Sequenz zurückgegeben.
        """
        adm = ProjektAdministration()
        semester = adm.get_alle_semester()
        return semester

    @secured
    def delete(self):
        """Löschen eines bestimmten Semester-Objekts nach id.

        """
        id = request.args.get("id")
        adm = ProjektAdministration()
        adm.delete_semester(id)

    @electivApp.marshal_with(semester)
    @electivApp.expect(semester)
    @secured
    def put(self):
        '''
        Updaten eines Semesters
        '''
        adm = ProjektAdministration()
        semester = Semester.from_dict(api.payload)

        if semester is not None:
            """ Wir verwenden semester des Proposals für
             die Erzeugung eines Semester-Objekts. Das serverseitig erzeugte 
             Objekt ist das maßgebliche und  wird auch dem Client zurückgegeben. """
            response = adm.save_semester(semester)
            return response, 200
        else:
            """ Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und
            werfen einen Server-Fehler. """
            return '', 500

    @electivApp.marshal_with(semester, code=200)
    @electivApp.expect(semester)
    @secured
    def post (self):
        """Anlegen eines neuen Semester-Objekts."""
        adm = ProjektAdministration()
        semester = Semester.from_dict(api.payload)

        if semester is not None:
            """ Wir verwenden semester des Proposals für
             die Erzeugung eines Modul-Objekts. Das serverseitig erzeugte 
             Objekt ist das maßgebliche und  wird auch dem Client zurückgegeben. """
            m = adm.create_semester(semester)
            return m, 200
        else: 
            """ Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und
            werfen einen Server-Fehler. """
            return '', 500

@electivApp.route('/semester/<int:id>')
@electivApp.response(500, 'Something went wrong')
class SemesterByIDOperationen(Resource):
    @electivApp.marshal_list_with(semester)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Semester-Objekts.

        Das auszulesende Objekt wird durch die id in dem URI bestimmt.
        """

        adm = ProjektAdministration()
        semester = adm.get_semester_by_id(id)
        return semester


@electivApp.route('/projektePending')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjektGenehmigungOperation(Resource):

    @electivApp.marshal_list_with(projekt)
    @secured
    def get(self):
        adm = ProjektAdministration()
        print("BINDA-1")
        #--------------------------------------------------------------------------- AUF .FORMAT('"{}"') ACHTEN!
        zus = "Neu"
        #--------------------------------------------------------------------------- AUF .FORMAT('"{}"') ACHTEN!
        projekte = adm.get_projekte_by_zustaende('"Neu","Abgelehnt"')
        return projekte

    def delete(self):
        pass

    @electivApp.marshal_with(projekt, code=200)
    @electivApp.expect(projekt)
    @secured
    def post(self):
        adm = ProjektAdministration()
        proposal = Projekt.from_dict(api.payload)


        if proposal is not None:
            p = adm.create_wartelisteProjekt(proposal.get_id(), proposal.get_name(),proposal.get_max_teilnehmer(),proposal.get_projektbeschreibung(),proposal.get_betreuer(),proposal.get_externer_partner(),proposal.get_woechentlich(),proposal.get_anzahl_block_vor(),proposal.get_anzahl_block_in(),proposal.get_praeferierte_block(),proposal.get_bes_raum(),proposal.get_raum(),proposal.get_sprache(),proposal.get_dozent(), proposal.get_art(), proposal.get_halbjahr(), proposal.get_anzahlTeilnehmer(),proposal.get_teilnehmerListe())
            return p, 200
        else:
            return '', 500

    @electivApp.marshal_with(projekt)
    @electivApp.expect(projekt)
    @secured
    def put(self):
        adm = ProjektAdministration()
        projekt = Projekt.from_dict(api.payload)

        if projekt is not None:
            response = adm.save_projekt(projekt)
            return response, 200
        else:
            return '', 500


@electivApp.route('/projektart')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjektartOperationen(Resource):
    @electivApp.marshal_list_with(projektart)
    @secured
    def get(self):
        """Auslesen aller Projektart-Objekten.
        """
        adm = ProjektAdministration()
        projektart = adm.get_alle_projektarten()
        return projektart

    @secured
    def delete(self):
        """Löschen eines bestimmten Projektart-Objekts nach id.

        """
        id = request.args.get("id")
        adm = ProjektAdministration()
        adm.delete_projektart(id)

    @electivApp.marshal_with(projektart)
    @electivApp.expect(projektart)
    @secured
    def put(self):
        
        """Update eines bestimmten Projektart-Objekts."""
        adm = ProjektAdministration()
        projektart = Projektart.from_dict(api.payload)

        if projektart is not None:
            """ Wir verwenden projektart des Proposals für
             die Erzeugung eines Projektart-Objekts. Das serverseitig erzeugte 
             Objekt ist das maßgebliche und  wird auch dem Client zurückgegeben. """
            response = adm.save_projektart(projektart)
            return response, 200
        else:
            """ Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und
            werfen einen Server-Fehler. """
            return '', 500

    @electivApp.marshal_with(projektart, code=200)
    @electivApp.expect(projektart)
    @secured
    def post (self):
        
        """Anlegen eines neuen Projektart-Objekts."""
        adm = ProjektAdministration()
        projektart = Projektart.from_dict(api.payload)

        if projektart is not None:
            """ Wir verwenden projektart des Proposals für
             die Erzeugung eines Projektart-Objekts. Das serverseitig erzeugte 
             Objekt ist das maßgebliche und  wird auch dem Client zurückgegeben. """
            p = adm.create_projektart(projektart)
            return p, 200
        else: 
            """ Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und
            werfen einen Server-Fehler. """
            return '', 500


@electivApp.route('/projektart/<int:id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjektartByID(Resource):
    @electivApp.marshal_list_with(projektart)
    @secured
    def get(self, id):
        """ Auslesen des Projektart-Objekts

        Die auszulesenden Objekte werden durch id in dem URI bestimmt.
        """
        adm = ProjektAdministration()
        projektart = adm.get_projektart_by_id(id)
        return projektart

if __name__ == '__main__':
    app.run(debug=True)
