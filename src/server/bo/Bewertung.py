#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.bo.BusinessObject import BusinessObject


class Bewertung(BusinessObject):
    def __init__(self):
        self._note = None
        self._leistung = None

    def get_note(self):
        return self._note

    def set_note(self, note):
        self._note = note

    def get_leistung(self, ):
        pass

    def set_leistung(self, teilnahme):
        pass

    def __str__(self, ):
        pass
