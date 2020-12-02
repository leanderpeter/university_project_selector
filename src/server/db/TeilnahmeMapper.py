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
        cursor.execute("SELECT * from teilnahmen") 
        tuples = cursor.fetchall()

        for (id, lehrangebot, anrechnung, teilnehmer, resultat) in tuples:
            teilnahme = Teilnahme()
            teilnahme.set_id(id)
            teilnahme.set_lehrangebot(lehrangebot)
            teilnahme.set_anrechnung(anrechnung)
            teilnahme.set_teilnehmer(teilnehmer)
            teilnahme.set_resultat(resultat)
            result.append(teilnahme)

        self._connection.commit()
        cursor.close()

        return result
        

    def find_by_student_id(self, student_id):
        """ Findet alle Teilnahmen für eine bestimmte user_id"""
        result = []
        cursor = self._connection.cursor()
        command = "SELECT id,lehrangebot, teilnehmer FROM teilnahmen WHERE teilnehmer={}".format(student_id) 
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, lehrangebot, teilnehmer) in tuples:
            teilnahme = Teilnahme()
            teilnahme.set_id(id)
            teilnahme.set_lehrangebot(lehrangebot)
            teilnahme.set_teilnehmer(teilnehmer)
            result.append(teilnahme)


        self._connection.commit()
        cursor.close()

        return result

    def find_projekt_id(self,id):

        result = []
        cursor = self._connection.cursor()
        command = "SELECT lehrangebot FROM teilnahmen WHERE id={}".format(id) 
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (lehrangebot) in tuples:
            teilnahme = Teilnahme()
            teilnahme.set_lehrangebot(lehrangebot)
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