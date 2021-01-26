#!/usr/bin/python
# -*- coding: utf-8 -*-



class Automat:

    """Realisierung eines Automaten.

    Der Automat besitzt einen aktuellen Zustand,
    der ausgelesen als auch in einen neuen Zustand gesetzt werden kann.
    """
    def __init__(self):
        self._aktueller_zustand = None

    def get_aktueller_zustand(self):
        """Auslesen des Fremdschlüssels zum aktuellen Zustand."""
        return self._aktueller_zustand

    def set_aktueller_zustand(self, zustand):
        """Setzen des Fremdschlüssels zum aktuellen Zustand."""
        self._aktueller_zustand = zustand

    def is_in_state(self, zustand):
        """ returt True wenn der gegebene Zustand gleich zu dem Objektzustand ist """
        return zustand == self._aktueller_zustand

    def __str__(self):
        """Erzeugen einer einfachen textuellen Repräsentation des jeweiligen aktuellen Zustands."""
        return self._aktueller_zustand