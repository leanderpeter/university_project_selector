#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.bo.BusinessObject import BusinessObject

class Teilnahme(BusinessObject):
    def __init__(self):
        self._teilnehmer = None
        self._resultat = None
        self._lehrangebot = None
        self._anrechnung = None

    def get_lehrangebot(self):
        return self._lehrangebot

    def set_lehrangebot(self, lehrangebot):
        self._lehrangebot = lehrangebot

    def get_teilnehmer(self, ):
        pass

    def set_teilnehmer(self, teilnehmer):
        pass

    def get_anrechnung(self, ):
        pass

    def set_anrechnung(self, modul):
        pass

    def get_resultat(self, ):
        pass

    def set_resultat(self, resultat):
        pass

    def __str__(self, ):
        pass

