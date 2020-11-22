#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.bo import BusinessObject as bo

class Person (bo.BusinessObject):
    '''
    Here all the information for the instance of a user are given. The user has atm the values: name, email role, and user-id (given from google firebase)
    '''
    def __init__(self):
        super().__init__()
        self.__name = ""
        self.__email = ""
        self.__google_user_id = None
        self.__role = 0
        self.__veranstaltung = []

    def get_name(self):
        '''return user name'''
        return self.__name

    def set_name(self, value):
        self.__name = value

    def get_email(self):
        '''return the email'''
        return self.__email

    def set_email(self, value):
        '''set email'''
        self.__email = value

    def get_google_user_id(self):
        '''tf i does what the function says?! '''
        return self.__google_user_id

    def set_google_user_id(self, value):
        '''set google user id from firebase'''
        self.__google_user_id = value

    
    def get_rolle(self, ):
        pass

    def set_rolle(self, rolle):
        pass

    def get_veranstaltung(self, ):
        pass

    def set_veranstaltung(self, projekte):
        pass

    def __str__(self):
        '''Simple textual user instance'''
        return "Person: {}, {}, {}, {}".format(self.get_id(), self.__name, self.__email, self.__google_user_id)

    @staticmethod
    def from_dict(dictionary=dict()):
        '''from python dict to Person()'''
        obj = Person()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_name(dictionary["name"])
        obj.set_email(dictionary["email"])
        obj.set_google_user_id(dictionary["google_user_id"])
        return obj


