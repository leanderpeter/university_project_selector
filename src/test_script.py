from server.ProjektAdministration import ProjektAdministration
from server.db.ProjektMapper import ProjektMapper
from server.bo.Projekt import Projekt
from server.bo.Zustand import Zustand



adm = ProjektAdministration()
obj = adm.get_projektart_by_id(3)
print(obj)
