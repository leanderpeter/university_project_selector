#!/usr/bin/python
# -*- coding: utf-8 -*-
from abc import ABC, abstractmethod
import datetime


class BusinessObject(ABC):
    """Basisklasse für alle Businessobjekte
    
    alle Businessobjekte besitzen eine ID (Primärschlüssel) sowie die Erstellungszeit in der das BO erstellt wurde
    """

    def __init__(self):
        self._id = 0  # Die eindeutige ID für die Instanz dieser Klasse
        self._erstellungszeit = datetime.datetime.now() #Das Datum in der das BO erstellt wurde

    def get_id(self):
        """ Auslesen der ID """
        return self._id

    def set_id(self, value):
        """Setzen der ID """
        self._id = value

    def get_erstellungszeit(self):
        """ Auslesen der Erstellungszeit """
        return self._erstellungszeit


