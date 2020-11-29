#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.db.Mapper import Mapper
from server.bo.Teilnahme import Teilnahme

class TeilnahmeMapper(Mapper):
    def __init__(self):
        super().__init__()


    def find_all(self):
        """ Findet alle Teilnahmen"""
        result = []
        cursor = self._connection.cursor()
        """Muss Teilnahmn heißen -> überprüfen"""
        cursor.execute("SELECT id, user from teilnahmen") 
        tuples = cursor.fetchall()

        for (id, teilnehmer) in tuples:
            teilnahme = Teilnahme()
            teilnahme.set_id(id)
            teilnahme.set_teilnehmer(teilnehmer)
            result.append(teilnahme)

        self._connection.commit()
        cursor.close()

        return result
        

    def find_by_user_id(self, user_id):
        """ Findet alle Teilnahmen für eine bestimmte user_id"""
        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, user FROM teilnahmen WHERE user={}".format(user_id) 
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, teilnehmer) in tuples:
            teilnahme = Teilnahme()
            teilnahme.set_id(id)
            teilnahme.set_teilnehmer(teilnehmer)
            result.append(teilnahme)


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
	with TeilnahmeMapper() as mapper:
		result = mapper.find_all()
		for p in result:
			print(p)