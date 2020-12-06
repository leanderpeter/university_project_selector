#!/usr/bin/python
#-*- coding: utf-8 -*-

class Automat:
    def __init__(self):
        self._aktueller_zustand = None

       
    def get_zustand(self):
        return self._aktueller_zustand

    def set_zustand(self, zustand):
        self._aktueller_zustand = zustand


    def __str__(self, ):
        pass

