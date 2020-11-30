#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.bo.Projekt import Projekt
from server.db.Mapper import Mapper

class ProjektMapper(Mapper):

	def __init__(self):
		super().__init__()

	def find_all(self):

		result = []
		cursor = self._connection.cursor()
		cursor.execute("SELECT id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum, raum, sprache from projekte")
		tuples = cursor.fetchall()

		for (id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum, raum, sprache) in tuples:
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
			result.append(projekt)
			
		self._connection.commit()
		cursor.close()

		return result

	def find_by_key(self):
		pass
	
	def insert(self):
		pass
	
	def update(self):
		pass
	
	def delete(self):
		pass

if (__name__ == "__main__"):
    with ProjektMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)
