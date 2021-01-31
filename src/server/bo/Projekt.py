#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.bo.NamedBusinessObject import NamedBusinessObject
from server.bo.Automat import Automat
from server.bo.Zustand import Zustand


class Projekt(NamedBusinessObject, Automat):
    """Realisierung einer exemplarischen Projektes.

    Ein Projekt besitzt die untenstehenden Attribute maximale Teilnehmer, Projektbeschreibung usw.
    Ein Projekt befindet sich dabei immer in genau einem Zustand,
    nach dem es durch mehrere Operationen abgefragt werden kann
    """

    Z_NEU = Zustand("Neu")
    Z_GENEHMIGT = Zustand("Genehmigt")
    Z_IN_BEWERTUNG = Zustand("In Bewertung")
    Z_ABGESCHLOSSEN = Zustand("Abgeschlossen")
    Z_WAHLFREIGABE = Zustand("Wahlfreigabe")
    Z_ABGELEHNT = Zustand("Abgelehnt")

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
        self._dozent = None
        self._halbjahr = None
        self._art = None
        self._anzahlTeilnehmer = None
        self._teilnehmerListe = None

    def get_max_teilnehmer(self):
        """ Auslesen der maximalen Teilnehmeranzahl"""
        return self._max_teilnehmer

    def set_max_teilnehmer(self, anzahl):
        """ Setzen der maximalen Teilnehmeranzahl"""
        self._max_teilnehmer = anzahl

    def get_projektbeschreibung(self):
        """ Auslesen der Projektbeschreibung"""
        return self._projektbeschreibung

    def set_projektbeschreibung(self, text):
        """ Setzen der Projektbeschreibung"""
        self._projektbeschreibung = text

    def get_betreuer(self):
        """ Auslesen des Projektbetreuers"""
        return self._betreuer

    def set_betreuer(self, name):
        """ Setzen des Projektbetreuers"""
        self._betreuer = name

    def get_externer_partner(self):
        """ Auslesen der externen Partner"""
        return self._externer_partner

    def set_externer_partner(self, name):
        """ Setzen der externen Partner"""
        self._externer_partner = name

    def get_woechentlich(self):
        """ Auslesen ob das Projekt wöchentlich stattfindet """
        return self._woechentlich

    def set_woechentlich(self, boolean):
        """ Setzen ob das Projekt wöchentlich stattfindet """
        self._woechentlich = boolean

    def get_anzahl_block_vor(self):
        """ Auslesen der Blocktage vor Semesterbeginn"""
        return self._anzahl_block_vor

    def set_anzahl_block_vor(self, anzahl):
        """ Setzen der Blocktage vor Semesterbeginn"""
        self._anzahl_block_vor = anzahl

    def get_anzahl_block_in(self):
        """ Auslesen der Blocktage in der Vorlesungszeit"""
        return self._anzahl_block_in

    def set_anzahl_block_in(self, anzahl):
        """ Setzen der Blocktage in der Vorlesungszeit"""
        self._anzahl_block_in = anzahl

    def get_praeferierte_block(self, ):
        """ Auslesen der präferierten Blocktage """
        return self._praeferierte_block

    def set_praeferierte_block(self, text):
        """ Setzen der präferierten Blocktage """
        self._praeferierte_block = text

    def get_bes_raum(self):
        """ Auslesen ob ein besnoderer Raum gewünscht ist"""
        return self._bes_raum

    def set_bes_raum(self, boolean):
        """ Setzen ob ein besnoderer Raum gewünscht ist"""
        self._bes_raum = boolean

    def get_raum(self):
        """ Auslesen welcher Raum gewünscht ist"""
        return self._raum

    def set_raum(self, raum):
        """ Setzen welcher Raum gewünscht ist"""
        self._raum = raum

    def get_sprache(self):
        """ Auslesen der Sprache"""
        return self._sprache

    def set_sprache(self, sprache):
        """ Setzen der Sprache"""
        self._sprache = sprache

    def get_halbjahr(self):
        """ Auslesen des Halbjahrs"""
        return self._halbjahr

    def set_halbjahr(self, semester):
        """ Setzen des Halbjahrs"""
        self._halbjahr = semester

    def get_art(self):
        """ Auslesen der Projektart"""
        return self._art

    def set_art(self, art):
        """ Setzen der Projektart"""
        self._art = art

    def get_dozent(self):
        """ Auslesen des Dozenten"""
        return self._dozent

    def set_dozent(self, dozent):
        """ Setzen des Dozenten"""
        self._dozent = dozent

    def get_anzahlTeilnehmer(self):
        """ Auslesen der aktuellen Teilnehmeranzahl"""
        return self._anzahlTeilnehmer

    def set_anzahlTeilnehmer(self, anzahlTeilnehmer):
        """ Setzen der aktuellen Teilnehmeranzahl"""
        self._anzahlTeilnehmer = anzahlTeilnehmer

    def get_teilnehmerListe(self):
        """ Auslesen der Teilnehmerliste"""
        return self._teilnehmerListe

    def set_teilnehmerListe(self, teilnehmerListe):
        """ Setzen der Teilnehmerliste"""
        self._teilnehmerListe = teilnehmerListe


    def __str__(self):
        '''Create and return simple string of the BO'''
        return "Projekt: {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, '{}'".format(
                                                                              self.get_id(),
                                                                              self.get_name(),
                                                                              self._max_teilnehmer,
                                                                              self._projektbeschreibung,
                                                                              self._betreuer, 
                                                                              self._externer_partner,
                                                                              self._woechentlich,
                                                                              self._anzahl_block_vor,
                                                                              self._anzahl_block_in,
                                                                              self._praeferierte_block,
                                                                              self._bes_raum, 
                                                                              self._raum, 
                                                                              self._sprache,
                                                                              self._dozent,
                                                                              self._art,
                                                                              self._halbjahr,
                                                                              self._anzahlTeilnehmer,
                                                                              self._teilnehmerListe,                                
                                                                              self.get_aktueller_zustand())


    @staticmethod
    def from_dict(dictionary=dict()):
        '''dict() -> projekt'''
        obj = Projekt()
        obj.set_id(dictionary["id"]) # from BO
        obj.set_name(dictionary["name"]) # from NBO
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
        obj.set_dozent(dictionary["dozent"])
        obj.set_aktueller_zustand(dictionary["aktueller_zustand"]) # from Automat
        obj.set_halbjahr(dictionary["halbjahr"])
        obj.set_art(dictionary["art"])
        obj.set_anzahlTeilnehmer(dictionary["anzahlTeilnehmer"])
        obj.set_teilnehmerListe(dictionary["teilnehmerListe"])
        return obj

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
            "sprache": self.get_sprache(),
            "dozent": self.get_dozent(),
            "aktueller_zustand": self.get_aktueller_zustand(),
            "halbjahr": self.get_halbjahr(),
            "art": self.get_art(),
            "anzahlTeilnehmer": self.get_anzahlTeilnehmer(),
            "teilnehmerListe": self.get_teilnehmerListe(),
        }
        return result
