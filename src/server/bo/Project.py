#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.bo import BusinessObject as bo
from server.bo.Automat import Automat

class Projekt(bo.BusinessObject): #Automat
    def __init__(self):
        self.__name = ""
        self.__max_teilnehmer = ""
        self.__projektbeschreibung = ""
        self.__betreuer = ""
        self.__externer_partner = ""
        self.__woechentlich = ""
        self.__anzahl_block_vor = ""
        self.__anzahl_block_in = ""
        self.__praeferierte_block = ""
        self.__bes_raum = ""
        self.__raum = ""
        self.__sprache = ""
        self.__dozent = ""
        self.__belegung = ""
        self.__modulname = ""
        self.__art = ""
        self.__halbjahr = ""
        self.__start = ""

    def get_name(self):
        '''return project name'''
        return self.__name
    def set_name(self, value):
        '''set new name for project'''
        self.__name = value

    def get_max_teilnehmer(self):
        ''' return maximum subscriber of the project'''
        return self.__max_teilnehmer

    def set_max_teilnehmer(self, value):
        '''set maximum subscribers for the project'''
        self.__max_teilnehmer = value

    def get_projektbeschreibung(self):
        '''return short description of the project'''
        return self.__projektbeschreibung

    def set_projektbeschreibung(self, value):
        '''set a project description Str()'''
        self.__projektbeschreibung = value 

    def get_betreuer(self):
        '''return the instructor of this project'''
        return self.__betreuer

    def set_betreuer(self, value):
        '''set instrutor for the project'''
        self.__betreuer = value

    def get_start_date(self):
        '''return the start date of the project. atm as char/string -> needs update to DATE()'''
        return self.__start

    def set_start_date(self, value):
        '''set the start date of the project. atm as char/string -> needs update to DATE()'''
        self.__start = value

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

    def get_modulname(self):
        '''return the name of the modul/project'''
        return self.__modulname

    def set_modulname(self, modul):
        pass

    def get_dozent(self, ):
        pass

    def set_dozent(self, dozent):
        pass

    def __str__(self, ):
        '''Create and return simple string of the BO'''
        return "Project: {},{},{},{},{}".format(self.get_id(), self.__name, self.__projektbeschreibung, self.__betreuer, self.__start, self.__max_teilnehmer)

    @staticmethod
    def from_dict(dictionary=dict()):
        '''dict() -> project'''
        obj = Projekt()
        obj.set_id(dictionary["id"]) # from BO
        obj.set_name(dictionary["name"])
        obj.set_projektbeschreibung(dictionary["description"])
        obj.set_betreuer(dictionary["betreuer"])
        obj.set_start_date(dictionary["start_date"])
        obj.set_max_teilnehmer(dictionary["max_subscriptions"])
        return obj

