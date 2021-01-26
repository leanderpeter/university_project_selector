#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.bo.BusinessObject import BusinessObject


class Teilnahme(BusinessObject):
    """Realisierung einer Teilnahme bei einem Projekt.

    Eine Teilnahme besitzt einen Teilnehmer, ein Lehrangebot, eine Anrechnung und ein Resultat,
    das ausgelesen und neu gesetzt werden kann.
    """
    def __init__(self):
        super().__init__()
        self._teilnehmer = None
        self._lehrangebot = None
        self._anrechnung = None
        self._resultat = None

    def get_lehrangebot(self):
        """Auslesen des Lehrangebots"""
        return self._lehrangebot

    def set_lehrangebot(self, lehrangebot):
        """Setzen des Lehrangebots"""
        self._lehrangebot = lehrangebot

    def get_teilnehmer(self, ):
        """Auslesen des Teilnehmers"""
        return self._teilnehmer

    def set_teilnehmer(self, teilnehmer):
        """Setzen des Teilnehmers"""
        self._teilnehmer = teilnehmer
    
    def get_anrechnung(self ):
        """Auslesen der Anrechnung"""
        return self._anrechnung

    def set_anrechnung(self, anrechnung):
        """Setzen der Anrechnung"""
        self._anrechnung = anrechnung
    
    def get_resultat(self ):
        """Auslesen des Resultats"""
        return self._resultat

    def set_resultat(self, resultat):
        """Setzen des Resultats"""
        self._resultat = resultat

    @staticmethod
    def from_dict(dictionary=dict()):
        """ Umwandeln eines Python dict() in ein Python Objekt Teilnahme() """
        teilnahme = Teilnahme()
        teilnahme.set_id(dictionary["id"])
        teilnahme.set_teilnehmer(dictionary["teilnehmer"])
        teilnahme.set_lehrangebot(dictionary["lehrangebot"])
        teilnahme.set_anrechnung(dictionary["anrechnung"])
        teilnahme.set_resultat(dictionary["resultat"])
        return teilnahme
