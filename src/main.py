#Die WahlfachApp basiert auf Flask
from flask import Flask
#Die Flask Erweiterung Flask CORS wird für Cross-Origin Resource Sharing verwendet
from flask_cors import CORS
#Des Weiteren wird das auf Flask aufbauende Flask-RestX verwendet
from flask_restx import Api, Resource, fields

#Zugriff auf Applikationslogik inklusive BusinessObject-Klassen
from server.Projekt_Administration import Projekt_Administration

#..weitere Imports notwendig z.B. BO-Klassen und SecurityDecorator

"""Flask wird hiermit instanziert"""
app = Flask(__name__)

"""
Was hier noch fehlt:

CORS(app, resources= ...)

api= Api(app, version= ...)

namespace

BO als Basisklasse -> api.model

alle BOs die verwendet werden -> api.inherit

"""


class ProjektOperationen(Resource):
    def __init__(self):
        pass

    def get(self, projekt_id):
        pass

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
