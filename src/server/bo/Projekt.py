#!/usr/bin/python
# -*- coding: utf-8 -*-

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

    def get_max_teilnehmer(self):
        return self._max_teilnehmer

    def set_max_teilnehmer(self, anzahl):
        self._max_teilnehmer = anzahl

    def get_projektbeschreibung(self):
        return self._projektbeschreibung

    def set_projektbeschreibung(self, text):
        self._projektbeschreibung = text

    def get_betreuer(self):
        return self._betreuer

    def set_betreuer(self, name):
        self._betreuer = name

    def get_externer_partner(self):
        return self._externer_partner

    def set_externer_partner(self, name):
        self._externer_partner = name

    def get_woechentlich(self):
        return self._woechentlich

    def set_woechentlich(self, boolean):
        self._woechentlich = boolean

    def get_anzahl_block_vor(self):
        return self._anzahl_block_vor

    def set_anzahl_block_vor(self, anzahl):
        self._anzahl_block_vor = anzahl

    def get_anzahl_block_in(self):
        return self._anzahl_block_in

    def set_anzahl_block_in(self, anzahl):
        self._anzahl_block_in = anzahl

    def get_praeferierte_block(self, ):
        return self._praeferierte_block

    def set_praeferierte_block(self, text):
        self._praeferierte_block = text

    def get_bes_raum(self):
        return self._bes_raum

    def set_bes_raum(self, boolean):
        self._bes_raum = boolean

    def get_raum(self):
        return self._raum

    def set_raum(self, raum):
        self._raum = raum

    def get_sprache(self):
        return self._sprache

    def set_sprache(self, sprache):
        self._sprache = sprache

    def get_halbjahr(self):
        return self._halbjahr

    def set_halbjahr(self, semester):
        self._halbjahr = semester

    def get_art(self):
        return self._art

    def set_art(self, art):
        self._art = art

    def get_status(self):
        return self._status

    def set_status(self, status):
        self._status = status

    def get_belegung(self):
        return self._belegung

    def set_belegung(self, teilnahmen):
        self._belegung = teilnahmen

    def get_moduloption(self):
        return self._moduloption

    def set_moduloption(self, modul):
        self._moduloption = modul

    def get_dozent(self):
        return self._dozent

    def set_dozent(self, dozent):
        self._dozent = dozent

    def _str_(self, ):
        '''Create and return simple string of the BO'''
        return "Projekt: {},{},{},{},{},{},{},{},{},{},{},{},{}".format(self.get_id(), self.get_name(),
                                                                        self._max_teilnehmer, self._projektbeschreibung,
                                                                        self._betreuer, self._externer_partner,
                                                                        self._woechentlich, self._anzahl_block_vor,
                                                                        self._anzahl_block_in, self._praeferierte_block,
                                                                        self._bes_raum, self._raum, self._sprache)

    def to_dict(self):
        """Umwandeln Projekt() in ein Python dict()"""
        result = {
            "id": self.get_id(),
            "name": self.get_name(),
            "max_teilnehmer": self.get_max_teilnehmer(),
            "beschreibung": self.get_projektbeschreibung(),
            "betreuer": self.get_betreuer(),
            "externer_partner": self.get_externer_partner(),
            "woechentlich": self.get_woechentlich(),
            "anzahl_block_vor": self.get_anzahl_block_vor(),
            "anzahl_block_in": self.get_anzahl_block_in(),
            "praeferierte_block": self.get_praeferierte_block(),
            "bes_raum": self.get_bes_raum(),
            "raum": self.get_raum(),
            "sprache": self.get_sprache()
        }
        return result

    @staticmethod
    def from_dict(dictionary=dict()):
        '''dict() -> projekt'''
        obj = Projekt()
        obj.set_id(dictionary["id"])  # from BO
        obj.set_name(dictionary["name"])
        obj.set_max_teilnehmer(dictionary["max_teilnehmer"])
        obj.set_projektbeschreibung(dictionary["beschreibung"])
        obj.set_betreuer(dictionary["betreuer"])
        obj.set_externer_partner(dictionary["externer_partner"])
        obj.set_woechentlich(dictionary["woechentlich"])
        obj.set_anzahl_block_vor(dictionary["anzahl_block_vor"])
        obj.set_anzahl_block_in(dictionary["anzahl_block_in"])
        obj.set_praeferierte_block(dictionary["praeferierte_block"])
        obj.set_bes_raum(dictionary["bes_raum"])
        obj.set_raum(dictionary["raum"])
        obj.set_sprache(dictionary["sprache"])
        return obj
