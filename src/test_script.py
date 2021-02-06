from server.ProjektAdministration import ProjektAdministration
from server.db.ProjektMapper import ProjektMapper
from server.bo.Projekt import Projekt
from server.bo.Zustand import Zustand



adm = ProjektAdministration()
projekt = adm.create_wartelisteProjekt(1000, "name", 23, "projektbeschreibung", "betreuer", "externer_partner", True, 3, 3, "praeferierte_block", 50, "raum", "sprache", 3, "2", '2', "anzahlTeilnehmer", "teilnehmerListe")
projekt.set_aktueller_zustand(Projekt.Z_NEU)

if projekt.is_in_state(Projekt.Z_NEU):
	print("YEY")

print(projekt.get_aktueller_zustand())


# projekt.set_aktueller_zustand(Projekt.Z_GENEHMIGT)

if projekt.is_in_state(Projekt.Z_GENEHMIGT):
	print("Noch besser!")

projekt.set_aktueller_zustand("Alt")
projekt.