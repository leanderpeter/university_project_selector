#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.bo.Projekt import Projekt
from server.db.Mapper import Mapper

class ProjektMapper(Mapper):

	def __init__(self):
		super().__init__()

	def find_all(self):

		results = []
		cursor = self._connection.cursor()
		cursor.execute("SELECT * from projekte")
		tuples = cursor.fetchall()

		for (id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, moduloption, dozent, teilnahmen, halbjahr, art, aktueller_zustand ) in tuples:
			projekt = Projekt()
			projekt.set_id(id)
			projekt.set_max_teilnehmer(max_teilnehmer)
			projekt.set_name(name)
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
			projekt.set_moduloption(moduloption)
			projekt.set_dozent(dozent)
			projekt.set_belegung(teilnahmen)
			projekt.set_halbjahr(halbjahr)
			projekt.set_art(art)
			""" projekt.set_aktueller_zustand(aktueller_zustand) """
		
			
		self._connection.commit()
		cursor.close()

		return results

if (__name__ == "__main__"):
    with ProjektMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)
