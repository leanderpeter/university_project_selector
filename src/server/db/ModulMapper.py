#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.db.Mapper import Mapper
from server.bo.Modul import Modul
import mysql.connector as connector



class ModulMapper(Mapper):
    """Mapper-Klasse, die Bewertung Objekte auf der relationealen Datenbank abbildet.
    Die Klasse ermöglicht die Umwandlung von Objekten in Datenbankstrukturen und umgekehrt
    """
    def __init__(self):
        super().__init__()

    def find_by_id(self, id):
        """Suchen eines Noduls mit vorgegebener ID

        :param id Primärschlüsselattribut aus der DB
        :return Modul-Objekt, das der übergebener id entspricht, 
                None wenn DB-Tupel nicht vorhanden ist
        """
        result = None

        cursor = self._connection.cursor()
        command = "SELECT id, name, edv_nr FROM module WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, edv_nr) = tuples[0]
            modul = Modul()
            modul.set_id(id)
            modul.set_name(name)
            modul.set_edv_nr(edv_nr)
            result = modul

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
			keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def find_by_projekt_id(self, projekt_id):
        """Suchen eines Moduls nach der Projekt ID 

        :param projekt_id
        :return Modul-Objekt, welche mit der projekt ID übereinstimmt
        """

        result = []
        
        cursor = self._connection.cursor()
        command = "SELECT projekte_hat_module.modul_id, module.name, module.edv_nr FROM projekte_hat_module INNER JOIN module ON projekte_hat_module.modul_id = module.id WHERE projekte_hat_module.projekt_id ='{}'".format(projekt_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (modul_id, name, edv_nr) in tuples:
            modul = Modul()
            modul.set_id(modul_id)
            modul.set_name(name)
            modul.set_edv_nr(edv_nr)
            result.append(modul)

        self._connection.commit()
        cursor.close()

        return result



    def find_all(self):
        """Auslesen aller Module aus der Datenbank

        :return Eine Sammlung aller Modul-Objekten
        """
        result = []

        cursor = self._connection.cursor()

        command = "SELECT id, name, edv_nr  FROM module"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, edv_nr) in tuples:
            modul = Modul()
            modul.set_id(id)
            modul.set_name(name)
            modul.set_edv_nr(edv_nr)
            result.append(modul)

        self._connection.commit()
        cursor.close()

        return result
    
    def projekte_hat_module(self, projekt_id, modul_id):
        """Einfügen von Modulen und Projekten durch Fremdschlüssel (projekt_id, modul_id)
        Diese geben an, welche Module für welche Projekte angerechnet werden können
        
        :param projekt_id, modul_id
        """
        cursor = self._connection.cursor()
        command = "INSERT INTO projekte_hat_module (projekt_id, modul_id) VALUES (%s,%s)"
        data = (projekt_id, modul_id)

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def insert(self, modul):
        """Einfügen eines Modul-Objekts

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft

        :param modul 
        :return das bereits übergebene Modul Objekt mit aktualisierten Daten (id)
        """
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM module")
        tuples = cursor.fetchall()


        for (maxid) in tuples:
            if maxid[0] is None:
                modul.set_id(1)
            else:
                modul.set_id(maxid[0]+1)

        command = "INSERT INTO module (id, name, edv_nr) VALUES (%s,%s,%s)"
        data = (
            modul.get_id(),
            modul.get_name(),
            modul.get_edv_nr(),
            )
        cursor.execute(command, data)
        self._connection.commit()
        cursor.close()

        return modul
        
    def update(self, modul):
        """Überschreiben / Aktualisieren eines Modul Objekts in der DB

        :param modul
        :return aktualisiertes Modul-Objekt
        """

        cursor = self._connection.cursor()

        command = "UPDATE module SET name=%s, edv_nr=%s WHERE id=%s"
        data = (modul.get_name(), modul.get_edv_nr(), modul.get_id())

        result = modul
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()
        
        return result        

    def delete(self, id):
        """Löschen der Daten eines Modul-Objekts aus der Datenbank 
        Zuerst aus teilnahmen, dann projekte_hat_module und anschließend module Tabelle 
        dies geschiet anhand der id
        Das Löschen mehrerer Tabellen findet statt, da Fremdschlüßelbeziehungen bestehen

        :param id
        """
        cursor = self._connection.cursor()
        command = "DELETE FROM module WHERE id={}".format(id)
        cursor.execute(command)
        self._connection.commit()
        cursor.close()


    def delete_by_id(self, projekt_id):
        """Löschen von Einträgen in projekte_hat_module nach projekt_id
        Hierdurch werden Modulwahloptionen für ein Projekt durch Fremdschlüsselbeziehungen entfernt

        :param projekt_id
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM projekte_hat_module WHERE projekt_id ='{}'".format(projekt_id)
        cursor.execute(command)
        
        self._connection.commit()
        cursor.close()


