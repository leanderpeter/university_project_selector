#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.bo.BusinessObject import BusinessObject


class Teilnahme(BusinessObject):
    def __init__(self):
        super().__init__()
        self._teilnehmer = None
        self._lehrangebot = None
        self._anrechnung = None
        self._resultat = None

    def get_lehrangebot(self):
        return self._lehrangebot

    def set_lehrangebot(self, lehrangebot):
        self._lehrangebot = lehrangebot

    def get_teilnehmer(self, ):
        return self._teilnehmer

    def set_teilnehmer(self, teilnehmer):
        self._teilnehmer = teilnehmer
    
    def get_anrechnung(self ):
        return self._teilnehmer

    def set_anrechnung(self, anrechnung):
        self._anrechnung = anrechnung
    
    def get_resultat(self ):
        return self._resultat

    def set_resultat(self, resultat):
        self._resultat = resultat
