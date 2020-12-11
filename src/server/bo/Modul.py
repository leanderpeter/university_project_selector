#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.bo.NamedBusinessObject import NamedBusinessObject


class Modul(NamedBusinessObject):
    def __init__(self):
        self._edv_nr = None
        self._zugewiesene_teilnahme = []

    def get_edv_nr(self):
        return self._edv_nr

    def set_edv_nr(self, edv_nr):
        self._edv_nr = edv_nr

    def get_zugewiesene_teilnahmen(self, ):
        pass

    def set_zugewiesene_teilnahmen(self, teilnahmen):
        pass

    def __str__(self, ):
        pass
