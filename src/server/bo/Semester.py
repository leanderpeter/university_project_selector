#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.bo.NamedBusinessObject import NamedBusinessObject


class Semester(NamedBusinessObject):
    def __init__(self):
        super().__init__()

    def __str__(self, ):
        pass

    @staticmethod
    def from_dict(dictionary=dict()):
        '''dict() -> modul'''
        obj = Semester()
        obj.set_id(dictionary["id"]) # from BO
        obj.set_name(dictionary["name"]) # from NBO
        return obj