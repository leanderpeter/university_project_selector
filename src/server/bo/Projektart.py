#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.bo.NamedBusinessObject import NamedBusinessObject


class Projektart(NamedBusinessObject):
    """Realisierung einer Projektart

    Eine Projektart besitzt eine Anzahl an SWS (Semesterwochenstunden) als auch ECTS (European Credit Transfer System) 
    """
    def __init__(self):
        self._sws = None # Anzahl an SWS einer Projektart
        self._ects = None # Anzahl an ECTS einer Projektart

    def get_sws(self):
        """Auslesen der SWS"""
        return self._sws

    def set_sws(self, sws):
        """Setzen der SWS"""
        self._sws = sws

    def get_ects(self):
        """Auslesen der ECTS"""
        return self._ects

    def set_ects(self, ects):
        """Setzen der ECTS"""
        self._ects = ects

    def __str__(self, ):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz"""
        return "Projektart: {}, {}, {}, {}".format(
            self.get_id(),
            self.get_name(),
            self._sws,
            self._ects
            )
        
    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in eine Projektart()"""
        obj = Projektart()
        obj.set_id(dictionary['id'])
        obj.set_name(dictionary['name'])
        obj.set_sws(dictionary['sws'])
        obj.set_ects(dictionary['ects'])
        return obj

    def to_dict(self):
        """Umwandeln Projektart() in ein Python dict()"""
        result = {
        'id': self.get_id(),
        'name': self.get_name(),
        'sws': self.get_sws(),
        'ects': self.get_ects()
        }