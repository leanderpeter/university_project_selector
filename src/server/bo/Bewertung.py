#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.bo.BusinessObject import BusinessObject


class Bewertung(BusinessObject):
    """Realisierung einer Bewertung

    Eine Bewertung bezitzt eine Note, die ein Dozent (oder Admin) einer Teilnahme vergeben kann 
    """
    def __init__(self):
        self._note = None # Note der Teilnahme

    def get_note(self):
        """Auslesen der Note"""
        return self._note

    def set_note(self, note):
        """Setzen der Note"""
        self._note = note

    def __str__(self, ):
        pass
