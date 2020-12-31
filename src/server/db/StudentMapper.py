#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.db.Mapper import Mapper
from server.bo.Student import Student


class StudentMapper(Mapper):
    '''bidriectional functions for manipulating db-structures or objects'''

    def __init__(self):
        super().__init__()

    def find_all(self):
        '''
        reading of all user objects in the system (DB)
        return: Student objects
        '''

        result = []

        cursor = self._connection.cursor()

        command = "SELECT id, name, email, google_user_id, rolle, mat_nr, kuerzel FROM studenten"

        cursor.execute(command)
        tuples = cursor.fetchall()

    #Falsch: muss for schleife
        try:
            (id, name, email, google_user_id,  rolle, mat_nr, kuerzel) = tuples[0]
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_email(email)
            student.set_google_user_id(google_user_id)
            student.set_rolle(rolle)
            student.set_mat_nr(mat_nr)
            student.set_kuerzel(kuerzel)
            result.append(student)

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
        command = "SELECT id, name, email, google_user_id, rolle, mat_nr, kuerzel FROM studenten WHERE google_user_id='{}'".format(
            google_user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, email, google_user_id, rolle, mat_nr, kuerzel) = tuples[0]
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_email(email)
            student.set_google_user_id(google_user_id)
            student.set_rolle(rolle)
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
        result = None

        cursor = self._connection.cursor()
        command = "SELECT id, name, email, google_user_id, rolle, mat_nr, kuerzel FROM studenten WHERE id='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, email, google_user_id, rolle, mat_nr, kuerzel) = tuples[0]
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_email(email)
            student.set_google_user_id(google_user_id)
            student.set_rolle(rolle)
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
        result = None

        cursor = self._connection.cursor()
        command = "SELECT id, name, email, google_user_id, rolle, mat_nr, kuerzel FROM studenten WHERE id='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, email, google_user_id, rolle, mat_nr, kuerzel) = tuples[0]
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_email(email)
            student.set_google_user_id(google_user_id)
            student.set_rolle(rolle)
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
        """Insert a user object in the DB

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param user das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
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

        command = "INSERT INTO studenten (id, name, email, google_user_id) VALUES (%s,%s,%s,%s)"
        data = (student.get_id(), student.get_name(), student.get_email(), student.get_google_user_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return student

    def update(self, student):
        '''
        function to rewrite in the DB 

        '''
        cursor = self._connection.cursor()

        command = "UPDATE studenten " + "SET name=%s, email=%s, rolle=%s WHERE google_user_id=%s"
        data = (student.get_name(), student.get_email(), student.get_rolle(), student.get_google_user_id())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, student):
        '''
        delete an object from the database
        '''
        cursor = self._connection.cursor()

        command = "DELETE FROM studenten WHERE id={}".format(student.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()


'''Only for testing purpose'''

if (__name__ == "__main__"):
    with StudentMapper() as mapper:
        result = mapper.find_all()
        for student in result:
            print(student)
