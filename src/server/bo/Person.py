#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.bo.NamedBusinessObject import NamedBusinessObject

class Person(NamedBusinessObject):
    def __init__(self):
        self.__google_user_id = None
        self.__rolle = None
        self.__veranstaltung = []

    def get_google_user_id(self, ):
        pass

    def set_google_user_id(self, id):
        pass

    def get_rolle(self, ):
        pass

    def set_rolle(self, rolle):
        pass

    def get_veranstaltung(self, ):
        pass

    def set_veranstaltung(self, projekte):
        pass

    def __str__(self, ):
        pass

