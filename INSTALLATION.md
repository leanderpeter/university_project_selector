# Installationsanleitung

## Client-Seite
Der Client besteht aus einem React-Frontend welche durch create-react-app gebootstrapt wurde. Der bearbeitbare Quellcode des Frontend's liegt in `/frontend`.

### Requirements
1. [Node.js](https://nodejs.org/en/)
2. Packages. Diese Können über den Paketmanager `npm install [package]` installiert werden.
	1. [React Router](https://reactrouter.com/)
	2. [Material-UI](https://material-ui.com/)
	3. [Google firebase-auth](https://firebase.google.com/docs/auth)

### Start des Development-Server
Der Dev-Server wird in einem Terminal mit dem Kommando `npm start` gestartet. Nach erfolgreichem Start ist die React-App unter http://localhost:3000 verfügbar.

### Deployment auf dem flask-Server
Wenn die App auf einem Hoster AWS, Google oder Azure veröffentlich/deployt werden muss ein produktionsreifer build mit `npm run build` erstellt. Der nun erstellte Build muss in den Ordner `/src/static` abgelegt werden.

## Backend / Server
Der Python Server baut auf Python, Flask sowie RestX auf.

### Installation
Falls Anaconda verwendet wird kann hierbei der befehl `conda env create --file dependencies.txt` verwendet werden. Hierbei wird ein Virtual Environment mit allen benötigten Packages erstellt

Gleichzeitig können die Packages auch mit Pythons Paketmanager `pip install [package]` manuell installiert werden. Installiert werden müssen: 

1. Aktuelle Python-Installation (siehe python.org)
2. Flask (darin enthalten sind auch *Werkzeug* und *Jinja*)
3. flask-restx
4. flask-cors 
5. google-auth
6. requests

### Backend starten
Ist das Environment mit allen packages installiert kann der Server über die ```main.py``` gestartet werden. Zu erreichen ist das Backend im Debug mode nun über ```127.0.0.1``` 