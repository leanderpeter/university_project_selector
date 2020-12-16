#!/usr/bin/python
# -*- coding: utf-8 -*-


class Zustand:
    def __init__(self, txt=""):
        self.name = txt

    def get_name(self):
    	return self.name

    def set_name(self, txt):
    	self.name = txt

    def __str__(self, ):
        pass


