#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.bo.NamedBusinessObject import NamedBusinessObject
from server.bo.Automat import Automat

class Projekt(NamedBusinessObject, Automat):
    def __init__(self):
        super().__init__()
        self._max_teilnehmer = None
        self._projektbeschreibung = None
        self._betreuer = None
        self._externer_partner = None
        self._woechentlich = None
        self._anzahl_block_vor = None
        self._anzahl_block_in = None
        self._praeferierte_block = None
        self._bes_raum = None
        self._raum = None
        self._sprache = None
        self._dozent = []
        self._belegung = []
        self._moduloption = []
        self._art = None
        self._halbjahr = []
    
    def get_id(self):
        ''' return the ID of the business object'''
        return self.__id

    def set_id(self, id):
        '''set a ID for the given business object'''
        self._id = id

    def get_erstellungszeit(self):
        pass

    def set_erstellungszeit(self, zeit):
        pass

    def get_name(self):
        '''return name'''
        return self._name

    def set_name(self, name):
        self._name = name
    
    def get_zustand(self, ):
        return self.__aktueller_zustand

    def set_zustand(self, zustand):
        self.__aktueller_zustand = zustand

    def get_max_teilnehmer(self):
        return self._max_teilnehmer

    def set_max_teilnehmer(self, anzahl):
        self._max_teilnehmer = anzahl

    def get_projektbeschreibung(self):
        return self.__projektbeschreibung

    def set_projektbeschreibung(self, text):
        self.__projektbeschreibung = text

    def get_betreuer(self):
        return self.__betreuer

    def set_betreuer(self, name):
        self.__betreuer = name

    def get_externer_partner(self):
        return self.__externer_partner

    def set_externer_partner(self, name):
        self.__externer_partner = name

    def get_woechentlich(self):
        return self.__woechentlich

    def set_woechentlich(self, boolean):
        self.__woechentlich = boolean

    def get_anzahl_block_vor(self):
        return self.__anzahl_block_vor

    def set_anzahl_block_vor(self, anzahl):
        self.__anzahl_block_vor = anzahl

    def get_anzahl_block_in(self):
        return self.__anzahl_block_in

    def set_anzahl_block_in(self, anzahl):
        self.__anzahl_block_in = anzahl

    def get_praeferierte_block(self, ):
        return self.__praeferierte_block

    def set_praeferierte_block(self, text):
        self.__praeferierte_block = text

    def get_bes_raum(self):
        return self.__bes_raum

    def set_bes_raum(self, boolean):
        self.__bes_raum = boolean

    def get_raum(self):
        return self.__raum

    def set_raum(self, raum):
        self.__raum = raum

    def get_sprache(self):
        return self.__sprache

    def set_sprache(self, sprache):
        self.__sprache = sprache

    def get_halbjahr(self):
        return self.__halbjahr

    def set_halbjahr(self, semester):
        self.__halbjahr = semester

    def get_art(self):
        return self.__art

    def set_art(self, art):
        self.__art = art

    def get_status(self):
        return self.__status

    def set_status(self, status):
        self.__status = status

    def get_belegung(self):
        return self.__belegung

    def set_belegung(self, teilnahmen):
        self.__belegung = teilnahmen

    def get_moduloption(self):
        return self.__moduloption

    def set_moduloption(self, modul):
        self.__moduloption = modul

    def get_dozent(self):
        return self.__dozent

    def set_dozent(self, dozent):
        self.__dozent = dozent

    def __str__(self):
        pass

