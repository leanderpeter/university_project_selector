#!/usr/bin/python
# -*- coding: utf-8 -*-
import argparse

from .bo.Person import Person
from .bo.Student import Student
from .bo.Projekt import Projekt

from .db.PersonMapper import PersonMapper
from .db.StudentMapper import StudentMapper
from .db.TeilnahmeMapper import TeilnahmeMapper
from .db.ProjektMapper import ProjektMapper
from .db.ProjektWartelisteMapper import ProjektWartelisteMapper
from .bo.Teilnahme import Teilnahme


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

    def get_user_by_id(self, ):
        pass

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

    def get_projekt_by_id(self, ):
        pass

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

    def save_projekt(self, projekt):
        pass

    def create_bewertung(self, ):
        pass

    def get_bewertung(self, ):
        pass

    def delete_bewertung(self, ):
        pass

    def create_teilnahme(self, ):
        pass

    def get_teilnahmen_von_student(self, id):
        """ Alle Teilnamen des Users auslesen"""
        with TeilnahmeMapper() as mapper:
            return mapper.find_by_student_id(id)

    def get_projekte_von_teilnahmen(self, teilnahmen):
        result = []

        for a in teilnahmen:
            projekt_id = a.get_lehrangebot()
            with ProjektMapper() as mapper:
                projekt = mapper.find_projekt_by_id(projekt_id)
            result.append(projekt)

        return result

    def delete_teilnahme(self, ):
        pass

    def create_teilnahme(self, lehrangebotId, teilnehmerId):
        '''creat person'''

        teilnahme = Teilnahme()
        teilnahme.set_teilnehmer(teilnehmerId)
        teilnahme.set_lehrangebot(lehrangebotId)

        with TeilnahmeMapper() as mapper:
            return mapper.insert(teilnahme)

    def create_wartelisteProjekt(self, name, max_teilnehmer, projektbeschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent, belegung, moduloption, art):
        '''Ein warteliste Projekt erstellen'''
        projekt = Projekt()
        projekt.set_name(name)
        projekt.set_max_teilnehmer(max_teilnehmer)
        projekt.set_projektbeschreibung(projektbeschreibung)
        projekt.set_betreuer(betreuer)
        projekt.set_externer_partner(externer_partner)
        projekt.set_woechentlich(woechentlich)
        projekt.set_anzahl_block_vor(anzahl_block_vor)
        projekt.set_anzahl_block_in(anzahl_block_in)
        projekt.set_praeferierte_block(praeferierte_block)
        projekt.set_bes_raum(bes_raum)
        projekt.set_raum(raum)
        projekt.set_sprache(sprache)
        projekt.set_dozent(dozent)
        projekt.set_belegung(belegung)
        projekt.set_moduloption(moduloption)
        projekt.set_art(art)
        projekt.set_id(1)

        with ProjektWartelisteMapper() as mapper:
            return mapper.insert(projekt)


