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
		command = "SELECT id, name, email, google_user_id FROM users WHERE email={}".format(mail_address)
		cursor.execute(command)
		tuples = cursor.fetchall()

		try:
			(id, name, email, google_user_id) = tuples[0]
			user = Person()
			user.set_id(id)
			user.set_name(name)
			user.set_email(email)
			user.set_google_user_id(google_user_id)
			result = user

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

	def find_by_google_user_id(self, ):
		pass

	def insert(self, user):
			"""Insert a user object in the DB

			Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
			berichtigt.

			:param user das zu speichernde Objekt
			:return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
			"""
			cursor = self._connection.cursor()
			cursor.execute("SELECT MAX(id) AS maxid FROM users ")
			tuples = cursor.fetchall()

			for (maxid) in tuples:
				if maxid[0] is not None:
					"""Wenn wir eine maximale ID festellen konnten, zählen wir diese
					um 1 hoch und weisen diesen Wert als ID dem User-Objekt zu."""
					user.set_id(maxid[0] + 1)
				else:
					"""Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
					davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
					user.set_id(1)

			command = "INSERT INTO users (id, name, email, google_user_id) VALUES (%s,%s,%s,%s)"
			data = (user.get_id(), user.get_name(), user.get_email(), user.get_google_user_id())
			cursor.execute(command, data)

			self._connection.commit()
			cursor.close()

			return user

	def update(self, user):
		'''
		function to rewrite in the DB 

		'''
		cursor = self._connection.cursor()

		command = "UPDATE users " + "SET name=%s, email=%s WHERE google_user_id=%s"
		data = (user.get_name(), user.get_email(), user.get_user_id())
		cursor.execute(command, data)

		self._connection.commit()
		cursor.close()

	def delete(self, user):
		'''
		delete an object from the database
		'''
		cursor = self._connection.cursor()

		command = "DELETE FROM users WHERE id={}".format(user.get_id())
		cursor.execute(command)

		self._connection.commit()
		cursor.close()


'''Only for testing purpose'''

if (__name__ == "__main__"):
	with PersonMapper() as mapper:
		result = mapper.find_all()
		for user in result:
			print(user)
