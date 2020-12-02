#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.bo.Person import Person

class Student(Person):
    def __init__(self):
        super().__init__()
        self._mat_nr = None
        self._kuerzel = None

    def get_mat_nr(self):
        return self._mat_nr

    def set_mat_nr(self, matnr):
        self._mat_nr = matnr

    def get_kuerzel(self):
        return self._kuerzel

    def set_kuerzel(self, kuerzel):
        self._kuerzel = kuerzel

