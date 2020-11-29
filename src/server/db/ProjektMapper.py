#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.db.Mapper import Mapper
from server.bo.Projekt import Projekt

class ProjektMapper(Mapper):
    def __init__(self):
        super().__init__()


    def find_all(self):
        """Reads all tuple and returns them as an object"""
        pass

    def find_by_teilnahme_id(self, teilnahme_id):
        """ Findet alle Teilnahmen für eine bestimmte user_id"""
        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, teilnahme FROM projekte WHERE teilnahme={}".format(teilnahme_id) 
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, teilnahme) in tuples:
            projekt = Projekt()
            projekt.set_id(id)
            projekt.set_belegung(teilnahme) 
            """ Belegung ist bescheuert, teilnahme währe besser, aber Klassendiagramme... """
            result.append(projekt)


        self._connection.commit()
        cursor.close()

        return result

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


'''Nur zum testen'''

if (__name__ == "__main__"):
	with ProjektMapper() as mapper:
		result = mapper.find_all()
		for p in result:
			print(p)