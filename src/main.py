# Die WahlfachApp basiert auf Flask
from flask import Flask
# Die Flask Erweiterung Flask CORS wird für Cross-Origin Resource Sharing verwendet
from flask_cors import CORS
# Des Weiteren wird das auf Flask aufbauende Flask-RestX verwendet
from flask_restx import Api, Resource, fields
from flask import request

# Zugriff auf Applikationslogik inklusive BusinessObject-Klassen
from server.ProjektAdministration import ProjektAdministration
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

projekt = api.inherit('Projekt', nbo, {
    'max_teilnehmer': fields.Integer(attribute='_max_teilnehmer', description='Maximale Anzahl an teilnehmern'),
    'beschreibung': fields.String(attribute='_projektbeschreibung', description='Kurzbeschreibung des Projekts'),
    'betreuer': fields.String(attribute='_betreuer', description='Name des Betreuers'),
    'externer_partner': fields.String(attribute='_externer_partner', description='Name des externen Partners'),
    'woechentlich': fields.Boolean(attribute='_woechentlich',
                                   description='Bool ob das Projekt oeffentlich stattfindet'),
    'anzahl_block_vor': fields.Integer(attribute='_anzahl_block_vor',
                                       description='Anzahl Blocktage vor der Vorlesungszeit'),
    'anzahl_block_in': fields.Integer(attribute='_anzahl_block_in',
                                      description='Anzahl Blocktage in der Vorlesungszeit'),
    'praeferierte_block': fields.String(attribute='_ praeferierte_block', description=' Praeferierte Blocktage'),
    'bes_raum': fields.Boolean(attribute='_bes_raum', description='Bool ob ein besonderer Raum notwendig ist'),
    'raum': fields.String(attribute='_raum', description='Raum des Projekts'),
    'sprache': fields.String(attribute='_sprache', description='Sprache des Projekts'),
    'dozent': fields.Integer(attribute='_dozent', description='Der Dozent des Projekts'),
    'moduloption': fields.String(attribute='_moduloption', description='Die Moduloptionen für ein Projekt'),
    'anzahlTeilnehmer': fields.Integer(attribute='_anzahlTeilnehmer', description='Die Anzahl der angemeldeten Teilnehmer'),
    'teilnehmerListe': fields.String(attribute='_teilnehmerListe', description='Liste mit IDs der Teilnehmer')
})

teilnahme = api.inherit('Teilnahme', bo, {
    'teilnehmer': fields.Integer(attribute='_teilnehmer', description='Die ID des Studenten der Teilnahme'),
    'lehrangebot': fields.Integer(attribute='_lehrangebot', description='Die ID des Projekts der Teilnahme'),
    'anrechnung': fields.Integer(attribute='_anrechnung', description='Das Modul auf das die Teilnahme angerechnet wurde'),
    'resultat': fields.Integer(attribute='_resultat', description='Die ID der Note einer Teilnahme')
})

bewertung = api.inherit('Bewertung', bo, {
    'note': fields.Float(attribute='_note', description='Die Note der Teilnahme'),
})

modul = api.inherit('Modul', nbo, {
    'edv_nr': fields.Integer(attribute='_edv_nr', description='Die EDV Nummer eines Moduls'),
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


@electivApp.route('/student/<string:google_user_id>')
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


@electivApp.route('/teilnahme')
@electivApp.response(500, 'Something went wrong')
class TeilnahmeOperationen(Resource):
    def get(self, teilname_id):
        pass

    def delete(self, teilnahme_id):
        pass

    def put(self):
        lehrangebotId = request.args.get("lehrangebotId")
        teilnehmerId = request.args.get("teilnehmerId")
        projektAdministration = ProjektAdministration()
        projektAdministration.create_teilnahme(lehrangebotId, teilnehmerId)

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

@electivApp.route('/module/<int:projekt_id>')
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


if __name__ == '__main__':
    app.run(debug=True)
