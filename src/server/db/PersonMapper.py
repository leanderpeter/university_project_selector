#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.db.Mapper import Mapper
from server.bo.Person import Person


class PersonMapper(Mapper):
    """Mapper-Klasse, die Person Objekte auf der relationealen Datenbank abbildet.
    Die Klasse ermöglicht die Umwandlung von Objekten in Datenbankstrukturen und umgekehrt
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Personen aus der Datenbank

        :return Alle Person-Objekte im System
        """
        result = []

        cursor = self._connection.cursor()

        command = "SELECT id, name, email, google_user_id, rolle FROM personen"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, email, google_user_id, rolle) in tuples:
            person = Person()
            person.set_id(id)
            person.set_name(name)
            person.set_email(email)
            person.set_google_user_id(google_user_id)
            if rolle == "Dozent":
                person.set_rolle(Person.ROLLE_DOZENT)
            elif rolle == "Admin":
                person.set_rolle(Person.ROLLE_ADMIN)

            result.append(person)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_name(self):
        pass

    def find_by_id(self, id):
        """Suchen einer Person nach der übergebenen ID. 

        :param id Primärschlüsselattribut einer Person aus der Datenbank
        :return Person-Objekt, welche mit der ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None
        cursor = self._connection.cursor()
        command = "SELECT id, name, email, google_user_id, rolle FROM personen WHERE id='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, email, google_user_id, rolle) = tuples[0]
            person = Person()
            person.set_id(id)
            person.set_name(name)
            person.set_email(email)
            person.set_google_user_id(google_user_id)
            if rolle == "Dozent":
                person.set_rolle(Person.ROLLE_DOZENT)
            elif rolle == "Admin":
                person.set_rolle(Person.ROLLE_ADMIN) 
            result = person

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
			keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def find_by_google_user_id(self, google_user_id):
        """Suchen einer Person nach der übergebenen Google User ID. 

        :param google_user_id Google User ID einer Person aus der Datenbank
        :return Person-Objekt, welche mit der Google User ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None

        cursor = self._connection.cursor()
        command = "SELECT id, name, email, google_user_id, rolle FROM personen WHERE google_user_id='{}'".format(
                google_user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, email, google_user_id, rolle) = tuples[0]
            person = Person()
            person.set_id(id)
            person.set_name(name)
            person.set_email(email)
            person.set_google_user_id(google_user_id)
            if rolle == "Dozent":
                person.set_rolle(Person.ROLLE_DOZENT)
            elif rolle == "Admin":
                person.set_rolle(Person.ROLLE_ADMIN) 
            result = person
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None
        return result

    def insert(self, person):
        """Einfügen eines Person Objekts in die DB

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft 

        :param person das zu speichernde Person Objekt
        :return das bereits übergebene Person Objekt mit aktualisierten Daten (id)
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

        command = "INSERT INTO personen (id, name, email, google_user_id, rolle) VALUES (%s,%s,%s,%s,%s)"
        data = (person.get_id(), person.get_name(), person.get_email(), person.get_google_user_id(), str(person.get_rolle()))
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return person

    def update(self, person):
        """Überschreiben / Aktualisieren eines Person-Objekts in der DB

        :param person -> Person-Objekt
        :return aktualisiertes Person-Objekt
        """
        cursor = self._connection.cursor()

        command = "UPDATE personen " + "SET name=%s, email=%s, rolle=%s WHERE google_user_id=%s"
        data = (person.get_name(), person.get_email(), str(person.get_rolle()), person.get_google_user_id())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def update_by_id(self, person):
        """Überschreiben / Aktualisieren eines Person-Objekts in der DB

        :param person -> Person-Objekt
        :return aktualisiertes Person-Objekt
        """
        cursor = self._connection.cursor()

        command = "UPDATE personen " + "SET name=%s, email=%s, rolle=%s WHERE id=%s"
        data = (person.get_name(), person.get_email(), str(person.get_rolle()), person.get_id())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, person):
        """Löschen der Daten einer Person aus der Datenbank

        :param person -> Person-Objekt
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM personen WHERE id={}".format(person.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def find_by_rolle(self, rolle):
        '''Finde alle Personen mit gegebener Rolle
        :param rolle -> Rolle-String
        '''
        cursor = self._connection.cursor()
        command = "SELECT id, name, email, google_user_id, rolle FROM personen WHERE rolle={}".format(str(rolle))
        cursor.execute(command)

        self._connection.commit()
        cursor.close()


'''Only for testing purpose'''

if (__name__ == "__main__"):
    with PersonMapper() as mapper:
        result = mapper.find_all()
        for person in result:
            print(person)
