#!/usr/bin/python
#-*- coding: utf-8 -*-
import argparse

from .bo.Person import Person

from .db.PersonMapper import PersonMapper


class ProjektAdministration (object):
	def __init__(self):
		pass

	def create_user(self, name, email, google_user_id):
		'''creat person'''

		user = Person()
		user.set_name(name)
		user.set_email(email)
		user.set_google_user_id(google_user_id)
		user.set_id(1)

		with PersonMapper() as mapper:
			return mapper.insert(user)

	def get_user_by_name(self, ):
		pass

	def get_user_by_id(self, ):
		pass

	def get_user_by_email(self, ):
		pass

	def get_user_by_google_user_id(self, ):
		pass

	def get_all_users(self, ):
		pass

	def save_user(self, ):
		pass

	def delete_user(self, ):
		pass

	def create_projekt(self, ):
		pass

	def get_projekt_by_id(self, ):
		pass

	def get_alle_projekte(self, ):
		pass

	def get_projekt_teilnehmer(self, ):
		pass

	def get_projekte_by_projektart(self, ):
		pass

	def get_projekte_von_user(self, ):
		pass

	def delete_projekt(self, ):
		pass

	def save_projekt(self, ):
		pass

	def create_bewertung(self, ):
		pass

	def get_bewertung(self, ):
		pass

	def delete_bewertung(self, ):
		pass

	def create_teilnahme(self, ):
		pass

	def get_teilnahme(self, ):
		pass

	def delete_teilnahme(self, ):
		pass

