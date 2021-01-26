#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.db.Mapper import Mapper
from server.bo.Projektart import Projektart


class ProjektartMapper(Mapper):
	"""Mapper-Klasse, die Bewertung Objekte auf der relationealen Datenbank abbildet.
    Die Klasse ermöglicht die Umwandlung von Objekten in Datenbankstrukturen und umgekehrt
    """

	def __init__(self):
		super().__init__()

	def find_all(self):
		"""
		 Auslesen aller Projektarten aus der Datenbank

        :return Eine Sammlung aller Projektart-Objekten
        """
		results = []
		cursor = self._connection.cursor()
		cursor.execute(
			"SELECT id, name, ects, sws from projektarten"
			)
		tuples = cursor.fetchall()
		for (id, name, ects, sws) in tuples:
			projektart = self.create_projektart(id, name, ects, sws)
			results.append(projektart)
		self._connection.commit()
		cursor.close()

		return results

	def create_projektart(self, id, name, ects, sws):
		"""Einfügen eines Projektart-Objekts in die DB

        :param id, name, ects, sws 
        :return das bereits übergebene Semester-Objekt mit aktualisierten Daten
        """

		projektart = Projektart()
		projektart.set_id(id)
		projektart.set_name(name)
		projektart.set_ects(ects)
		projektart.set_sws(sws)

		return projektart

	def find_projektart_by_id(self, id):
		"""Suchen einer Projektart nach der übergebenen ID. 

        :param id Primärschlüsselattribut aus der Datenbank
        :return Projektart-Objekt, welche mit der ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """

		result = None

		cursor = self._connection.cursor()
		command = ("SELECT id, name, ects, sws from projektarten where id={}".format(id))
		cursor.execute(command)
		tuples = cursor.fetchall()

		try:
			(id, name, ects, sws) = tuples[0]
			projektart = Projektart()
			projektart.set_id(id)
			projektart.set_name(name)
			projektart.set_ects(ects)
			projektart.set_sws(sws)
			result = projektart
		except IndexError:
			result = None

		self._connection.commit()
		cursor.close()

		return result

	def insert(self, projektart):
		'''
		Einfugen eines Projektart BO's in die DB

		:param projektart 
        :return das bereits übergebene Projektart-Objekt mit aktualisierten Daten
		'''

		cursor = self._connection.cursor()
		cursor.execute("SELECT MAX(id) AS maxid FROM projektarten")
		tuples = cursor.fetchall()


		for (maxid) in tuples:
			if maxid[0] is None:
				projektart.set_id(1)
			else:
				projektart.set_id(maxid[0]+1)

		command = "INSERT INTO projektarten (id, name, ects, sws) VALUES (%s,%s,%s,%s)"
		data = (
			projektart.get_id(),
			projektart.get_name(),
			projektart.get_ects(),
			projektart.get_sws()
			)
		cursor.execute(command, data)
		self._connection.commit()
		cursor.close()

		return projektart

	def delete(self, id):
		"""Löschen der Daten eines Projektart-Objekts aus der Datenbank 
    
        :param id
        """
		cursor = self._connection.cursor()
		
		command = "DELETE FROM projektarten WHERE id={}".format(id)
		cursor.execute(command)

		self._connection.commit()
		cursor.close()


	def update(self, projektart):
		"""Überschreiben / Aktualisieren eines Projektart-Objekts in der DB

        :param projektart
        :return aktualisiertes Projektart-Objekt
        """

		cursor = self._connection.cursor()

		command = "UPDATE projektarten SET name=%s, ects=%s, sws=%s WHERE id=%s"
		data = (projektart.get_name(), projektart.get_ects(), projektart.get_sws(), projektart.get_id())

		result = projektart
		cursor.execute(command, data)

		self._connection.commit()
		cursor.close()
		
		return result

	def find_by_id(self):
		pass