

class Rolle:
    """Realisierung einer Rolle

    Eine Rolle besitzt einen Namen der ausgelesen und neu gesetzt werden kann.
    """

    def __init__(self, name):
        self.name = name

    def get_name(self):
        """Auslesen des Rollen Namen"""
        return self.name

    def set_name(self, name):
        """Setzen des Rollen Namen"""
        self.name = name

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Rolle"""
        return self.name

