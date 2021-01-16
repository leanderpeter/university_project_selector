#!/usr/bin/python
# -*- coding: utf-8 -*-


class Zustand:

    def __init__(self, zustand):
        self.name = zustand

    def get_name(self):
    	return self.name

    def set_name(self, zustand):
    	self.name = zustand

    def __eq__(self, other):
    	if isinstance(other, Zustand):
    		return self.name == other.name
    	else:
    		return False

    def __str__(self):
    	return self.name

    '''
    def __str__(self):
        return '{}'.format(self.name)

        # return '"{}"'.format(self.name)
	'''
