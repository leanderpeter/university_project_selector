#!/usr/bin/python
# -*- coding: utf-8 -*-
import argparse

from .bo.Person import Person
from .bo.Student import Student
from .bo.Projekt import Projekt
from .bo.Teilnahme import Teilnahme

from .db.PersonMapper import PersonMapper
from .db.StudentMapper import StudentMapper
from .db.TeilnahmeMapper import TeilnahmeMapper
from .db.BewertungMapper import BewertungMapper
from .db.ProjektMapper import ProjektMapper
from .db.ModulMapper import ModulMapper



class ProjektAdministration(object):
    def __init__(self):
        pass

    def create_person(self, name, email, google_user_id):
        '''creat person'''

        user = Person()
        user.set_name(name)
        user.set_email(email)
        user.set_google_user_id(google_user_id)
        user.set_id(1)

        with PersonMapper() as mapper:
            return mapper.insert(user)

    def create_student(self, name, email, google_user_id):
        '''creat person'''

        user = Student()
        user.set_name(name)
        user.set_email(email)
        user.set_google_user_id(google_user_id)
        user.set_id(1)

        with StudentMapper() as mapper:
            return mapper.insert(user)

    def get_user_by_name(self, ):
        pass

    def get_person_by_id(self, id):
        with PersonMapper() as mapper:
            return mapper.find_by_id(id)

    def get_user_by_email(self, ):
        pass

    def get_person_by_google_user_id(self, id):
        '''read and return user with specific user id'''
        with PersonMapper() as mapper:
            return mapper.find_by_google_user_id(id)

    def get_student_by_google_user_id(self, id):
        '''read and return user with specific user id'''
        with StudentMapper() as mapper:
            return mapper.find_by_google_user_id(id)

    def get_all_users(self, ):
        pass

    def save_person(self, user):
        '''save given user'''
        with PersonMapper() as mapper:
            mapper.update(user)

    def save_student(self, user):
        '''save given user'''
        with StudentMapper() as mapper:
            mapper.update(user)

    def delete_user(self, ):
        pass

    def create_projekt(self, ):
        pass

    def get_projekt_by_id(self, projekt_id):
        with ProjektMapper() as mapper:
            return mapper.find_projekt_by_id(projekt_id)

    def get_alle_projekte(self, ):
        """return alle Projekte """
        with ProjektMapper() as mapper:
            return mapper.find_all()

    def get_projekt_teilnehmer(self, ):
        pass

    def get_projekte_by_projektart(self, ):
        pass

    def get_projekte_von_user(self, ):
        pass

    def delete_projekt(self, ):
        pass

    def save_projekt(self, ):
        pass

    def create_bewertung(self, ):
        pass

    def get_module_by_projekt_id(self, projekt_id):
        with ModulMapper() as mapper:
            return mapper.find_by_projekt_id(projekt_id)

    def get_modul_by_id(self, id):
        with ModulMapper() as mapper:
            return mapper.find_by_id(id)

    def get_bewertung_by_id(self, id):
        with BewertungMapper() as mapper:
            return mapper.find_by_id(id)

    def delete_bewertung(self, ):
        pass


    def get_teilnahmen_von_student(self, id):
        """ Alle Teilnamen des Users auslesen"""
        with TeilnahmeMapper() as mapper:
            return mapper.find_by_student_id(id)


    def get_teilnahmen_by_projekt_id(self, id):
        """ Alle Teilnamen des Users auslesen"""
        with TeilnahmeMapper() as mapper:
            return mapper.find_by_projekt_id(id)
    
    def get_students_by_projekt_id(self, id):
        """ Alle teilnehmenden Studenten des Projekts auslesen"""
        teilnahmen = self.get_teilnahmen_by_projekt_id(id)
        students = []
        for teilnahme in teilnahmen:  
            with StudentMapper() as mapper:
                students.append(mapper.find_by_id(teilnahme.get_teilnehmer()))
        return students

    def delete_teilnahme(self, ):
        pass

    def create_teilnahme(self, lehrangebotId, teilnehmerId):
        '''creat person'''

        teilnahme = Teilnahme()
        teilnahme.set_teilnehmer(teilnehmerId)
        teilnahme.set_lehrangebot(lehrangebotId)

        with TeilnahmeMapper() as mapper:
            return mapper.insert(teilnahme)
