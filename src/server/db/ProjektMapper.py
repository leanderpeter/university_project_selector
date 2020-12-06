#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.bo.Projekt import Projekt
from server.db.Mapper import Mapper


class ProjektMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._connection.cursor()
        cursor.execute(
            "SELECT id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent from projekte")
        tuples = cursor.fetchall()

        for (id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor,
             anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent, module) in tuples:
            projekt = self.create_projekt(id, name, max_teilnehmer, beschreibung, betreuer, externer_partner,
                                          woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum,
                                          raum, sprache, dozent, module)
            result.append(projekt)

        self._connection.commit()
        cursor.close()

        return result

    def find_projekt_by_id(self, id):
        result = None

        cursor = self._connection.cursor()

        command1 = ("SELECT id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent FROM projekte WHERE id={}").format(id)
        cursor.execute(command1)
        tuples1 = cursor.fetchall()

        command2 = ("SELECT modul_id FROM projekte_hat_module WHERE projekt_id={}").format(id)
        cursor.execute(command2)
        tuples2 = cursor.fetchall()

        try:
            (id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent) = tuples1[0]
            module = tuples2
            result = self.create_projekt(id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent, module)
        
        except IndexError:
            result = None


        self._connection.commit()
        cursor.close()

        return result

    def create_projekt(self, id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich,
                       anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent, module):
        projekt = Projekt()
        projekt.set_id(id)
        projekt.set_name(name)
        projekt.set_max_teilnehmer(max_teilnehmer)
        projekt.set_projektbeschreibung(beschreibung)
        projekt.set_betreuer(betreuer)
        projekt.set_externer_partner(externer_partner)
        projekt.set_woechentlich(woechentlich)
        projekt.set_anzahl_block_vor(anzahl_block_vor)
        projekt.set_anzahl_block_in(anzahl_block_in)
        projekt.set_praeferierte_block(praeferierte_block)
        projekt.set_bes_raum(bes_raum)
        projekt.set_raum(raum)
        projekt.set_sprache(sprache)
        projekt.set_dozent(dozent)
        projekt.set_anzahlTeilnehmer(self.count_teilnehmer_by_projekt(id))
        projekt.set_teilnehmerListe(self.get_teilnehmerId_by_projekt(id))

        modulliste = []
        for modultuple in module:
            for modul in modultuple:
                modulliste.append(modul)
        
        projekt.set_moduloption(modulliste)

        return projekt

    def find_by_key(self):
        pass

    def insert(self):
        pass

    def update(self):
        pass

    def delete(self):
        pass

    def count_teilnehmer_by_projekt(self, projektID):
        cursor = self._connection.cursor()
        command = "SELECT COUNT(*) FROM teilnahmen WHERE lehrangebot={}".format(projektID)
        cursor.execute(command)
        countRow = cursor.fetchone()
        self._connection.commit()
        cursor.close()
        return countRow[0]
        #MUSS IN TEILNAHMEMAPPER

    def get_teilnehmerId_by_projekt(self, projektID):
        result = []
        cursor = self._connection.cursor()
        command = "SELECT teilnehmer FROM teilnahmen WHERE lehrangebot={}".format(projektID)
        cursor.execute(command)
        rows = cursor.fetchall()
        for teilnehmer in rows:
            result.append(teilnehmer[0])
        self._connection.commit()
        cursor.close()
        return result
        #MUSS IN TEILNAHMEMAPPER


if (__name__ == "__main__"):
    with ProjektMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)
