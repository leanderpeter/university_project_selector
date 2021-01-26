#!/usr/bin/python
# -*- coding: utf-8 -*-


class Zustand:
    """Realisierung eines Zustands.

    Ein Zustand besitzt einen Namen, 
    der ausgelesen und neu gesetzt werden kann.
    """

    def __init__(self, zustand):
        self.name = zustand

    def get_name(self):
        """Auslesen des Namen"""
        return self.name

    def set_name(self, zustand):
        """Setzen des Namen"""
        self.name = zustand

    def __eq__(self, other):
    	if isinstance(other, Zustand):
    		return self.name == other.name
    	else:
    		return False

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung des jeweiligen Zustandes"""
        return self.name

    '''
    def __str__(self):
        return '{}'.format(self.name)

        # return '"{}"'.format(self.name)
	'''
