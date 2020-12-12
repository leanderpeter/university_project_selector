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