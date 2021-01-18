#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.bo.Person import Person


class Student(Person):
    """Realisierung eines Studenten

    Ein Student ist eine Person und vererbt somit alle Attribute von ihr.
    Zusätzlich haben Studenten eine Matrikelnummer, sowie ein Kuerzel
    """
    def __init__(self):
        super().__init__()
        self._rolle = Person.ROLLE_STUDENT #Studenten besitzen immer die Rolle Student (instanziiert durch Klassenvariable von Person)
        self._mat_nr = None #Die Matrikelnummer des Studenten
        self._kuerzel = None #Das Kuerzel des Studenten

    def get_mat_nr(self):
        """ Auslesen der Matrikelnummer"""
        return self._mat_nr

    def set_mat_nr(self, matnr):
        """ Setzen der Matrikelnummer"""
        self._mat_nr = matnr

    def get_kuerzel(self):
        """ Auslesen des Kuerzel"""
        return self._kuerzel

    def set_kuerzel(self, kuerzel):
        """ Setzen des Kuerzel"""
        self._kuerzel = kuerzel

    def __str__(self):
        """ Umwandlung der Attributwerte des Objekts in einen String"""
        return "Student: {}, {}, {}, {}, {}, {}, {}".format(self.get_id(), self._name, self._email, self._google_user_id, self._rolle, self._mat_nr, self._kuerzel)

    @staticmethod
    def from_dict(dictionary=dict()):
        """ Umwandeln eines Python dict() in ein Python Objekt Student() """
        obj = Student()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_name(dictionary["name"])
        obj.set_email(dictionary["email"])
        obj.set_google_user_id(dictionary["google_user_id"])
        obj.set_rolle(dictionary["rolle"])
        obj.set_mat_nr(dictionary["mat_nr"])
        obj.set_mat_nr(dictionary["kuerzel"])
        return obj
