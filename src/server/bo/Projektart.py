#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.bo.NamedBusinessObject import NamedBusinessObject


class Projektart(NamedBusinessObject):
    def __init__(self):
        self._sws = None
        self._ects = None

    def get_sws(self):
        return self._sws

    def set_sws(self, sws):
        self._sws = sws

    def get_ects(self):
        return self._ects

    def set_ects(self, ects):
        self._ects = ects

    def __str__(self, ):
        return "Projektart: {}, {}, {}, {}".format(
            self.get_id(),
            self.get_name(),
            self._sws,
            self._ects
            )
        
    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Projektart()
        obj.set_id(dictionary['id'])
        obj.set_name(dictionary['name'])
        obj.set_sws(dictionary['sws'])
        obj.set_ects(dictionary['ects'])
        return obj

    def to_dict(self):
        result = {
        'id': self.get_id(),
        'name': self.get_name(),
        'sws': self.get_sws(),
        'ects': self.get_ects()
        }