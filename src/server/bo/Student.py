#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.bo.Person import Person

class Student(Person):
    def __init__(self):
        self.__mat_nr = None
        self.__kuerzel = None
        self.__partizipation = []

    def get_mat_nr(self, ):
        pass

    def set_mat_nr(self, matnr):
        pass

    def get_kuerzel(self, ):
        pass

    def set_kuerzel(self, kuerzel):
        pass

    def get_partizipation(self, ):
        pass

    def set_partizipation(self, teilnahmen):
        pass
