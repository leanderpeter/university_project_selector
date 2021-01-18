#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.db.Mapper import Mapper
from server.bo.Bewertung import Bewertung


class BewertungMapper(Mapper):
    """Mapper-Klasse, die Bewertung Objekte auf der relationealen Datenbank abbildet.
    Die Klasse ermöglicht die Umwandlung von Objekten in Datenbankstrukturen und umgekehrt
    """
    def __init__(self):
        super().__init__()

    def find_by_id(self, id):
        """Suchen einer Bewertung der übergebenen ID. 

        :param id Primärschlüsselattribut aus der Datenbank
        :return Bewertung-Objekt, welche mit der ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None

        cursor = self._connection.cursor()
        command = "SELECT id, note FROM bewertungen WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, note) = tuples[0]
            bewertung = Bewertung()
            bewertung.set_id(id)
            bewertung.set_note(note)
            result = bewertung

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
			keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def find_all(self):
        """Auslesen aller Bewertungen aus der Datenbank

        :return Alle Bewertung-Objekte im System
        """
        result = []

        cursor = self._connection.cursor()
        
        cursor.execute("SELECT * from bewertungen")
        tuples = cursor.fetchall()
        print(tuples)

        for (id,note) in tuples:
            bewertung = Bewertung()
            bewertung.set_id(id)
            bewertung.set_note(note)
            result.append(bewertung)
        
    

        self._connection.commit()
        cursor.close()
        return result


    def insert(self):
        """Add the given object to the database"""
        pass

    def update(self):
        """Update an already given object in the DB"""
        pass

    def delete(self):
        """Delete an object from the DB"""
        pass


