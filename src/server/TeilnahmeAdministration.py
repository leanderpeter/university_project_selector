#!/usr/bin/python
#-*- coding: utf-8 -*-
import argparse

from .bo.Teilnahme import Teilnahme
from .db.TeilnahmeMapper import TeilnahmeMapper

class TeilnahmeAdministration (object):
	def __init__(self):
		pass


	def create_teilnahme(self, lehrangebotId, teilnehmerId):
		'''creat person'''

		teilnahme = Teilnahme()
		teilnahme.set_teilnehmer(teilnehmerId)
		teilnahme.set_lehrangebot(lehrangebotId)

		with TeilnahmeMapper() as mapper:
			return mapper.insert(teilnahme)
