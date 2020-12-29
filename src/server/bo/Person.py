#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.bo import BusinessObject as bo
from server.bo.NamedBusinessObject import NamedBusinessObject


class Person(NamedBusinessObject):
    '''
    Here all the information for the instance of a user are given. The user has atm the values: name, email role, and user-id (given from google firebase)
    '''

    def __init__(self):
        super().__init__()
        self._email = ""
        self._google_user_id = None
        self._rolle = None

    def get_email(self):
        '''return the email'''
        return self._email

    def set_email(self, value):
        '''set email'''
        self._email = value

    def get_google_user_id(self):
        '''tf i does what the function says?! '''
        return self._google_user_id

    def set_google_user_id(self, value):
        '''set google user id from firebase'''
        self._google_user_id = value

    def get_rolle(self):
        return self._rolle

    def set_rolle(self, rolle):
        self._rolle = rolle

    def __str__(self):
        '''Simple textual user instance'''
        return "Person: {}, {}, {}, {}, {}".format(self.get_id(), self._name, self._email, self._google_user_id, self._rolle)

    @staticmethod
    def from_dict(dictionary=dict()):
        '''from python dict to Person()'''
        obj = Person()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_name(dictionary["name"])
        obj.set_email(dictionary["email"])
        obj.set_google_user_id(dictionary["google_user_id"])
        obj.set_rolle(dictionary["rolle"])
        return obj
