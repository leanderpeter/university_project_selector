#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.db.Mapper import Mapper
from server.bo.Modul import Modul


class ModulMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_by_id(self, id):
        result = None

        cursor = self._connection.cursor()
        command = "SELECT id, name, edv_nr FROM module WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, edv_nr) = tuples[0]
            modul = Modul()
            modul.set_id(id)
            modul.set_name(name)
            modul.set_edv_nr(edv_nr)
            result = modul

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
			keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def find_by_projekt_id(self, projekt_id):
        result = []
        
        cursor = self._connection.cursor()
        command = "SELECT projekte_hat_module.modul_id, module.name, module.edv_nr FROM projekte_hat_module INNER JOIN module ON projekte_hat_module.modul_id = module.id WHERE projekte_hat_module.projekt_id ='{}'".format(projekt_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (modul_id, name, edv_nr) in tuples:
            modul = Modul()
            modul.set_id(modul_id)
            modul.set_name(name)
            modul.set_edv_nr(edv_nr)
            result.append(modul)

        self._connection.commit()
        cursor.close()

        return result



    def find_all(self):
        """finde alle Module in der Datenbank"""
        result = []

        cursor = self._connection.cursor()

        command = "SELECT id, name, edv_nr  FROM module"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, edv_nr) in tuples:
            modul = Modul()
            modul.set_id(id)
            modul.set_name(name)
            modul.set_edv_nr(edv_nr)
            result.append(modul)

        self._connection.commit()
        cursor.close()

        return result
    
    def projekte_hat_module(self, projekt_id, modul):
        cursor = self._connection.cursor()
        command = "INSERT INTO projekte_hat_module (projekt_id, modul_id) VALUES (%s,%s)"
        data = (projekt_id, modul)

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def find_by_key(self):
        """Reads a tuple with a given ID"""
        pass

    def insert(self):
        """Add the given object to the database"""
        pass

    def update(self):
        """Update an already given object in the DB"""
        pass

    def delete(self):
        """Delete an object from the DB"""
        pass

