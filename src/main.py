#Die WahlfachApp basiert auf Flask
from flask import Flask
#Die Flask Erweiterung Flask CORS wird für Cross-Origin Resource Sharing verwendet
from flask_cors import CORS
#Des Weiteren wird das auf Flask aufbauende Flask-RestX verwendet
from flask_restx import Api, Resource, fields

#Zugriff auf Applikationslogik inklusive BusinessObject-Klassen
from server.ProjektAdministration import ProjektAdministration
from server.bo.Person import Person
from server.bo.Projekt import Projekt
from SecurityDecorator import secured

#..weitere Imports notwendig z.B. BO-Klassen und SecurityDecorator

"""Flask wird hiermit instanziert"""
app = Flask(__name__)

CORS(app, resources=r'/*')
api = Api(app, version='1.0', title='electivApp API', description='Web App for choosing electiv subjects for the university')
electivApp = api.namespace('electivApp', description='Functions of electivApp')

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='Unique identifier from every BO'),
    })

person = api.inherit('Person', bo, {
    'name': fields.String(attribute='_name', description='Name der Person'),
    'google_user_id': fields.String(attribute='_google_user_id', description='Google user ID der Person')
    })

projekt = api.inherit('Projekt', bo, {
    'name': fields.String(attribute='_name', description='Name des Projekts'),
    'beschreibung': fields.String(attribute='_beschreibung', description='Kurzbeschreibung des Projekts'),
    'dozent': fields.String(attribute='_dozent', description='Dozent Name'),
    'max_teilnehmer': fields.String(attribute='_max_teilnehmer', description='Maximale Anzahl an teilnehmern')
})


@electivApp.route('/projekte')
@electivApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')

class ProjectListOperations(Resource):
    @electivApp.marshal_list_with(projekt)
    @secured

    def get(self):
        adm = ProjektAdministration()
        projekte = adm.get_alle_projekte()
        return projekte

    def delete(self, projekt_id):
        pass

    def put(self, project_id):
        pass

class ProjektOperationen(Resource):
    @secured


    def get(self):
        return print("Hat das geklappt?")

    def delete(self, projekt_id):
        pass

    def put(self, project_id):
        pass


class PersonOperationen(Resource):
    def __init__(self):
        pass

    def get(self, person_id):
        pass

    def delete(self, person_id):
        pass

    def put(self, person_id):
        pass


class StudentOperationen(Resource):
    def __init__(self):
        pass

    def get(self, person_id):
        pass

    def delete(self, student_id):
        pass

    def put(self, student_id):
        pass
    

class TeilnahmeOperationen(Resource):
    def __init__(self):
        pass

    def get(self, teilname_id):
        pass

    def delete(self, teilnahme_id):
        pass

    def put(self, teilnahme_id):
        pass


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


if __name__ == '__main__':
    app.run(debug=True)
