from server.ProjektAdministration import ProjektAdministration
from server.db.ProjektMapper import ProjektMapper

test = ProjektMapper()
print(test.find_projekt_by_id(1232))
