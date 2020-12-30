#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.bo.Person import Person


class Student(Person):
    
    def __init__(self):
        super().__init__()
        self._rolle = Person.ROLLE_STUDENT
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

    def __str__(self):
        '''Simple textual user instance'''
        return "Student: {}, {}, {}, {}, {}, {}, {}".format(self.get_id(), self._name, self._email, self._google_user_id, self._rolle, self._mat_nr, self._kuerzel)

    @staticmethod
    def from_dict(dictionary=dict()):
        '''from python dict to Student()'''
        obj = Student()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_name(dictionary["name"])
        obj.set_email(dictionary["email"])
        obj.set_google_user_id(dictionary["google_user_id"])
        obj.set_rolle(dictionary["rolle"])
        obj.set_mat_nr(dictionary["mat_nr"])
        obj.set_mat_nr(dictionary["kuerzel"])
        return obj
