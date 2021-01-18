#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.bo.NamedBusinessObject import NamedBusinessObject


class Semester(NamedBusinessObject):
    """Realisierung eines Semesters

    Ein Semester vererbt von NBO (NamedBusinessObjekt). 
    Ein Semester hat keine weiteren Attribute
    """
    def __init__(self):
        super().__init__()

    def __str__(self, ):
        pass

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Semester()"""
        obj = Semester()
        obj.set_id(dictionary["id"]) # from BO
        obj.set_name(dictionary["name"]) # from NBO
        return obj