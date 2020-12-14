# Die WahlfachApp basiert auf Flask
from flask import Flask
# Die Flask Erweiterung Flask CORS wird für Cross-Origin Resource Sharing verwendet
from flask_cors import CORS
# Des Weiteren wird das auf Flask aufbauende Flask-RestX verwendet
from flask_restx import Api, Resource, fields
from flask import request

# Zugriff auf Applikationslogik inklusive BusinessObject-Klassen
from server.ProjektAdministration import ProjektAdministration
from server.bo.Teilnahme import Teilnahme
from server.bo.Projekt import Projekt

#SecurityDecorator
from SecurityDecorator import secured

# ..weitere Imports notwendig z.B. BO-Klassen und SecurityDecorator

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
    'aktueller_zustand': fields.Integer(attribute='_aktueller_zustand', description='ID des aktuellen Zustands des Automaten')
})

nbo = api.inherit('NamedBusinessObject', bo, {
    'name': fields.String(attribute='_name', description='Name des BOs'),
})

person = api.inherit('Person', nbo, {
    'email': fields.String(attribute='_email', description='Email der Person'),
    'google_user_id': fields.String(attribute='_google_user_id', description='Google user ID der Person'),
    'rolle': fields.Integer(attribute='_rolle', description='Rolle der Person')
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
    'praeferierte_block': fields.String(attribute='_ praeferierte_block', description=' Praeferierte Blocktage'),
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
    'anrechnung': fields.Integer(attribute='_anrechnung', description='Das Modul auf das die Teilnahme angerechnet wurde'),
    'resultat': fields.Integer(attribute='_resultat', description='Die ID der Note einer Teilnahme')
})

bewertung = api.inherit('Bewertung', bo, {
    'note': fields.Float(attribute='_note', description='Die Note der Teilnahme'),
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
        projekte = adm.get_alle_projekte()
        return projekte

    def delete(self, projekt_id):
        pass

    def put(self, projekt_id):
        pass

@electivApp.route('/projekt/<int:id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjektOperationen(Resource):
    @electivApp.marshal_list_with(projekt)
    @secured

    def get(self, id):
        adm = ProjektAdministration()
        projekt = adm.get_projekt_by_id(id)
        return projekt

    def delete(self, projekt_id):
        pass

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

    def delete(self, teilnahme_id):
        pass

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
    @secured

    def get(self):
        adm = ProjektAdministration()
        module = adm.get_alle_module()
        return module

    def delete(self, id):
        pass

    def put(self, id):
        pass

@electivApp.route('/semester')
@electivApp.response(500, 'Something went wrong')
class SemesterOperationen(Resource):
    @electivApp.marshal_list_with(semester)
    @secured

    def get(self):
        adm = ProjektAdministration()
        semester = adm.get_alle_semester()
        return semester

    def delete(self, id):
        pass

    def put(self, id):
        pass



@electivApp.route('/projektePending')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjektGenehmigungOperation(Resource):

    @electivApp.marshal_list_with(projekt)
    def get(self):
        adm = ProjektAdministration()
        projekte = adm.get_alle_pending_projekte()
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
        # print(proposal)


        if proposal is not None:
            p = adm.create_wartelisteProjekt(proposal.get_name(),proposal.get_max_teilnehmer(),proposal.get_projektbeschreibung(),proposal.get_betreuer(),proposal.get_externer_partner(),proposal.get_woechentlich(),proposal.get_anzahl_block_vor(),proposal.get_anzahl_block_in(),proposal.get_praeferierte_block(),proposal.get_bes_raum(),proposal.get_raum(),proposal.get_sprache(),proposal.get_dozent(),proposal.get_anzahlTeilnehmer(),proposal.get_teilnehmerListe())
            print(p.__str__())
            return p, 200
        else:
            return '', 500

if __name__ == '__main__':
    app.run(debug=True)
