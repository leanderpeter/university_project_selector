#!/usr/bin/python
# -*- coding: utf-8 -*-
import argparse

from .bo.Person import Person
from .bo.Student import Student
from .bo.Projekt import Projekt
from .bo.Teilnahme import Teilnahme
from .bo.Zustand import Zustand

from .db.PersonMapper import PersonMapper
from .db.StudentMapper import StudentMapper
from .db.TeilnahmeMapper import TeilnahmeMapper
from .db.BewertungMapper import BewertungMapper
from .db.ProjektMapper import ProjektMapper
from .db.ProjektWartelisteMapper import ProjektWartelisteMapper
from .bo.Teilnahme import Teilnahme
from .db.ModulMapper import ModulMapper
from .db.SemesterMapper import SemesterMapper



class ProjektAdministration(object):
    def __init__(self):
        pass

    def create_person(self, name, email, google_user_id, rolle):
        '''creat person'''

        user = Person()
        user.set_name(name)
        user.set_email(email)
        user.set_google_user_id(google_user_id)
        if rolle == "Dozent":
            user.set_rolle(Person.ROLLE_DOZENT)
        elif rolle == "Admin":
            user.set_rolle(Person.ROLLE_ADMIN)
        user.set_id(1)

        with PersonMapper() as mapper:
            return mapper.insert(user)

    def create_student(self, name, email, google_user_id, kuerzel, mat_nr):
        '''creat student'''

        user = Student()
        user.set_name(name)
        user.set_email(email)
        user.set_google_user_id(google_user_id)
        user.set_kuerzel(kuerzel)
        user.set_mat_nr(mat_nr)
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

    def get_alle_studenten(self):
        """return alle Studenten """
        with StudentMapper() as mapper:
            return mapper.find_all()

    def get_student_by_google_user_id(self, id):
        '''read and return user with specific user id'''
        with StudentMapper() as mapper:
            return mapper.find_by_google_user_id(id)

    def get_student_by_id(self, id):
        '''read and return user with specific student id'''
        with StudentMapper() as mapper:
            return mapper.find_by_id(id)

    def get_all_users(self, ):
        pass

    def save_person(self, user):
        '''save given user'''
        rolle = user.get_rolle()
        if rolle == "Dozent":
            user.set_rolle(Person.ROLLE_DOZENT)
        elif rolle == "Admin":
            user.set_rolle(Person.ROLLE_ADMIN)
            
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

    def get_projekt_by_zus(self):
        with ProjektMapper() as mapper:
            return mapper.find_granted()


    
        
    def get_projekte_by_zustand(self, zustand_id):
        with ProjektMapper() as mapper:
            return mapper.find_projekte_by_zustand(zustand_id)

    def get_projekte_by_zustand_by_dozent(self, zustand_id, dozent_id):
        with ProjektMapper() as mapper:
            return mapper.find_projekte_by_zustand_by_dozent(zustand_id,dozent_id)
    def get_projekte_by_zustaende(self, zustand_id):
        with ProjektMapper() as mapper:
            return mapper.find_projekte_by_zustaende(zustand_id)


    def set_zustand_at_projekt(self, projekt_id, zustand_id):
        with ProjektMapper() as mapper:
            return mapper.set_zustand_at_projekt(projekt_id,zustand_id)

    def get_alle_projekte(self, ):
        """return alle Projekte """
        with ProjektMapper() as mapper:
            return mapper.find_all()

    def get_granted_projekte(self):
        """return alle Projekte """
        with ProjektMapper() as mapper:
            return mapper.find_granted()

    def get_alle_pending_projekte(self):
        '''Gib alle ungehemigten Projekte zuruck'''
        with ProjektWartelisteMapper() as mapper:
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

    def get_alle_semester(self):
        with SemesterMapper() as mapper:
            return mapper.find_all()

    def get_semester_by_id(self, id):
        with SemesterMapper() as mapper:
            return mapper.find_by_id(id)

    def get_alle_module(self):
        with ModulMapper() as mapper:
            return mapper.find_all()

    def get_module_by_projekt_id(self, projekt_id):
        with ModulMapper() as mapper:
            return mapper.find_by_projekt_id(projekt_id)

    def get_modul_by_id(self, id):
        with ModulMapper() as mapper:
            return mapper.find_by_id(id)

    def get_alle_bewertungen(self):
        with BewertungMapper() as mapper:
            return mapper.find_all()

    def get_bewertung_by_id(self, id):
        with BewertungMapper() as mapper:
            return mapper.find_by_id(id)

    def delete_bewertung(self, ):
        pass


    def get_teilnahmen_von_student(self, id):
        """ Alle Teilnamen des Users auslesen"""
        with TeilnahmeMapper() as mapper:
            return mapper.find_by_student_id(id)
    
    def get_teilnahmen_by_modul_und_semester(self, modul_id, semester_id):
        """ Alle Teilnamen des Users auslesen"""
        with TeilnahmeMapper() as mapper:
            return mapper.find_by_modul_und_semester(modul_id, semester_id)


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

    
    def delete_teilnahme(self, lehrangebotId, teilnehmerId):
       with TeilnahmeMapper() as mapper:
            return mapper.delete(lehrangebotId, teilnehmerId)

    def create_teilnahme(self, lehrangebotId, teilnehmerId):
        '''creat teilnahme'''

        teilnahme = Teilnahme()
        teilnahme.set_teilnehmer(teilnehmerId)
        teilnahme.set_lehrangebot(lehrangebotId)

        with TeilnahmeMapper() as mapper:
            return mapper.insert(teilnahme)

    def create_wartelisteProjekt(self, name, max_teilnehmer, projektbeschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent, anzahlTeilnehmer, teilnehmerListe, ects):
        '''Ein warteliste Projekt erstellen'''
        projekt = Projekt()
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
        projekt.set_anzahlTeilnehmer(anzahlTeilnehmer)
        projekt.set_teilnehmerListe(teilnehmerListe)
        projekt.set_id(1)
        projekt.set_name(name)
        projekt.set_aktueller_zustand(Zustand('Neu'))
        projekt.set_ects(ects)
        print(projekt)

        with ProjektMapper() as mapper:
            return mapper.insert_pending(projekt)


    def save_teilnahme(self, teilnahme):
        with TeilnahmeMapper() as mapper:
            mapper.update(teilnahme)

    def set_state(self, projekt, zus):
        projekt = Projekt()
        projekt.set_aktueller_zustand(zus)
        return projekt

"""     def get_state(self, projekt):
        return self.projekt.get_aktueller_zustand() """

