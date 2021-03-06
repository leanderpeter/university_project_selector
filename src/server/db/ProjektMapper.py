#!/usr/bin/python
# -*- coding: utf-8 -*-

from server.bo.Projekt import Projekt
from server.db.Mapper import Mapper


class ProjektMapper(Mapper):
    """Mapper-Klasse, die Projekt Objekte auf der relationealen Datenbank abbildet.
    Die Klasse ermöglicht die Umwandlung von Objekten in Datenbankstrukturen und umgekehrt
    """
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Projekte aus der Datenbank

        :return Alle Projekt-Objekte im System
        """

        result = []
        cursor = self._connection.cursor()
        cursor.execute(
            "SELECT id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent, aktueller_zustand, halbjahr, art from projekte")
        tuples = cursor.fetchall()

        for (id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor,
             anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent, aktueller_zustand, halbjahr, art) in tuples:

            projekt = self.create_projekt(id, name, max_teilnehmer, beschreibung, betreuer, externer_partner,
                                          woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum,
                                          raum, sprache, dozent, aktueller_zustand, halbjahr, art)
            if aktueller_zustand == "Neu":
                projekt.set_aktueller_zustand(Projekt.Z_NEU)
            elif aktueller_zustand == "Genehmigt":
                projekt.set_aktueller_zustand(Projekt.Z_GENEHMIGT)
            elif aktueller_zustand == "in Bewertung":
                projekt.set_aktueller_zustand(Projekt.Z_IN_BEWERTUNG)
            elif aktueller_zustand == "Wahlfreigabe":
                projekt.set_aktueller_zustand(Projekt.Z_WAHLFREIGABE)
            elif aktueller_zustand == "Abgeschlossen":
                projekt.set_aktueller_zustand(Projekt.Z_ABGESCHLOSSEN)
            elif aktueller_zustand == "Abgelehnt":
                projekt.set_aktueller_zustand(Projekt.Z_ABGELEHNT)
            
            result.append(projekt)


        self._connection.commit()
        cursor.close()

        return result


    def set_zustand_at_projekt(self, projekt_id, zustand_id):
        """Überschreiben / Aktualisieren eines Projekt-Objekts in der DB

        :param projekt_id und zustand_id
        :return aktualisiertes Projekt-Objekt
        """
        cursor = self._connection.cursor()
        command = "UPDATE projekte SET aktueller_zustand = %s WHERE id = %s"
        data = (zustand_id,projekt_id)
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

   
    def find_projekte_by_zustand(self, zustand):
        '''Finde alle Projekte mit gegebenem Zustand
        :param zustand-> Zustand-String
        '''

        result = []
        cursor = self._connection.cursor()
        
        command = ("SELECT id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent, aktueller_zustand, halbjahr, art from projekte WHERE aktueller_zustand = {}".format(zustand))
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor,
             anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent, aktueller_zustand, halbjahr, art) in tuples:
            
            projekt = self.create_projekt(id, name, max_teilnehmer, beschreibung, betreuer, externer_partner,
                                          woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum,
                                          raum, sprache, dozent, aktueller_zustand, halbjahr, art)
            if zustand == "Neu":
                projekt.set_aktueller_zustand(Projekt.Z_NEU)
            elif zustand == "Genehmigt":
                projekt.set_aktueller_zustand(Projekt.Z_GENEHMIGT)
            elif zustand == "in Bewertung":
                projekt.set_aktueller_zustand(Projekt.Z_ABGESCHLOSSEN)
            elif zustand == "Wahlfreigabe":
                projekt.set_aktueller_zustand(Projekt.Z_WAHLFREIGABE)
            elif zustand == "Abgeschlossen":
                projekt.set_aktueller_zustand(Projekt.Z_ABGESCHLOSSEN)
            elif aktueller_zustand == "Abgelehnt":
                projekt.set_aktueller_zustand(Projekt.Z_ABGELEHNT)

            result.append(projekt)
        self._connection.commit()
        cursor.close()

        return result
    
    def find_projekte_by_zustand_by_dozent(self, zustand_id, dozent_id):
        '''Finde alle Projekte mit gegebene Zustand und vom gegebenen Dozenten
        :param zustand_id und dozent_id
        '''

        result = []
        cursor = self._connection.cursor()
        
        command = ("SELECT id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent, aktueller_zustand, halbjahr, art from projekte WHERE projekte.aktueller_zustand = %s AND projekte.dozent = %s")
        data = (zustand_id, dozent_id)
        cursor.execute(command, data)
        tuples = cursor.fetchall()

        for (id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor,
             anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent, aktueller_zustand, halbjahr, art) in tuples:
            
            projekt = self.create_projekt(id, name, max_teilnehmer, beschreibung, betreuer, externer_partner,
                                          woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum,
                                          raum, sprache, dozent, aktueller_zustand, halbjahr, art)
            
            if aktueller_zustand == "Neu":
                projekt.set_aktueller_zustand(Projekt.Z_NEU)
            elif aktueller_zustand == "Genehmigt":
                projekt.set_aktueller_zustand(Projekt.Z_GENEHMIGT)
            elif aktueller_zustand == "in Bewertung":
                projekt.set_aktueller_zustand(Projekt.Z_ABGESCHLOSSEN)
            elif aktueller_zustand == "Wahlfreigabe":
                projekt.set_aktueller_zustand(Projekt.Z_WAHLFREIGABE)
            elif aktueller_zustand == "Abgeschlossen":
                projekt.set_aktueller_zustand(Projekt.Z_ABGESCHLOSSEN)
            elif aktueller_zustand == "Abgelehnt":
                projekt.set_aktueller_zustand(Projekt.Z_ABGELEHNT)



            result.append(projekt)
            
        self._connection.commit()
        cursor.close()

        return result

    def find_projekte_by_zustaende(self, zustand):
        '''Finde alle Projekte mit gegebenen Zuständen
        :param zustand -> zustand-String
        '''

        result = []
        cursor = self._connection.cursor()

        command = (
        "SELECT id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent, aktueller_zustand, halbjahr, art from projekte WHERE aktueller_zustand IN ({})".format(zustand))

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor,
        anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent, aktueller_zustand, halbjahr, art) in tuples:
            projekt = self.create_projekt(id, name, max_teilnehmer, beschreibung, betreuer, externer_partner,
                                          woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum,
                                          raum, sprache, dozent, aktueller_zustand, halbjahr, art)
            if zustand == "Neu":
                projekt.set_aktueller_zustand(Projekt.Z_NEU)
            elif zustand == "Genehmigt":
                projekt.set_aktueller_zustand(Projekt.Z_GENEHMIGT)
            elif zustand == "in Bewertung":
                projekt.set_aktueller_zustand(Projekt.Z_ABGESCHLOSSEN)
            elif zustand == "Wahlfreigabe":
                projekt.set_aktueller_zustand(Projekt.Z_WAHLFREIGABE)
            elif zustand == "Abgeschlossen":
                projekt.set_aktueller_zustand(Projekt.Z_ABGESCHLOSSEN)
            elif aktueller_zustand == "Abgelehnt":
                projekt.set_aktueller_zustand(Projekt.Z_ABGELEHNT)

            result.append(projekt)

        self._connection.commit()
        cursor.close()
        
        return result




    def find_projekt_by_id(self, id):
        """Suchen eines Projekts nach der übergebenen ID. 

        :param id Primärschlüsselattribut aus der Datenbank
        :return Projekt-Objekt, welche mit der ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None

        cursor = self._connection.cursor()

        command = ("SELECT id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent, aktueller_zustand, halbjahr, art FROM projekte WHERE id={}").format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent, aktueller_zustand, halbjahr, art) = tuples[0]
            projekt = Projekt()
            projekt.set_id(id)
            projekt.set_name(name)
            projekt.set_max_teilnehmer(max_teilnehmer)
            projekt.set_projektbeschreibung(beschreibung)
            projekt.set_betreuer(betreuer)
            projekt.set_externer_partner(externer_partner)
            projekt.set_woechentlich(woechentlich)
            projekt.set_anzahl_block_vor(anzahl_block_vor)
            projekt.set_anzahl_block_in(anzahl_block_in)
            projekt.set_praeferierte_block(praeferierte_block)
            projekt.set_bes_raum(bes_raum)
            projekt.set_raum(raum)
            projekt.set_sprache(sprache)
            projekt.set_dozent(dozent)
            projekt.set_aktueller_zustand(aktueller_zustand)
            projekt.set_halbjahr(halbjahr)
            projekt.set_art(art)
            projekt.set_anzahlTeilnehmer(self.count_teilnehmer_by_projekt(id))
            projekt.set_teilnehmerListe(self.get_teilnehmerId_by_projekt(id))
            
            if aktueller_zustand == "Neu":
                projekt.set_aktueller_zustand(Projekt.Z_NEU)
            elif aktueller_zustand == "Genehmigt":
                projekt.set_aktueller_zustand(Projekt.Z_GENEHMIGT)
            elif aktueller_zustand == "in Bewertung":
                projekt.set_aktueller_zustand(Projekt.Z_ABGESCHLOSSEN)
            elif aktueller_zustand == "Wahlfreigabe":
                projekt.set_aktueller_zustand(Projekt.Z_WAHLFREIGABE)
            elif aktueller_zustand == "Abgeschlossen":
                projekt.set_aktueller_zustand(Projekt.Z_ABGESCHLOSSEN)
            elif aktueller_zustand == "Abgelehnt":
                projekt.set_aktueller_zustand(Projekt.Z_ABGELEHNT)

            result = projekt
        
        except IndexError:
            result = None


        self._connection.commit()
        cursor.close()

        return result

    def create_projekt(self, id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich,
                       anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent, aktueller_zustand, halbjahr, art):
        """Einfügen eines Projekt-Objekts in die DB

        :param id, name, max_teilnehmer, beschreibung usw. 
        :return das bereits übergebene Projekt-Objekt mit aktualisierten Daten
        """
        projekt = Projekt()
        projekt.set_id(id)
        projekt.set_name(name)
        projekt.set_max_teilnehmer(max_teilnehmer)
        projekt.set_projektbeschreibung(beschreibung)
        projekt.set_betreuer(betreuer)
        projekt.set_externer_partner(externer_partner)
        projekt.set_woechentlich(woechentlich)
        projekt.set_anzahl_block_vor(anzahl_block_vor)
        projekt.set_anzahl_block_in(anzahl_block_in)
        projekt.set_praeferierte_block(praeferierte_block)
        projekt.set_bes_raum(bes_raum)
        projekt.set_raum(raum)
        projekt.set_sprache(sprache)
        projekt.set_dozent(dozent)
        projekt.set_aktueller_zustand(aktueller_zustand)
        projekt.set_halbjahr(halbjahr)
        projekt.set_art(art)
        projekt.set_anzahlTeilnehmer(self.count_teilnehmer_by_projekt(id))
        projekt.set_teilnehmerListe(self.get_teilnehmerId_by_projekt(id))
        return projekt

    def find_by_id(self):
        pass

    def insert(self):
        pass

    def update(self, projekt):
        """Überschreiben / Aktualisieren eines Projekt-Objekts in der DB

        :param projekt
        :return aktualisiertes Projekt-Objekt
        """
        cursor = self._connection.cursor()

        command = "UPDATE projekte SET name=%s, max_teilnehmer=%s, beschreibung=%s, betreuer=%s, externer_partner=%s, woechentlich=%s, anzahl_block_vor=%s, anzahl_block_in=%s, praeferierte_block=%s, bes_raum=%s, raum=%s, sprache=%s, dozent=%s, aktueller_zustand=%s, halbjahr=%s, art=%s WHERE id=%s"
        data = (
            projekt.get_name(),
            projekt.get_max_teilnehmer(),
            projekt.get_projektbeschreibung(),
            projekt.get_betreuer(),
            projekt.get_externer_partner(),
            projekt.get_woechentlich(),
            projekt.get_anzahl_block_vor(),
            projekt.get_anzahl_block_in(),
            projekt.get_praeferierte_block(),
            projekt.get_bes_raum(),
            projekt.get_raum(),
            projekt.get_sprache(),
            projekt.get_dozent(),
            str(projekt.get_aktueller_zustand()),
            projekt.get_halbjahr(),
            projekt.get_art(),
            projekt.get_id()
        )
        result = projekt
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return result

    def delete(self, id):
        """Löschen der Daten eines Projektes aus der Datenbank

        :param id -> Projekt-Objekt
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM projekte_hat_module WHERE projekt_id={}".format(id)
        command2 = "DELETE FROM projekte WHERE id={}".format(id)
        cursor.execute(command)
        cursor.execute(command2)
        self._connection.commit()
        cursor.close()

    def count_teilnehmer_by_projekt(self, projektID):
        """zählen der Teilnehmer in einem Projekt. 

        :param ProjektID 
        :return Zahl, 
        None wenn kein Eintrag gefunden wurde
        """
        cursor = self._connection.cursor()
        command = "SELECT COUNT(*) FROM teilnahmen WHERE lehrangebot={}".format(projektID)
        cursor.execute(command)
        countRow = cursor.fetchone()
        self._connection.commit()
        cursor.close()
        return countRow[0]

    def get_teilnehmerId_by_projekt(self, projektID):
        """Suchen nach den Teilnehmer IDs eines Projekts. 

        :param projektID 
        :return Teilnehmer ID-Objekte, welche in der Projekt ID übereinstimmend sind,
                None wenn kein Eintrag gefunden wurde
        """
        result = []
        cursor = self._connection.cursor()
        command = "SELECT teilnehmer FROM teilnahmen WHERE lehrangebot={}".format(projektID)
        cursor.execute(command)
        rows = cursor.fetchall()
        for teilnehmer in rows:
            result.append(teilnehmer[0])
        self._connection.commit()
        cursor.close()
        return result

    def insert_pending(self, projekt):
        '''
        Einfugen eines Projekts BO's in die DB
        '''

        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM projekte")
        tuples = cursor.fetchall()


        for (maxid) in tuples:
            if maxid[0] is None:
                projekt.set_id(1)
            else:
                projekt.set_id(maxid[0]+1)

        command = "INSERT INTO projekte (id, name, max_teilnehmer, beschreibung, betreuer, externer_partner, woechentlich, anzahl_block_vor, anzahl_block_in, praeferierte_block, bes_raum, raum, sprache, dozent, aktueller_zustand, halbjahr, art) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        data = (
            projekt.get_id(),
            projekt.get_name(),
            projekt.get_max_teilnehmer(),
            projekt.get_projektbeschreibung(),
            projekt.get_betreuer(),
            projekt.get_externer_partner(),
            projekt.get_woechentlich(),
            projekt.get_anzahl_block_vor(),
            projekt.get_anzahl_block_in(),
            projekt.get_praeferierte_block(),
            projekt.get_bes_raum(),
            projekt.get_raum(),
            projekt.get_sprache(),
            projekt.get_dozent(),
            str(projekt.get_aktueller_zustand()),
            projekt.get_halbjahr(),
            projekt.get_art()
            )
        cursor.execute(command, data)
        self._connection.commit()
        cursor.close()

        return projekt


if (__name__ == "__main__"):
    with ProjektMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)
