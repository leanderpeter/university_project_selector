#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.bo.NamedBusinessObject import NamedBusinessObject
from server.bo.Rolle import Rolle


class Person(NamedBusinessObject):
    """Realisierung einer Person

    Eine Person besitzt eine Email-Adresse, mit der sie sich einloggt, 
    eine eindeutige Google User ID sowie eine Rolle, welche einer Person zugewiesen wird.
    Diese Rollen vergeben den angemeldeten Personen später bestimmte Berechtigungen.
    """
    ROLLE_STUDENT = Rolle("Student") #Klassenvariable für die Rolle Student, instanziiert das Python Objekt Rolle() 
    ROLLE_DOZENT = Rolle("Dozent") #Klassenvariable für die Rolle Dozent, instanziiert das Python Objekt Rolle() 
    ROLLE_ADMIN = Rolle("Admin") #Klassenvariable für die Rolle Admin, instanziiert das Python Objekt Rolle() 

    def __init__(self):
        super().__init__()
        self._email = None #Die Email-Adresse der Person 
        self._google_user_id = None #Die eindeutige Google User ID der Person
        self._rolle = None #Die Rolle, welche einer Person zugewiesen wird

    def get_email(self):
        """ Auslesen der Email-Adresse"""
        return self._email

    def set_email(self, value):
        """ Setzen der Email """
        self._email = value

    def get_google_user_id(self):
        """ Auslesen der Google User ID"""
        return self._google_user_id

    def set_google_user_id(self, value):
        """ Setzen der Google User ID"""
        self._google_user_id = value

    def get_rolle(self):
        """ Auslesen der Rolle"""
        return self._rolle

    def set_rolle(self, rolle):
        """ Setzen der Rolle"""
        self._rolle = rolle

    def __str__(self):
        """ Umwandlung der Attributwerte des Objekts in einen String"""
        return "Person: {}, {}, {}, {}, {}".format(self.get_id(), self._name, self._email, self._google_user_id, self._rolle)

    @staticmethod
    def from_dict(dictionary=dict()):
        """ Umwandeln eines Python dict() in ein Python Objekt Person() """
        obj = Person()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_name(dictionary["name"])
        obj.set_email(dictionary["email"])
        obj.set_google_user_id(dictionary["google_user_id"])
        obj.set_rolle(dictionary["rolle"])
        return obj

