from server.ProjektAdministration import ProjektAdministration
from server.db.ProjektMapper import ProjektMapper
from server.bo.Projekt import Projekt
from server.bo.Zustand import Zustand


zus = Zustand('Wait what')
test = ProjektAdministration()
p = Projekt()

p.set_aktueller_zustand(zus)
print(p.get_aktueller_zustand())


'''
---------------------------------------------
'''

zus_n = Zustand('Fussball')
pp = Projekt()

zz = test.set_state(pp, zus_n)

print(zz.get_aktueller_zustand())

