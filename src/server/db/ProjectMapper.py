#!/usr/bin/python
#-*- coding: utf-8 -*-

from server.bo.Project import Projekt
from server.db.Mapper import Mapper

class ProjektMapper(Mapper):
	def __init__(self):
		super().__init__()

	def find_all(self):
		'''
		return all project obj from DB
		'''

		results = []
		cursor = self._connection.cursor()
		cursor.execute("SELECT * from projects")
		tuples = cursor.fetchall()

		for (id, name, description, instructor, date, max_subscriber) in tuples:
			project = Projekt()
			project.set_id(id)
			project.set_name(name)
			project.set_projektbeschreibung(description)
			project.set_betreuer(instructor)
			project.set_start_date(date)
			project.set_max_teilnehmer(max_subscriber)
			results.append(project)
		self._connection.commit()
		cursor.close()

		return results

	def find_by_key():
		pass
	def insert():
		pass
	def update():
		pass
	def delete():
		pass

if (__name__ == "__main__"):
	with ProjectMapper() as mapper:
		result = mapper.find_all()
		for p in result:
			print(p)
