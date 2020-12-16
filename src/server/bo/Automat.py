#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.bo.Zustand import Zustand

class Automat(Zustand):
    def __init__(self):
        self._aktueller_zustand = None

    def get_aktueller_zustand(self):
        return self._aktueller_zustand

    def set_aktueller_zustand(self, zustand):
        self._aktueller_zustand = zustand

    def __str__(self, ):
        pass
