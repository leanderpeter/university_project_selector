from server.ProjektAdministration import ProjektAdministration
from server.db.ProjektMapper import ProjektMapper


test = ProjektAdministration()
print(test.get_projekt_by_zus(1)[2].to_dict())