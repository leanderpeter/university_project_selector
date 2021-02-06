# Start der Wahlfach App
In diesem File wird grobn skizziert wie sie die ElectivApp auf ihrem persönlichen Entwicklungrechner starten können.

## Schritt 1: Starten des DBMS
1. [Installation von mySQL](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/)
2. Starten der Datenbank (Platformabhängig siehe [mySQL DOKU](https://dev.mysql.com/doc/mysql-startstop-excerpt/8.0/en/windows-server-first-start.html))
3. Installation der Datenbank Instanz mithilfe der Datei ```/mysql/sql_dump_1.sql```

## Schritt 2: 
1. Erstellung eines Virutal Environments, beschrieben in [Dokument 
INSTALLATION.md](INSTALLATION.md)
2. Starten des Servers mit der Datei ```/src/main.py```

## Schritt 3: 
1. Navigation in das Verzeichnis ```/frontend```
2. Starten des Entwicklungsservers mit dem befehl ``npm start`` bei erststart vorher ``npm install`` um benötigte Packages aus package.json zu installieren
