#!/usr/bin/python
# -*- coding: utf-8 -*-

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
        command = "SELECT id, lehrangebot, teilnehmer, anrechnung, resultat FROM teilnahmen WHERE teilnehmer={}".format(student_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, lehrangebot, teilnehmer, anrechnung, resultat) in tuples:
            teilnahme = Teilnahme()
            teilnahme.set_id(id)
            teilnahme.set_lehrangebot(lehrangebot)
            teilnahme.set_teilnehmer(teilnehmer)
            teilnahme.set_anrechnung(anrechnung)
            teilnahme.set_resultat(resultat)
            result.append(teilnahme)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_projekt_id(self, projekt_id):
        """ Findet alle Teilnahmen von einer ProjektID"""
        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, lehrangebot, teilnehmer, anrechnung, resultat FROM teilnahmen WHERE lehrangebot={}".format(projekt_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, lehrangebot, teilnehmer, anrechnung, resultat) in tuples:
            teilnahme = Teilnahme()
            teilnahme.set_id(id)
            teilnahme.set_lehrangebot(lehrangebot)
            teilnahme.set_teilnehmer(teilnehmer)
            teilnahme.set_anrechnung(anrechnung)
            teilnahme.set_resultat(resultat)
            result.append(teilnahme)

        self._connection.commit()
        cursor.close()

        return result

    def find_projekt_id(self, id):
        """ Findet alle Teilnahmen von einer Projekt ID"""
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

    def find_by_id(self):
        """Reads a tuple with a given ID"""
        pass


    def insert(self, teilnahme):
        '''
		Einfugen eines Teilnahme BO's in die DB

		:param teilnahme 
        :return das bereits übergebene Teilnahme-Objekt mit aktualisierten Daten
		'''
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM teilnahmen ")
        tuples = cursor.fetchall()
        """TODO User autoincrement"""
        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem User-Objekt zu."""
                teilnahme.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                teilnahme.set_id(1)

        command = "INSERT INTO teilnahmen (id, lehrangebot, teilnehmer) VALUES (%s,%s,%s)"

        data = (teilnahme.get_id(), teilnahme.get_lehrangebot(), teilnahme.get_teilnehmer())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return teilnahme

    def update(self, teilnahme):
        """Überschreiben / Aktualisieren eines Teilnahme-Objekts in der DB

        :param teilnahme
        :return aktualisiertes Teilnahme-Objekt
        """

        cursor = self._connection.cursor()

        command = "UPDATE teilnahmen SET lehrangebot=%s, teilnehmer=%s, anrechnung=%s, resultat=%s WHERE id=%s"
        data = (teilnahme.get_lehrangebot(), teilnahme.get_teilnehmer(), teilnahme.get_anrechnung(), teilnahme.get_resultat(), teilnahme.get_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, lehrangebotId, teilnehmerId):
        """Delete an object from the DB"""
        
        cursor = self._connection.cursor()

        command = "DELETE FROM teilnahmen WHERE lehrangebot=%s AND teilnehmer=%s"
        data = (lehrangebotId, teilnehmerId)
        cursor.execute(command, data)
        self._connection.commit()
        cursor.close()


    def find_by_modul_und_semester(self, modul_id, semester_id):
        """Suchen einer Teilnahme nach der übergebenen Modul ID und Semester ID. 

        :param modul_id und semester_id 
        :return Teilnahme-Objekt, welche mit der Modul ID und Semester ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = []

        cursor = self._connection.cursor()

        command = "SELECT teilnahmen.id, teilnahmen.lehrangebot, teilnahmen.teilnehmer, teilnahmen.anrechnung, teilnahmen.resultat FROM teilnahmen INNER JOIN projekte ON teilnahmen.lehrangebot = projekte.id WHERE teilnahmen.anrechnung = %s AND projekte.halbjahr = %s"
        data = (modul_id, semester_id)
        cursor.execute(command, data)
        tuples = cursor.fetchall()

        for (id, lehrangebot, teilnehmer, anrechnung, resultat) in tuples:
            teilnahme = Teilnahme()
            teilnahme.set_id(id)
            teilnahme.set_lehrangebot(lehrangebot)
            teilnahme.set_teilnehmer(teilnehmer)
            teilnahme.set_anrechnung(anrechnung)
            teilnahme.set_resultat(resultat)
            result.append(teilnahme)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_semester(self, student_id, semester_id):
        """finde alle Teilnahmen eines Studenten in einem bestimmten Semester in der Datenbank"""
        result = []

        cursor = self._connection.cursor()

        command = "SELECT teilnahmen.id, teilnahmen.lehrangebot, teilnahmen.teilnehmer, teilnahmen.anrechnung, teilnahmen.resultat \
                    FROM teilnahmen INNER JOIN projekte on teilnahmen.lehrangebot = projekte.id \
                    WHERE teilnahmen.teilnehmer =%s AND projekte.halbjahr =%s" 
        
        data = (student_id, semester_id)

        cursor.execute(command, data)
        tuples = cursor.fetchall()

        for (id, lehrangebot, teilnehmer, anrechnung, resultat) in tuples:
            teilnahme = Teilnahme()
            teilnahme.set_id(id)
            teilnahme.set_lehrangebot(lehrangebot)
            teilnahme.set_teilnehmer(teilnehmer)
            teilnahme.set_anrechnung(anrechnung)
            teilnahme.set_resultat(resultat)
            result.append(teilnahme)

        self._connection.commit()
        cursor.close()

        return result

'''Nur zum testen'''

if (__name__ == "__main__"):
    with TeilnahmeMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)
