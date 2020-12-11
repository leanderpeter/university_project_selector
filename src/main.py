# Die WahlfachApp basiert auf Flask
from flask import Flask
# Die Flask Erweiterung Flask CORS wird für Cross-Origin Resource Sharing verwendet
from flask_cors import CORS
# Des Weiteren wird das auf Flask aufbauende Flask-RestX verwendet
from flask_restx import Api, Resource, fields
from flask import request

# Zugriff auf Applikationslogik inklusive BusinessObject-Klassen
from server.ProjektAdministration import ProjektAdministration
from server.bo.Person import Person
from server.bo.Student import Student
from server.bo.Projekt import Projekt
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
    'anzahlTeilnehmer': fields.String(attribute='_anzahlTeilnehmer', description='Die Anzahl der angemeldeten Teilnehmer'),
    'teilnehmerListe': fields.String(attribute='_teilnehmerListe', description='Liste mit IDs der Teilnehmer')
})


@electivApp.route('/projekte')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjektListeOperationen(Resource):
    @electivApp.marshal_list_with(projekt)
    # @secured

    def get(self):
        adm = ProjektAdministration()
        projekte = adm.get_alle_projekte()
        return projekte

    def delete(self, projekt_id):
        pass

    def put(self, projekt_id):
        pass


@electivApp.route('/meineprojekte/<int:id>')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class MeineProjektListeOperationen(Resource):
    @electivApp.marshal_list_with(projekt)
    @secured
    def get(self, id):
        adm = ProjektAdministration()
        """TODO 1 SQL Abfrage machen"""
        teilnahmen = adm.get_teilnahmen_von_student(id)
        projekte = adm.get_projekte_von_teilnahmen(teilnahmen)
        return projekte

    def delete(self, ):
        pass

    def put(self, ):
        pass


@electivApp.route('/person')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonOperationen(Resource):
    def get(self, person_id):
        adm = ProjektAdministration()
        # personen = adm.

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


class BewertungOperationen(Resource):
    def __init__(self):
        pass

    def get(self, bewertung_id):
        pass

    def delete(self, bewertung_id):
        pass

    def put(self, bewertung_id):
        pass


class ModulOperationen(Resource):
    def __init__(self):
        pass

    def get(self, module_id):
        pass

    def delete(self, module_id):
        pass

    def put(self, module_id):
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
