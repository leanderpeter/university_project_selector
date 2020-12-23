#!/usr/bin/python
# -*- coding: utf-8 -*-
from abc import ABC, abstractmethod
import datetime


class BusinessObject(ABC):
    """
    Base class for all business objects.
    every business objetcs gets a unique ID (primary key)

    """

    def __init__(self):
        self._id = 0  # unique ID for the instance of the class
        self._erstellungszeit = datetime.datetime.now()

    def get_id(self):
        ''' return the ID of the business object'''
        return self._id

    def set_id(self, value):
        '''set a ID for the given business object'''
        self._id = value

    def get_erstellungszeit(self):
        return self._erstellungszeit


