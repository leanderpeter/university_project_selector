#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.db.Mapper import Mapper
from server.bo.Semester import Semester

class SemesterMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        """finde alle Semester in der Datenbank"""
        result = []

        cursor = self._connection.cursor()

        command = "SELECT id, name FROM semester"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name) in tuples:
            semester = Semester()
            semester.set_id(id)
            semester.set_name(name)
            result.append(semester)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        result = None
        
        cursor = self._connection.cursor()
        command = "SELECT id, name FROM semester WHERE id ='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name) = tuples[0]
            semester = Semester()
            semester.set_id(id)
            semester.set_name(name)
            result = semester

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
			keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def find_semester_of_student(self, id):
        """finde alle Semester eines Studenten, in welcher er eine Teilnahme hat in der Datenbank"""
        result = []

        cursor = self._connection.cursor()

        command = "SELECT semester.id, semester.name FROM teilnahmen INNER JOIN projekte on teilnahmen.lehrangebot = projekte.id \
                    INNER JOIN semester on projekte.halbjahr = semester.id WHERE teilnahmen.teilnehmer ='{}'".format(id)

        cursor.execute(command)
        tuples = cursor.fetchall()

        filtered_tuples = list(set(tuples)) #entfernt doppelte Semester

        for (id, name) in filtered_tuples:
            semester = Semester()
            semester.set_id(id)
            semester.set_name(name)
            result.append(semester)

        self._connection.commit()
        cursor.close()

        return result


    def insert(self, semester):
        '''
        Einfugen eines Semester BO's in die DB
        '''

        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM semester")
        tuples = cursor.fetchall()


        for (maxid) in tuples:
            if maxid[0] is None:
                semester.set_id(1)
            else:
                semester.set_id(maxid[0]+1)

        command = "INSERT INTO semester (id, name) VALUES (%s,%s)"
        data = (
            semester.get_id(),
            semester.get_name(),
            )
        cursor.execute(command, data)
        self._connection.commit()
        cursor.close()

        return semester
        
    def update(self, semester):

        cursor = self._connection.cursor()

        command = "UPDATE semester SET name=%s WHERE id=%s"
        data = (semester.get_name(), semester.get_id())

        result = semester
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()
        
        return result        

    def delete(self, id):
        """Delete an object from the DB"""
        cursor = self._connection.cursor()
        
        command = "DELETE FROM semester WHERE id={}".format(id)
        cursor.execute(command)
        
        self._connection.commit()
        cursor.close()