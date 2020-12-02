
from server.ProjektAdministration import ProjektAdministration


pm = ProjektAdministration()
teilnahmen = pm.get_teilnahmen_von_person(1)
projekte = pm.get_projekte_von_teilnahmen(teilnahmen)
print(projekte)



