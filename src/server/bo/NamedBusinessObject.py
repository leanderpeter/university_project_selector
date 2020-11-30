#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.bo.BusinessObject import BusinessObject

class NamedBusinessObject(BusinessObject):
    def __init__(self):
        self._name = None

    def get_name(self):
        return self._name

    def set_name(self, name):
        self._name = name

