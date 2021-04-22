# WahlfachApp

## Developing on localhost
If you want to start this project in your local environment make sure you run the following pre requirements

1. pull branch "dev_local".
2. install /mysql/sql_dump_1.sql on local mysql server
3. install /dependencies.txt for python environment 
4. run /src/main.py
5. run npm install in /frontend
6. run npm start in /frontend


## Intro
Wahlfach App ist ein Full Stack Webapplikation. Hierbei können mehrere Rollen, (Studenten, Dozenten und Admins) Projekte erstellen, verwalten und wählen. Das System ist aufgeteilt in Präsentationsschicht, Serviceschicht, Business Logik Schicht und Datenbank Schicht. Als Speicher in der Datenbank Schicht dient eine relationale MySQL Datenbank welche über ein Python Backend angesprochen wird. Hierbei kommt das [mysql connector package](https://dev.mysql.com/doc/connector-python/en/) zum einsatz. Um die Wartbarkeit zu erhöhen wird in allen Schichten auf Business Objekt Klassen zurückgegriffen. Business Logik anfragen werden im Backend in der Business Logik Schicht verarbeitet. Der Service Layer stellt die Resourcen mithilfe eines [Flask Web Server](https://flask.palletsprojects.com/en/1.1.x/) zur verfügung. Abgesichert werden die einzelnen Methoden durch einen Security Decorator mit dem [google-auth](https://google-auth.readthedocs.io/en/latest/) package.
Dargestellt werden die unterschiedlichen Ressourcen über ein JavaScript frontend erstellt mithilfe der [React Library](https://reactjs.org/). Das React Frontend sendet seine API Anfragen an das Python Backend. 

## Inhalt
Informationen finden Sie in:
- [INSTALLATION.md](INSTALLATION.md) welche alle Informationen für eine erfolgreiche Installation in ihrerer Entwicklungsumgebung enthält
- [RUN.md](RUN.md) baut auf [INSTALLATION.md](INSTALLATION.md) auf und erklärt den start der Datenbank, des Backends sowie des Frontends.
- [/src](/src): In diesem Verzeichnis finden Sie den Source Code des Projekts.
- [/frontend](/frontend): In diesem Verzeichnis finden Sie separat vom restlichen Source Code den Source Code des Frontend.
- [/mysql](/mysql): Hier finden Sie mySQL-spezifisches Material wie z.B. den Dump, um eine Datenbankinstanz zu erstellen
