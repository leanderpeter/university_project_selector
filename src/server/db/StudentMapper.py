#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.db.Mapper import Mapper
from server.bo.Student import Student


class StudentMapper(Mapper):
    """Mapper-Klasse, die Student Objekte auf der relationealen Datenbank abbildet.
    Die Klasse ermöglicht die Umwandlung von Objekten in Datenbankstrukturen und umgekehrt
    """
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Studenten aus der Datenbank

        :return Alle Studenten-Objekte im System
        """

        result = []

        cursor = self._connection.cursor()
        
        cursor.execute("SELECT * from studenten")
        tuples = cursor.fetchall()
        

        for (id, name, email, google_user_id,  rolle, mat_nr, kuerzel) in tuples:
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_email(email)
            student.set_google_user_id(google_user_id)
            student.set_rolle(rolle)
            student.set_mat_nr(mat_nr)
            student.set_kuerzel(kuerzel)
            result.append(student)
       
        self._connection.commit()
        cursor.close()
        return result


    def find_by_name(self):
        pass

    def find_by_email(self):
        pass

    def find_by_google_user_id(self, google_user_id):
        """Suchen eines Studenten nach der übergebenen Google User ID. 

        :param google_user_id Google User ID eines Studenten aus der Datenbank
        :return Student-Objekt, welche mit der Google User ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None

        cursor = self._connection.cursor()
        command = "SELECT id, name, email, google_user_id, mat_nr, kuerzel FROM studenten WHERE google_user_id='{}'".format(google_user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, email, google_user_id, mat_nr, kuerzel) = tuples[0]
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_email(email)
            student.set_google_user_id(google_user_id)
            student.set_mat_nr(mat_nr)
            student.set_kuerzel(kuerzel)
            result = student
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """Suchen eines Studenten nach der übergebenen ID. 

        :param id Primärschlüsselattribut eines Studenten aus der Datenbank
        :return Student-Objekt, welche mit der ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None

        cursor = self._connection.cursor()
        command = "SELECT id, name, email, google_user_id, mat_nr, kuerzel FROM studenten WHERE id='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, email, google_user_id, mat_nr, kuerzel) = tuples[0]
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_email(email)
            student.set_google_user_id(google_user_id)
            student.set_mat_nr(mat_nr)
            student.set_kuerzel(kuerzel)
            result = student
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, student):
        """Einfügen eines Studenten Objekts in die DB

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft 

        :param studeten das zu speichernde Student Objekt
        :return das bereits übergebene Student-Objekt mit aktualisierten Daten (id)
        """
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM studenten ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem User-Objekt zu."""
                student.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                student.set_id(1)

        command = "INSERT INTO studenten (id, name, email, google_user_id, rolle, kuerzel, mat_nr) VALUES (%s,%s,%s,%s,%s,%s,%s)"
        data = (student.get_id(), student.get_name(), student.get_email(), student.get_google_user_id(), str(student.get_rolle()), student.get_kuerzel(), student.get_mat_nr())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return student

    def update(self, student):
        """Überschreiben / Aktualisieren eines Student-Objekts in der DB

        :param student -> Student-Objekt
        :return aktualisiertes Student-Objekt
        """
        cursor = self._connection.cursor()

        command = "UPDATE studenten " + "SET name=%s, email=%s, rolle=%s, kuerzel=%s, mat_nr=%s WHERE google_user_id=%s"
        data = (student.get_name(), student.get_email(), str(student.get_rolle()),student.get_kuerzel(), student.get_mat_nr(), student.get_google_user_id())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def updateByUserId(self, student):
         """Überschreiben / Aktualisieren eines Student-Objekts in der DB

        :param student -> Student-Objekt
        :return aktualisiertes Student-Objekt
        """

        cursor = self._connection.cursor()

        command = "UPDATE studenten " + "SET name=%s, email=%s, rolle=%s, kuerzel=%s, mat_nr=%s WHERE id=%s"
        data = (student.get_name(), student.get_email(), str(student.get_rolle()), student.get_kuerzel(), student.get_mat_nr(), student.get_id())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, student):
        """Löschen der Daten eines Studenten aus der Datenbank

        :param student -> Student-Objekt
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM studenten WHERE id={}".format(student.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def deleteByID(self, userID):
        """Löschen der Daten eines Studenten aus der Datenbank

        :param student -> Student-Objekt
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM studenten WHERE id={}".format(userID)
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

'''Only for testing purpose'''

if (__name__ == "__main__"):
    with StudentMapper() as mapper:
        result = mapper.find_all()
        for student in result:
            print(student)
