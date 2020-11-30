#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.db.Mapper import Mapper
from server.bo.Person import Person

class PersonMapper (Mapper):
	'''bidriectional functions for manipulating db-structures or objects'''

	def __init__(self):
		super().__init__()

	def find_all(self):
		'''
		reading of all user objects in the system (DB)
		return: Person objects
		'''

		result = None

		cursor = self._connection.cursor()
		command = "SELECT id, name, email, google_user_id  FROM personen"
		cursor.execute(command)
		tuples = cursor.fetchall()

		try:
			(id, name, email, google_user_id) = tuples[0]
			person = Person()
			person.set_id(id)
			person.set_name(name)
			person.set_email(email)
			person.set_google_user_id(google_user_id)
			result = person

		except IndexError:
			"""empty sequence"""
			result = None

		self._connection.commit()
		cursor.close()

		return result

	def find_by_name(self):
		pass

	def find_by_key(self):
		pass

	def find_by_email(self):
		pass

	def find_by_google_user_id(self, google_user_id):
		result = None

		cursor = self._connection.cursor()
		command = "SELECT id, name FROM personen WHERE google_user_id='{}'".format(google_user_id)
		cursor.execute(command)
		tuples = cursor.fetchall()

		try:
			(id, name) = tuples[0]
			person = Person()
			person.set_id(id)
			person.set_name(name)
			result = person
		except IndexError:
			"""Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
			keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
			result = None

		self._connection.commit()
		cursor.close()

		return result

	def insert(self, person):
			"""Insert a user object in the DB

			Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
			berichtigt.

			:param user das zu speichernde Objekt
			:return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
			"""
			cursor = self._connection.cursor()
			cursor.execute("SELECT MAX(id) AS maxid FROM personen ")
			tuples = cursor.fetchall()

			for (maxid) in tuples:
				if maxid[0] is not None:
					"""Wenn wir eine maximale ID festellen konnten, zählen wir diese
					um 1 hoch und weisen diesen Wert als ID dem User-Objekt zu."""
					person.set_id(maxid[0] + 1)
				else:
					"""Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
					davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
					person.set_id(1)

			command = "INSERT INTO personen (id, name, email, google_user_id) VALUES (%s,%s,%s,%s)"
			data = (person.get_id(), person.get_name(), person.get_email(), person.get_google_user_id())
			cursor.execute(command, data)

			self._connection.commit()
			cursor.close()

			return person

	def update(self, person):
		'''
		function to rewrite in the DB 

		'''
		cursor = self._connection.cursor()
		command = "UPDATE personen " + "SET name=%s, email=%s, rolle=%s WHERE google_user_id=%s"
		data = (person.get_name(),person.get_email(), person.get_rolle(), person.get_google_user_id())
		cursor.execute(command, data)

		self._connection.commit()
		cursor.close()

	def delete(self, person):
		'''
		delete an object from the database
		'''
		cursor = self._connection.cursor()

		command = "DELETE FROM personen WHERE id={}".format(person.get_id())
		cursor.execute(command)

		self._connection.commit()
		cursor.close()


'''Only for testing purpose'''

if (__name__ == "__main__"):
	with PersonMapper() as mapper:
		result = mapper.find_all()
		for person in result:
			print(person)
