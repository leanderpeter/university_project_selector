'''
from server.ProjektAdministration import ProjektAdministration
from server.db.ProjektMapper import ProjektMapper
from server.bo.Projekt import Projekt
from server.bo.Zustand import Zustand
'''

from test_script_2 import Projekt, Zustand

p = Projekt()

p.set_aktueller_zustand(Zustand('Was'))
print(str(p.get_aktueller_zustand()))

print(type(p.get_aktueller_zustand()))

