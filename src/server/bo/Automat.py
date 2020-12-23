#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.bo.Zustand import Zustand

class Automat(Zustand):
    def __init__(self):
        self._aktueller_zustand = Zustand()

    def get_aktueller_zustand(self):
        return self._aktueller_zustand.get_name()

    def set_aktueller_zustand(self, zustand):
        self._aktueller_zustand = Zustand(zustand)

    def __str__(self):
    	return self._aktueller_zustand

    	# return '"{}"'.format(self._aktueller_zustand)