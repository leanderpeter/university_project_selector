#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.bo.NamedBusinessObject import NamedBusinessObject


class Modul(NamedBusinessObject):
    """Realisierung eines Moduls

    Ein Modul besitzt eine EDV-Nummer
    """
    def __init__(self):
        self._edv_nr = None #EDV-Nummer

    def get_edv_nr(self):
        """ Auslesen der EDV-Nummer """
        return self._edv_nr

    def set_edv_nr(self, edv_nr):
        """ Setzen der EDV-Nummer """
        self._edv_nr = edv_nr

    def __str__(self, ):
        pass

    @staticmethod
    def from_dict(dictionary=dict()):
        """ Umwandeln eines Python dict() in ein Python Objekt Modul() """
        obj = Modul()
        obj.set_id(dictionary["id"]) # from BO
        obj.set_name(dictionary["name"]) # from NBO
        obj.set_edv_nr(dictionary["edv_nr"]) 
        return obj