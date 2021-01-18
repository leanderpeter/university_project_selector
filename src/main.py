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

#SecurityDecorator
from SecurityDecorator import secured

# ..weitere Imports notwendig z.B. BO-Klassen und SecurityDecorator


class NullableInteger(fields.Integer):
    __schema_type__ = ['integer', 'null']
    __schema_example__ = 'nullable integer'

"""Flask wird hiermit instanziert"""
app = Flask(__name__)

CORS(app, resources=r'/electivApp/*')

api = Api(app, version='1.0', title='electivApp API',
          description='Web App for choosing electiv subjects for the university')

electivApp = api.namespace('electivApp', description='Functions of electivApp')

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

# Moduloption aus projekt entfernt !!INFO!!

teilnahme = api.inherit('Teilnahme', bo, {
    'teilnehmer': fields.Integer(attribute='_teilnehmer', description='Die ID des Studenten der Teilnahme'),
    'lehrangebot': fields.Integer(attribute='_lehrangebot', description='Die ID des Projekts der Teilnahme'),
    'anrechnung': NullableInteger(attribute='_anrechnung', description='Das Modul auf das die Teilnahme angerechnet wurde'),
    'resultat': fields.Integer(attribute='_resultat', description='Die ID der Note einer Teilnahme')
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


    
@electivApp.route('/projekte')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjektListeOperationen(Resource):
    @electivApp.marshal_list_with(projekt)
    @secured

    def get(self):
        adm = ProjektAdministration()
        #--------------------------------------------------------------------------- AUF .FORMAT('"{}"') ACHTEN!
        zus = "Neu"
        #--------------------------------------------------------------------------- AUF .FORMAT('"{}"') ACHTEN!
        projekte = adm.get_projekte_by_zustand('"{}"'.format(zus))
        return projekte

    def delete(self, projekt_id):
        pass

    def put(self, projekt_id):
        pass

@electivApp.route('/projekte/zustand/<string:id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class Projektverwaltungoperation(Resource):
    @electivApp.marshal_list_with(projekt)
    # @secured

    def get(self, id):
        result = []
        adm = ProjektAdministration()
        projekte = adm.get_projekte()
        for p in projekte:
            if id == p.get_aktueller_zustand():
                result.append(p)

        print(type(projekte), "Type des Objekts")
        return result

@electivApp.route('/projekte/zustand/<string:zustand_id>/dozent/<int:dozent_id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjektByZustandByDozentoperation(Resource):
    @electivApp.marshal_list_with(projekt)
    

    def get(self, zustand_id, dozent_id):
        adm = ProjektAdministration()
        projekte = adm.get_projekte_by_zustand_by_dozent(zustand_id,dozent_id)
        print(projekte)
        return projekte

@electivApp.route('/projekte/zustand')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class Projektverwaltungzustandoperation(Resource):
    @electivApp.marshal_list_with(projekt)
    @secured

    def put(self):
        projektId = request.args.get("projektId")
        zustandId = request.args.get("zustandId")
        adm = ProjektAdministration()
        projekte = adm.set_zustand_at_projekt(projektId,zustandId)
        return projekte

@electivApp.route('/projekt/<int:id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjektOperationen(Resource):
    @electivApp.marshal_list_with(projekt)
    @secured

    def get(self, id):
        adm = ProjektAdministration()
        projekt = adm.get_projekt_by_id(id)
        return projekt

    def delete(self, id):
        adm = ProjektAdministration()
        adm.delete_projekt(id)

    def put(self, projekt_id):
        pass


@electivApp.route('/teilnahmen/<int:id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TeilnahmeListeOperationen(Resource):
    @electivApp.marshal_list_with(teilnahme)
    @secured
 
    def get(self, id):
        adm = ProjektAdministration()
        """TODO 1 SQL Abfrage machen"""
        teilnahmen = adm.get_teilnahmen_von_student(id)
        return teilnahmen

    def delete(self, ):
        pass

    def put(self, ):
        pass

@electivApp.route('/teilnahmen/projekt/<int:id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class TeilnahmeListeByProjektOperationen(Resource):
    @electivApp.marshal_list_with(teilnahme)
    @secured
 
    def get(self, id):
        adm = ProjektAdministration()
        teilnahmen = adm.get_teilnahmen_by_projekt_id(id)
        return teilnahmen

    def delete(self, ):
        pass

    def put(self, ):
        pass


@electivApp.route('/student/projekt/<int:id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class StudentListeByProjektOperationen(Resource):
    @electivApp.marshal_list_with(student)
    @secured
 
    def get(self, id):
        adm = ProjektAdministration()
        students = adm.get_students_by_projekt_id(id)
        return students

    def delete(self, ):
        pass

    def put(self, ):
        pass

@electivApp.route('/person/<int:id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonOperationen(Resource):
    @electivApp.marshal_list_with(person)
    @secured

    def get(self, id):
        adm = ProjektAdministration()
        person = adm.get_person_by_id(id)
        return person

    def delete(self, person_id):
        pass

    def put(self, person_id):
        pass

@electivApp.route('/personbygoogle/<string:google_user_id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonByGoogleIDOperationen(Resource):
    @electivApp.marshal_list_with(person)
    @secured

    def get(self, google_user_id):
        adm = ProjektAdministration()
        person = adm.get_person_by_google_user_id(google_user_id)
        return person

    def delete(self, student_id):
        pass

    def put(self, student_id):
        pass

@electivApp.route('/studentbygoogle/<string:google_user_id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class StudentByGoogleIDOperationen(Resource):
    @electivApp.marshal_list_with(student)
    @secured

    def get(self, google_user_id):
        adm = ProjektAdministration()
        student = adm.get_student_by_google_user_id(google_user_id)
        return student

    def delete(self, student_id):
        pass

    def put(self, student_id):
        pass

@electivApp.route('/studenten')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class StudentenOperationen(Resource):
    @electivApp.marshal_list_with(student)
    

    def get(self):
        adm = ProjektAdministration()
        studenten = adm.get_alle_studenten()
        return studenten

    def put(self):
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
        adm = ProjektAdministration()
        student = adm.get_student_by_id(id)
        return student

    def delete(self, id):
        adm = ProjektAdministration()
        adm.delete_UserById(id)

    def put(self, student_id):
        pass


@electivApp.route('/student/<int:id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class StudentOperationen(Resource):
    @electivApp.marshal_list_with(student)
    @secured

    def get(self, id):
        adm = ProjektAdministration()
        student = adm.get_student_by_id(id)
        return student

    def delete(self, student_id):
        pass

    def put(self, student_id):
        pass


@electivApp.route('/teilnahme')
@electivApp.response(500, 'Something went wrong')
class TeilnahmeOperationen(Resource):
    def get(self, teilname_id):
        pass

    def delete(self):
        lehrangebotId = request.args.get("lehrangebotId")
        teilnehmerId = request.args.get("teilnehmerId")
        projektAdministration = ProjektAdministration()
        projektAdministration.delete_teilnahme(lehrangebotId, teilnehmerId)

    def post(self):
        lehrangebotId = request.args.get("lehrangebotId")
        teilnehmerId = request.args.get("teilnehmerId")
        projektAdministration = ProjektAdministration()
        projektAdministration.create_teilnahme(lehrangebotId, teilnehmerId)

"""Wieso teilnahme2? Mach doch einfach /teilnahme/<int:id>"""
@electivApp.route('/teilnahme2/<int:id>')
@electivApp.response(500, 'Something went wrong')
class Teilnahme2Operationen(Resource):
    def get(self, teilname_id):
        pass

    def delete(self, teilnahme_id):
        pass  

    @electivApp.marshal_with(teilnahme)
    @electivApp.expect(teilnahme, validate=True)
    @secured
    def put(self, id):
        adm = ProjektAdministration()
        teilnahme = Teilnahme.from_dict(api.payload)

        if teilnahme is not None:
            teilnahme.set_id(id)
            adm.save_teilnahme(teilnahme)
            return '', 200
        else:
            return '', 500

@electivApp.route('/teilnahmen/<int:modul_id>/<int:semester_id>')
@electivApp.response(500, 'Something went wrong')
class TeilnahmenByModulundSemesterOperationen(Resource):
    @electivApp.marshal_list_with(teilnahme)

    def get(self, modul_id, semester_id):
        adm = ProjektAdministration()
        teilnahmen = adm.get_teilnahmen_by_modul_und_semester(modul_id, semester_id)
        return teilnahmen

@electivApp.route('/bewertung/<int:id>')
@electivApp.response(500, 'Something went wrong')
class BewertungOperationen(Resource):
    @electivApp.marshal_list_with(bewertung)
    @secured
    
    def get(self, id):
        adm = ProjektAdministration()
        bewertung = adm.get_bewertung_by_id(id)
        return bewertung

    def delete(self, bewertung_id):
        pass

    def put(self, bewertung_id):
        pass

@electivApp.route('/bewertungen')
@electivApp.response(500, 'Something went wrong')
class BewertungenOperationen(Resource):
    @electivApp.marshal_list_with(bewertung)
    @secured
    
    def get(self):
        adm = ProjektAdministration()
        bewertungen = adm.get_alle_bewertungen()
        return bewertungen

    


@electivApp.route('/modul/<int:projekt_id>')
@electivApp.response(500, 'Something went wrong')
class ModulByProjektIDOperationen(Resource):
    @electivApp.marshal_list_with(modul)
    @secured

    def get(self, projekt_id):
        adm = ProjektAdministration()
        modul = adm.get_module_by_projekt_id(projekt_id)
        return modul

    def delete(self, id):
        pass

    def put(self, id):
        pass

@electivApp.route('/module')
@electivApp.response(500, 'Something went wrong')
class ModulOperationen(Resource):
    @electivApp.marshal_list_with(modul)

    def get(self):
        adm = ProjektAdministration()
        module = adm.get_alle_module()
        return module

    def delete(self):
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
            response = adm.save_modul(modul)
            return response, 200
        else:
            return '', 500

    @electivApp.marshal_with(modul, code=200)
    @electivApp.expect(modul)
    @secured
    def post (self):
        adm = ProjektAdministration()
        modul = Modul.from_dict(api.payload)

        if modul is not None:
            m = adm.create_modul(modul)
            return m, 200
        else: 
            return '', 500

@electivApp.route('/projekte_hat_module')
@electivApp.response(500, 'Something went wrong')
class ProjektehatModuleOperationen(Resource):
    @electivApp.marshal_list_with(modul)
    @secured
    def put(self):
        projekt_id = request.args.get("projekt_id")
        module = json.loads(request.args.get("module"))
        adm = ProjektAdministration()
        adm.update_projekte_hat_module(projekt_id, module)

    @secured
    def post (self):
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
        adm = ProjektAdministration()
        semester = adm.get_alle_semester()
        return semester

    def delete(self):
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
            response = adm.save_semester(semester)
            return response, 200
        else:
            return '', 500

    @electivApp.marshal_with(semester, code=200)
    @electivApp.expect(semester)
    @secured
    def post (self):
        adm = ProjektAdministration()
        semester = Semester.from_dict(api.payload)

        if semester is not None:
            m = adm.create_semester(semester)
            return m, 200
        else: 
            return '', 500

@electivApp.route('/semester/<int:id>')
@electivApp.response(500, 'Something went wrong')
class SemesterByIDOperationen(Resource):
    @electivApp.marshal_list_with(semester)
    @secured

    def get(self, id):
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
        '''
        Einfugen eines Projekts im zustand pending. 
        '''
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
        '''
        Einfugen eines Projekts im zustand pending. 
        '''
        adm = ProjektAdministration()
        projekt = Projekt.from_dict(api.payload)

        if projekt is not None:
            response = adm.save_projekt(projekt)
            return response, 200
        else:
            return '', 500

@electivApp.route('/projektart')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class Projektart(Resource):
    @electivApp.marshal_list_with(projektart)
    @secured

    def get(self):
        adm = ProjektAdministration()
        projektart = adm.get_alle_projektarten()
        return projektart

@electivApp.route('/projektart/<int:id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjektartByID(Resource):
    @electivApp.marshal_list_with(projektart)
    @secured

    def get(self, id):
        adm = ProjektAdministration()
        projektart = adm.get_projektart_by_id(id)
        return projektart

if __name__ == '__main__':
    app.run(debug=True)
