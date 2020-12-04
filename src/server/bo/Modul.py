#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.bo.NamedBusinessObject import NamedBusinessObject


class Modul(NamedBusinessObject):
    def __init__(self):
        self._edv_nr = None
        self._bestandteil = []
        self._zugewiesene_teilnahme = []

    def get_edv_nr(self, ):
        pass

    def set_edv_nr(self, edvnr):
        pass

    def get_bestandteil(self, ):
        pass

    def set_bestandteil(self, bestandteil):
        pass

    def get_zugewiesene_teilnahmen(self, ):
        pass

    def set_zugewiesene_teilnahmen(self, teilnahmen):
        pass

    def __str__(self, ):
        pass
