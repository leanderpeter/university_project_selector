#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.bo.Projekt import Projekt
from server.db.Mapper import Mapper

'''
-------------------------------------------------------------------------------------------------------------------------------
Alle funktionen in dieser Klasse muessen neu geschrieben werden. Sie sind lediglich aufgrund zum testen hier.

Diese klasse ist komplett kopiert von ProjektMapper!!
-------------------------------------------------------------------------------------------------------------------------------
'''

class ProjektWartelisteMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._connection.cursor()
        cursor.execute(
            "SELECT id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent, anzahlTeilnehmer, teilnehmerListe from projekte_ausstehend")
        tuples = cursor.fetchall()

        for (id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor,
             anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent, anzahlTeilnehmer, teilnehmerListe) in tuples:
            projekt = self.create_projekt(id, name, max_teilnehmer, beschreibung, betreuer, externer_partner,
                                          woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum,
                                          raum, sprache, dozent, anzahlTeilnehmer, teilnehmerListe)
            result.append(projekt)

        self._connection.commit()
        cursor.close()

        return result

    def find_projekt_by_id(self, id):
        pass

    def create_projekt(self, id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich,
                       anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent, anzahlTeilnehmer, teilnehmerListe):
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
        return projekt

    def find_by_id(self):
        pass

    def insert(self, projekt):
        '''
        Einfugen eines Projekts BO's in die DB
        '''

        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM projekte_ausstehend")
        tuples = cursor.fetchall()


        for (maxid) in tuples:
            if maxid[0] is None:
                projekt.set_id(1)
            else:
                projekt.set_id(maxid[0]+1)

        command = "INSERT INTO projekte_ausstehend (id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent, anzahlTeilnehmer, teilnehmerListe) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        data = (
            projekt.get_id(),
            projekt.get_name(),
            projekt.get_max_teilnehmer(),
            projekt.get_projektbeschreibung(),
            projekt.get_betreuer(),
            projekt.get_externer_partner(),
            projekt.get_woechentlich(),
            projekt.get_anzahl_block_vor(),
            projekt.get_anzahl_block_in(),
            projekt.get_praeferierte_block(),
            projekt.get_bes_raum(),
            projekt.get_raum(),
            projekt.get_sprache(),
            projekt.get_dozent(),
            projekt.get_anzahlTeilnehmer(),
            projekt.get_teilnehmerListe()
            )
        print(projekt)
        cursor.execute(command, data)
        self._connection.commit()
        cursor.close()

        return projekt

    def update(self):
        pass

    def delete(self):
        pass

    def count_teilnehmer_by_projekt(self, projektID):
        pass
    def get_teilnehmerId_by_projekt(self, projektID):
        pass

if (__name__ == "__main__"):
    with ProjektWartelisteMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)
