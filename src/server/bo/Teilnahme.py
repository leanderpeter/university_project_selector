#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.bo.BusinessObject import BusinessObject


class Teilnahme(BusinessObject):
    def __init__(self):
        self._teilnehmer = None
        self._lehrangebot = None

    def get_lehrangebot(self):
        return self._lehrangebot

    def set_lehrangebot(self, lehrangebot):
        self._lehrangebot = lehrangebot

    def get_teilnehmer(self, ):
        return self._teilnehmer

    def set_teilnehmer(self, teilnehmer):
        self._teilnehmer = teilnehmer
