#!/usr/bin/python
# -*- coding: utf-8 -*-
import argparse

from .bo.Person import Person
from .bo.Student import Student
from .bo.Projekt import Projekt
from .bo.Modul import Modul
from .bo.Semester import Semester
from .bo.Teilnahme import Teilnahme
from .bo.Zustand import Zustand
from .bo.Projektart import Projektart

from .db.PersonMapper import PersonMapper
from .db.StudentMapper import StudentMapper
from .db.TeilnahmeMapper import TeilnahmeMapper
from .db.BewertungMapper import BewertungMapper
from .db.ProjektMapper import ProjektMapper
from .db.ProjektWartelisteMapper import ProjektWartelisteMapper
from .bo.Teilnahme import Teilnahme
from .db.ModulMapper import ModulMapper
from .db.SemesterMapper import SemesterMapper
from .db.ProjektartMapper import ProjektartMapper



class ProjektAdministration(object):
    """Diese Klasse verbindet die API Anbindung via Flask (main.py) mit der Datenbankanbindung (Mapper-Klassen)
    """
    def __init__(self):
        pass

    def create_person(self, name, email, google_user_id, rolle):
        """Eine Person anlegen"""

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
        """Einen Studenten anlegen"""

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
        """Eine Person mit einer bestimmten ID auslesen"""
        with PersonMapper() as mapper:
            return mapper.find_by_id(id)

    def get_all_persons(self):
        """Eine Person mit einer bestimmten ID auslesen"""
        with PersonMapper() as mapper:
            return mapper.find_all()

    def get_user_by_email(self, ):
        pass

    def get_person_by_google_user_id(self, id):
        """Eine Person mit einer bestimmten Google User ID auslesen"""
        with PersonMapper() as mapper:
            return mapper.find_by_google_user_id(id)

    def get_alle_studenten(self):
        """Alle Studenten auslesen"""
        with StudentMapper() as mapper:
            return mapper.find_all()

    def get_student_by_google_user_id(self, id):
        """Einen Studenten mit einer bestimmten Google User ID auslesen"""
        with StudentMapper() as mapper:
            return mapper.find_by_google_user_id(id)

    def get_student_by_id(self, id):
        """Einen Studenten mit einer bestimmten ID auslesen"""
        with StudentMapper() as mapper:
            return mapper.find_by_id(id)

    def get_all_users(self, ):
        pass

    def save_person(self, user):
        """Eine Person speichern"""
        rolle = user.get_rolle()
        if rolle == "Dozent":
            user.set_rolle(Person.ROLLE_DOZENT)
        elif rolle == "Admin":
            user.set_rolle(Person.ROLLE_ADMIN)

        with PersonMapper() as mapper:
            mapper.update(user)

    def update_person_by_id(self, user):
        """Eine Person speichern"""
        rolle = user.get_rolle()
        if rolle == "Dozent":
            user.set_rolle(Person.ROLLE_DOZENT)
        elif rolle == "Admin":
            user.set_rolle(Person.ROLLE_ADMIN)

        with PersonMapper() as mapper:
            mapper.update_by_id(user)

    def save_student(self, user):
        """Einen Studenten speichern"""
        with StudentMapper() as mapper:
            mapper.update(user)

    def delete_user(self, ):
        pass

    def create_projekt(self, ):
        pass

    def get_projekt_by_id(self, projekt_id):
        """Ein Projekt mit einer bestimmten ID auslesen"""
        with ProjektMapper() as mapper:
            return mapper.find_projekt_by_id(projekt_id)

    def get_projekte(self):
        """Alle Projekte auslesen"""
        with ProjektMapper() as mapper:
            return mapper.find_all()  

    def get_projekte_by_zustand_by_dozent(self, zustand_id, dozent_id):
        """Alle Projekte eines bestimmten Dozenten mit einem bestimmten Zustand auslesen"""
        with ProjektMapper() as mapper:
            return mapper.find_projekte_by_zustand_by_dozent(zustand_id,dozent_id)

    def get_projekte_by_zustaende(self, zustand_id):
        """Alle Projekte mit einem bestimmten Zustand auslesen"""
        with ProjektMapper() as mapper:
            return mapper.find_projekte_by_zustaende(zustand_id)


    def set_zustand_at_projekt(self, projekt_id, zustand_id):
        """Den Zustand eines Projekts ändern"""
        with ProjektMapper() as mapper:
            return mapper.set_zustand_at_projekt(projekt_id,zustand_id)

    def get_alle_projekte(self, ):
        """Alle Projekte auslesen"""
        with ProjektMapper() as mapper:
            return mapper.find_all()

    def get_granted_projekte(self):
        """Alle Projekte im Zustand genehmigt auslesen"""
        with ProjektMapper() as mapper:
            return mapper.find_granted()

    def get_alle_pending_projekte(self):
        """Alle Projekte im Zustand Neu auslesen"""
        with ProjektWartelisteMapper() as mapper:
            return mapper.find_all()

    def get_projekt_teilnehmer(self, ):
        pass

    def get_projekte_by_projektart(self, ):
        pass

    def get_projekte_von_user(self, ):
        pass

    def delete_projekt(self, id):
        """Bestimmtes Projekt löschen"""
        with ProjektMapper() as mapper:
            return mapper.delete(id)

    def save_projekt(self, projekt):
        """Bestimmtes Projekt speichern"""
        with ProjektMapper() as mapper: 
            return mapper.update(projekt)

    def create_bewertung(self, ):
        pass

    def get_alle_semester(self):
        """Alle Semester auslesen"""
        with SemesterMapper() as mapper:
            return mapper.find_all()

    def get_semester_by_id(self, id):
        """Semester mit einer bestimmten ID auslesen"""
        with SemesterMapper() as mapper:
            return mapper.find_by_id(id)

    def create_semester(self, semester): 
        """Semester anlegen"""
        with SemesterMapper() as mapper:
            return mapper.insert(semester)

    def save_semester(self, semester):
        """Semester speichern"""
        with SemesterMapper() as mapper: 
            return mapper.update(semester)
            
    def delete_semester(self, id):
        """Semester löschen"""
        with SemesterMapper() as mapper:
            return mapper.delete(id)
    
    def get_semester_of_student(self, id):
        """Alle Semester eines Studenten auslesen, in der er eine Teilnahme hat"""
        with SemesterMapper() as mapper:
            return mapper.find_semester_of_student(id)

    def get_alle_module(self):
        """Alle Module auslesen"""
        with ModulMapper() as mapper:
            return mapper.find_all()

    def create_modul(self, modul): 
        """Modul anlegen"""
        with ModulMapper() as mapper:
            return mapper.insert(modul)

    def save_modul(self, modul):
        """Modul speichern"""
        with ModulMapper() as mapper: 
            return mapper.update(modul)

    def delete_modul(self, id):
        """Modul löschen"""
        with ModulMapper() as mapper:
            return mapper.delete(id)

    def get_module_by_projekt_id(self, projekt_id):
        """Wählbare Module eines Projekts auslesen"""
        with ModulMapper() as mapper:
            return mapper.find_by_projekt_id(projekt_id)

    def get_modul_by_id(self, id):
        """Modul mit einer bestimmten ID auslesen"""
        with ModulMapper() as mapper:
            return mapper.find_by_id(id)

    def create_projekte_hat_module(self, projekt_id, module):
        """Wählbare Module für ein Projekt anlegen"""
        for modul in module:
            with ModulMapper() as mapper:
                mapper.projekte_hat_module(projekt_id, modul)

    def update_projekte_hat_module(self, projekt_id, module):
        """Wählbare Module für ein Projekt updaten"""
        with ModulMapper() as mapper:
            mapper.delete_by_id(projekt_id)
            for modul in module:
                mapper.projekte_hat_module(projekt_id, modul)

    def get_alle_bewertungen(self):
        """Alle Bewertungen auslesen"""
        with BewertungMapper() as mapper:
            return mapper.find_all()

    def get_bewertung_by_id(self, id):
        """Bewertung mit einer bestimmten ID auslesen"""
        with BewertungMapper() as mapper:
            return mapper.find_by_id(id)
    
    def get_teilnahmen_von_student(self, id):
        """ Alle Teilnamen des Studenten auslesen"""
        with TeilnahmeMapper() as mapper:
            return mapper.find_by_student_id(id)
    
    def get_teilnahmen_by_modul_und_semester(self, modul_id, semester_id):
        """ Alle Teilnamen eines Moduls in einem bestimmten Semester auslesen"""
        with TeilnahmeMapper() as mapper:
            return mapper.find_by_modul_und_semester(modul_id, semester_id)

    def get_teilnahmen_by_semester(self, student_id, semester_id): 
        """ Alle Teilnamen eines Studenten in einem bestimmten Semester auslesen"""
        with TeilnahmeMapper() as mapper:
            return mapper.find_by_semester(student_id, semester_id)

    def get_teilnahmen_by_projekt_id(self, id):
        """ Alle Teilnamen eines bestimmten Projekts auslesen"""
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
        """ Eine bestimmte Teilnahme löschen"""
        with TeilnahmeMapper() as mapper:
            return mapper.delete(lehrangebotId, teilnehmerId)

    def delete_UserById(self, userId):
        """ Einen Studenten löschen"""
        with StudentMapper() as mapper:
            return mapper.deleteByID(userId)

    def create_teilnahme(self, lehrangebotId, teilnehmerId):
        """ Eine Teilnahme anlegen"""

        teilnahme = Teilnahme()
        teilnahme.set_teilnehmer(teilnehmerId)
        teilnahme.set_lehrangebot(lehrangebotId)

        with TeilnahmeMapper() as mapper:
            return mapper.insert(teilnahme)

    def create_wartelisteProjekt(self, id, name, max_teilnehmer, projektbeschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent, art, halbjahr, anzahlTeilnehmer, teilnehmerListe):
        """Ein warteliste Projekt erstellen"""
        projekt = Projekt()
        projekt.set_id(id)
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
        projekt.set_art(art)
        projekt.set_halbjahr(halbjahr)
        projekt.set_anzahlTeilnehmer(anzahlTeilnehmer)
        projekt.set_teilnehmerListe(teilnehmerListe)
        projekt.set_aktueller_zustand(Zustand('Neu'))

        with ProjektMapper() as mapper:
            return mapper.insert_pending(projekt)


    def save_teilnahme(self, teilnahme):
        """ Eine Teilnahme speichern"""
        with TeilnahmeMapper() as mapper:
            mapper.update(teilnahme)

    def update_student(self, student):
        """ Einen Studenten speichern"""
        with StudentMapper() as mapper:
            mapper.updateByUserId(student)

    def set_state(self, projekt, zus):
        """ Einen Zustand eines Projekts setzen"""
        projekt = Projekt()
        projekt.set_aktueller_zustand(zus)
        return projekt

    def get_alle_projektarten(self):
        """ Alle Projektarten auslesen"""
        with ProjektartMapper() as mapper:
            return mapper.find_all()

    def delete_projektart(self, id):
        """ Eine Projektart löschen"""
        with ProjektartMapper() as mapper:
            return mapper.delete(id)

    def save_projektart(self, projektart):
        """ Eine Projektart speichern"""
        with ProjektartMapper() as mapper: 
            return mapper.update(projektart)

    def create_projektart(self, projektart):
        """ Eine Projektart anlegen""" 
        with ProjektartMapper() as mapper:
            return mapper.insert(projektart)

    def get_projektart_by_id(self, id):
        """ Eine Projektart mit einer bestimmten ID auslesen"""
        with ProjektartMapper() as mapper:
            return mapper.find_projektart_by_id(id)

    def get_person_by_rolle(self, rolle):
        """ Gib alle Personen zurueck mit einer Rolle
        :param rolle -> String-Objekt
        """
        with PersonMapper() as mapper:
            return mapper.find_by_rolle(rolle)