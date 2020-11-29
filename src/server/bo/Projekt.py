#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.bo.NamedBusinessObject import NamedBusinessObject
from server.bo.Automat import Automat

class Projekt(NamedBusinessObject, Automat):
    def __init__(self):
        self.__max_teilnehmer = None
        self.__projektbeschreibung = None
        self.__betreuer = None
        self.__externer_partner = None
        self.__woechentlich = None
        self.__anzahl_block_vor = None
        self.__anzahl_block_in = None
        self.__praeferierte_block = None
        self.__bes_raum = None
        self.__raum = None
        self.__sprache = None
        self.__dozent = []
        self.__belegung = []
        self.__moduloption = []
        self.__art = None
        self.__halbjahr = []

    def get_max_teilnehmer(self, ):
        pass

    def set_max_teilnehmer(self, anzahl):
        pass

    def get_projektbeschreibung(self, ):
        pass

    def set_projektbeschreibung(self, text):
        pass

    def get_betreuer(self, ):
        pass

    def set_betreuer(self, name):
        pass

    def get_externer_partner(self, ):
        pass

    def set_externer_partner(self, name):
        pass

    def get_woechentlich(self, ):
        pass

    def set_woechentlich(self, boolean):
        pass

    def get_anzahl_block_vor(self, ):
        pass

    def set_anzahl_block_vor(self, anzahl):
        pass

    def get_anzahl_block_in(self, ):
        pass

    def set_anzahl_block_in(self, anzahl):
        pass

    def get_praeferierte_block(self, ):
        pass

    def set_praeferierte_block(self, text):
        pass

    def get_bes_raum(self, ):
        pass

    def set_bes_raum(self, boolean):
        pass

    def get_raum(self, ):
        pass

    def set_raum(self, raum):
        pass

    def get_sprache(self, ):
        pass

    def set_sprache(self, sprache):
        pass

    def get_halbjahr(self, ):
        pass

    def set_halbjahr(self, semester):
        pass

    def get_art(self, ):
        pass

    def set_art(self, art):
        pass

    def get_status(self, ):
        pass

    def set_status(self, status):
        pass

    def get_belegung(self, ):
        pass

    def set_belegung(self, teilnahmen):
        pass

    def get_moduloption(self, ):
        pass

    def set_moduloption(self, modul):
        pass

    def get_dozent(self, ):
        pass

    def set_dozent(self, dozent):
        pass

    def __str__(self, ):
        pass

