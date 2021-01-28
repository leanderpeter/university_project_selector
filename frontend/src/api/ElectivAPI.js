import ProjektBO from './ProjektBO';
import StudentBO from './StudentBO';
import PersonBO from './PersonBO';
import TeilnahmeBO from './TeilnahmeBO';
import BewertungBO from './BewertungBO';
import ModulBO from './ModulBO';
import SemesterBO from './SemesterBO';
import ProjektartBO from './ProjektartBO';

/*
Singleton Abstarktion des backend REST interfaces. Es handelt sich um eine access methode
*/

export default class ElectivAPI {

	//singletone instance
	static #api = null;

	// Lokales Python backend
	#ElectivServerBaseURL = '/electivApp';

	//Projekte anzeigen fuer Student
	#getProjekteURL = () => `${this.#ElectivServerBaseURL}/projekte`;
	#getProjekteByZustandURL = (id) => `${this.#ElectivServerBaseURL}/projekte/zustand/${id}`;
	#setZustandAtProjekt = (projektId, zustandId) => `${this.#ElectivServerBaseURL}/projekte/zustand?projektId=${projektId}&zustandId=${zustandId}`;
	#addProjekteURL = () => `${this.#ElectivServerBaseURL}/projekte`;
	#getProjekteByIDURL = (id) => `${this.#ElectivServerBaseURL}/projekte/${id}`;
	
	//Projekt löschen
	#deleteProjektURL = (id) => `${this.#ElectivServerBaseURL}/projekt/${id}`;

	#searchProjektURL = (projektname) => `${this.#ElectivServerBaseURL}/projekte_by_name/${projektname}`;

	// ------------------------Projekte bearbeiten/hinzufugen---------------------------


	// ---------------------------------------------------------------------------------

	#addProjektPendingURL = () => `${this.#ElectivServerBaseURL}/projektePending`;
	
	#updateProjektPendingURL = () => `${this.#ElectivServerBaseURL}/projektePending`;

	#getProjektePendingURL = () => `${this.#ElectivServerBaseURL}/projektePending`;

	//Projekt nach ID bekommen
	#getProjektURL = (id) => `${this.#ElectivServerBaseURL}/projekt/${id}`;

	//Projekte nach Dozent ID und Zustand bekommen
	#getProjekteByZustandByDozentURL = (zustand_id,dozent_id) => `${this.#ElectivServerBaseURL}/projekte/zustand/${zustand_id}/dozent/${dozent_id}`;

	//alle Teilnahmen eines Students anzeigen
	#getTeilnahmenURL = (id) => `${this.#ElectivServerBaseURL}/teilnahmen/${id}`;

	//Teilnahmen eines Students nach Semester anzeigen
	#getTeilnahmenBySemesterURL = (student_id, semester_id) => `${this.#ElectivServerBaseURL}/teilnahmenbysemester/${student_id}/${semester_id}`;

	//Alle Teilnahmen einer EDV Nummer für ein bestimmtes Semester
	#getTeilnahmen_by_modul_und_semesterURL = (modul_id, semester_id) => `${this.#ElectivServerBaseURL}/teilnahmen/${modul_id}/${semester_id}`
  
	//Teilnahme wählen
	#postTeilnahmeURL = (lehrangebotId,teilnehmerId) => `${this.#ElectivServerBaseURL}/teilnahme?lehrangebotId=${lehrangebotId}&teilnehmerId=${teilnehmerId}`;

	//Teilnahme löschen
	#deleteTeilnahmeURL = (lehrangebotId,teilnehmerId) => `${this.#ElectivServerBaseURL}/teilnahme?lehrangebotId=${lehrangebotId}&teilnehmerId=${teilnehmerId}`;

	//getPerson: id
	#getPersonURL = (id) => `${this.#ElectivServerBaseURL}/person/${id}`;

	//getPerson: google_user_id
	#getPersonByGoogleIDURL = (google_user_id) => `${this.#ElectivServerBaseURL}/personbygoogle/${google_user_id}`;

	//getStudent: google_user_id
	#getStudentByGoogleIDURL = (google_user_id) => `${this.#ElectivServerBaseURL}/studentbygoogle/${google_user_id}`;
	
	//getStudent: id
	#getStudentByIDURL = (id) => `${this.#ElectivServerBaseURL}/student/${id}`;

	//Bewertung nach Id bekommen
	#getBewertungURL = (id) => `${this.#ElectivServerBaseURL}/bewertung/${id}`;

	//Alle Bewertungen (Noten) bekommen
	#getBewertungenURL = () => `${this.#ElectivServerBaseURL}/bewertungen`;

	//Alle Module bekommen
	#getModuleURL = () => `${this.#ElectivServerBaseURL}/module`;

	//Add Modul
	#addModulURL = () => `${this.#ElectivServerBaseURL}/module`;

	//Update Modul
	#updateModulURL = () => `${this.#ElectivServerBaseURL}/module`

	//Delete Modul
	#deleteModulURL = (id) => `${this.#ElectivServerBaseURL}/module?id=${id}`;

    //Update Student
	#updateStudentURL = (id,name,matrNr) => `${this.#ElectivServerBaseURL}/studenten?id=${id}&name=${name}&matrNr=${matrNr}`;

	//Update User
	#updateUserURL = (id,name,email) => `${this.#ElectivServerBaseURL}/personen?id=${id}&name=${name}&email=${email}`;

	//Delete User
	#deleteUserURL = (id) => `${this.#ElectivServerBaseURL}/student/${id}`;

	//Module nach Id bekommen
	#getModule_by_projekt_idURL = (id) => `${this.#ElectivServerBaseURL}/modul/${id}`;

	//für ein Projekt wählbare Module in DB 'projekte_hat_module' einfügen 
	#postProjekte_hat_moduleURL = (projekt_id, module) => `${this.#ElectivServerBaseURL}/projekte_hat_module?projekt_id=${projekt_id}&module=${module}`;

	//für ein Projekt wählbare Module in DB 'projekte_hat_module' einfügen 
	#updateProjekte_hat_moduleURL = (projekt_id, module) => `${this.#ElectivServerBaseURL}/projekte_hat_module?projekt_id=${projekt_id}&module=${module}`;

	#updateTeilnahmeURL = (id) => `${this.#ElectivServerBaseURL}/teilnahme/${id}`;

	//Alle Semester bekommen
	#getSemesterURL = () => `${this.#ElectivServerBaseURL}/semester`;

	//Semester nach projekt Id bekommen
	#getSemester_by_idURL = (id) => `${this.#ElectivServerBaseURL}/semester/${id}`;

	//Add Semester
	#addSemesterURL = () => `${this.#ElectivServerBaseURL}/semester`;

	//Update Semester
	#updateSemesterURL = () => `${this.#ElectivServerBaseURL}/semester`

	//Delete Semester
	#deleteSemesterURL = (id) => `${this.#ElectivServerBaseURL}/semester?id=${id}`;

	//Alle Semester eines Studenten bekommen
	#getSemesterOfStudentURL = (id) => `${this.#ElectivServerBaseURL}/semesterofstudent/${id}`

	//Studenten eines Projekts bekommen
	#getStudentenByProjektIdURL = (id) => `${this.#ElectivServerBaseURL}/student/projekt/${id}`
	
	//Teilnahmen eines Projekts bekommen
    #getTeilnahmenByProjektIdURL = (id) => `${this.#ElectivServerBaseURL}/teilnahmen/projekt/${id}`

    //erhalte Projektarten nach ID
	#getProjektartByIDURL = (id) => `${this.#ElectivServerBaseURL}/projektart/${id}`
	
	//erhalte alle Projektarten
    #getProjektartURL = () => `${this.#ElectivServerBaseURL}/projektart`

    //POSTE eine neue Projektart
    #addProjektartURL = () => `${this.#ElectivServerBaseURL}/projektart`;

    //Update Projektart
	#updateProjektartURL = () => `${this.#ElectivServerBaseURL}/projektart`

    //Loesche eine Projektart nach ID
    #deleteProjektartURL = (id) => `${this.#ElectivServerBaseURL}/projektart?id=${id}`;
  
	//Alle Studenten bekommen
	#getStudentenURL = () => `${this.#ElectivServerBaseURL}/studenten`;

	//Alle User bekommen
	#getUserURL = () => `${this.#ElectivServerBaseURL}/personen`;

	/*
	Singleton/Einzelstuck instanz erhalten
	*/
	static getAPI() {
		if (this.#api == null) {
			this.#api = new ElectivAPI();
		} 
		return this.#api;
	}

	/*
	Gibt einen Error zuruck auf JSON Basis. fetch() gibt keine Errors wie 404 oder 500 zuruck. Deshaltb die func fetchAdvanced 
	*/
	#fetchAdvanced = (url, init) => fetch(url, init)
		.then(res => {
			//fetch() gibt keine Errors wie 404 oder 500 zuruck
			if (!res.ok) {
				throw Error(`${res.status} ${res.statusText}`);
				//throw Error(`Fail`);
			}
			return res.json();
		})
	/*
	Gebe alle BO's zuruck
	*/
	
	//gibt alle Projekte als BO zurück
	getProjekte() {
		return this.#fetchAdvanced(this.#getProjekteURL(),{method: 'GET'}).then((responseJSON) => {
			let projektBOs = ProjektBO.fromJSON(responseJSON);
			console.info(projektBOs)
			return new Promise(function (resolve){
				resolve(projektBOs);
			})
		})
	}

	//gibt alle Projekte mit der bestimmten Zustand als BO zurück
	getProjekteByZustand(zustand) {
		//immer Zustand 1 (neues Projekt) holen
		return this.#fetchAdvanced(this.#getProjekteByZustandURL(zustand),{method: 'GET'}).then((responseJSON) => {
			let projektBOs = ProjektBO.fromJSON(responseJSON);
			// projektBOs.sort((a,b) => (a.ects > b.ects) ? 1: -1); //Sortier alle Objecte im array nach ects, aufsteigend
			return new Promise(function (resolve){
				resolve(projektBOs);
			})
		})
	}

	//gibt alle Projektarten als BO zurück
	getProjektart() {
		return this.#fetchAdvanced(this.#getProjektartURL(), {method: 'GET'}).then((responseJSON) => {
			let projektartBos = ProjektartBO.fromJSON(responseJSON);
			return new Promise(function (resolve){
				resolve(projektartBos);
			})
		})
	}

	//gibt die Projektart mit der bestimmten ID als BO zurück
	getProjektartById(id) {
		return this.#fetchAdvanced(this.#getProjektartByIDURL(id),{method: 'GET'}).then((responseJSON) => {
			let projektartBO = ProjektartBO.fromJSON(responseJSON);
			return new Promise(function (resolve){
				resolve(projektartBO);
			})
		})
	}

	// Eine Projektart entfernen
	deleteProjektart(id){
		return this.#fetchAdvanced(this.#deleteProjektartURL(id),{method: 'DELETE'})
	}

	//Eine Projektart hinzufügen
	addProjektart(projektartBO) {
		return this.#fetchAdvanced(this.#addProjektartURL(), {
			method: 'POST',
			headers: {
				'Accept': 'application/json, text/plain',
				'Content-type': 'application/json',
			},
			body: JSON.stringify(projektartBO)
		}).then((responseJSON) => {
			// zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
			let responseProjektartBO = ProjektartBO.fromJSON(responseJSON);
			return new Promise(function (resolve) {
				resolve(responseProjektartBO);
			})
		})
	}

	//eine Projektart bearbeiten/updaten
	updateProjektart(projektartBO){
		return this.#fetchAdvanced(this.#updateProjektartURL(), {
			method: 'PUT',
			headers: {
				'Accept': 'application/json, text/plain',
				'Content-type': 'application/json',
			},
			body: JSON.stringify(projektartBO)
		}).then((responseJSON) => {
			// zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
			let responseProjektartBO = ProjektartBO.fromJSON(responseJSON);
			return new Promise(function (resolve) {
				resolve(responseProjektartBO);
			})
		})
	}

	//gibt alle Projekte mit dem bestimmten Projekt-Zustand von dem Dozenten als BO zurück
	getProjekteByZustandByDozent(zustand_id,dozent_id) {
		//immer Zustand 1 (neues Projekt) holen
		return this.#fetchAdvanced(this.#getProjekteByZustandByDozentURL(zustand_id,dozent_id),{method: 'GET'}).then((responseJSON) => {
			let projektBOs = ProjektBO.fromJSON(responseJSON);
			projektBOs.sort((a,b) => (a.ects > b.ects) ? 1: -1); //Sortier alle Objecte im array nach ects, aufsteigend
			return new Promise(function (resolve){
				resolve(projektBOs);
			})
		})
	}

	//setzt den Zustand eines Projekts mit der bestimmten ProjektID auf einen neuen Zustand
	setZustandAtProjekt(projektId, zustandId) { 
		//immer Zustand 1 (neues Projekt) holen
		return this.#fetchAdvanced(this.#setZustandAtProjekt(projektId,zustandId),{method: 'PUT'}).then((responseJSON) => {
			let projektBOs = ProjektBO.fromJSON(responseJSON);
			console.info(projektBOs)
			return new Promise(function (resolve){
				resolve(projektBOs);
			})
		})
	}

	//fügt ein Projekt als BO hinzu
	addProjekt(projektBO) {
		return this.#fetchAdvanced(this.#addProjektPendingURL(), {
			method: 'POST',
			headers: {
				'Accept': 'application/json, text/plain',
				'Content-type': 'application/json',
			},
			body: JSON.stringify(projektBO)
		}).then((responseJSON) => {
			// zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
			let responseProjektBO = ProjektBO.fromJSON(responseJSON);
			return new Promise(function (resolve) {
				resolve(responseProjektBO);
			})
		})
	}

	//Projekte im Zustand neu bekommen
	getPendingProjekte() {
		return this.#fetchAdvanced(this.#getProjektePendingURL(),{method: 'GET'}).then((responseJSON) => {
			let projektBOs = ProjektBO.fromJSON(responseJSON);
			console.info(projektBOs)
			return new Promise(function (resolve){
				resolve(projektBOs);
			})
		})
	}

	//gibt das Projekt mit der bestimmten ProjektID als BO zurück
	getProjekt(id){
		return this.#fetchAdvanced(this.#getProjektURL(id)).then((responseJSON) => {
			let projektBO = ProjektBO.fromJSON(responseJSON);
			console.info(projektBO)
			return new Promise(function (resolve){
				resolve(projektBO)
			})
		})
	}

	//Projektdaten updaten/bearbeiten
	updateProjekt(projektBO){
		return this.#fetchAdvanced(this.#updateProjektPendingURL(), {
			method: 'PUT',
			headers: {
				'Accept': 'application/json, text/plain',
				'Content-type': 'application/json',
			},
			body: JSON.stringify(projektBO)
		}).then((responseJSON) => {
			// zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
			let responseProjektBO = ProjektBO.fromJSON(responseJSON);
			return new Promise(function (resolve) {
				resolve(responseProjektBO);
			})
		})
	}

	//Projekt löschen
	deleteProjekt(id){
		return this.#fetchAdvanced(this.#deleteProjektURL(id),{method: 'DELETE'})
	}

	//gibt die Person mit der bestimmten ID als BO zurück
	getPerson(id){
		return this.#fetchAdvanced(this.#getPersonURL(id)).then((responseJSON) => {
			let personBO = PersonBO.fromJSON(responseJSON);
			console.info(personBO)
			return new Promise(function (resolve){
				resolve(personBO)
			})
		})
	}

	//gibt alle Teilnahmen mit der bestimmten StudentenID als BO zurück
	getTeilnahmen(studentID){
		return this.#fetchAdvanced(this.#getTeilnahmenURL(studentID)).then((responseJSON) => {
			let teilnahmeBOs = TeilnahmeBO.fromJSON(responseJSON);
			console.info(teilnahmeBOs)
			return new Promise(function (resolve){
				resolve(teilnahmeBOs)
			})
		})
	}



	//gibt alle Teilnahmen mit der bestimmten ModulID und SemesterID als BO zurück
	getTeilnahmen_by_modul_und_semester(modul_id, semester_id){
		return this.#fetchAdvanced(this.#getTeilnahmen_by_modul_und_semesterURL(modul_id, semester_id)).then((responseJSON) => {
			let teilnahmeBOs = TeilnahmeBO.fromJSON(responseJSON);
			console.info(teilnahmeBOs)
			return new Promise(function (resolve){
				resolve(teilnahmeBOs)
			})
		})
	}

	//gibt alle Teilnahmen mit der bestimmten SemesterID und StudentID als BO zurück
	getTeilnahmenBySemester(student_id, semester_id){
		return this.#fetchAdvanced(this.#getTeilnahmenBySemesterURL(student_id, semester_id)).then((responseJSON) => {
			let teilnahmeBOs = TeilnahmeBO.fromJSON(responseJSON);
			console.info(teilnahmeBOs)
			return new Promise(function (resolve){
				resolve(teilnahmeBOs)
			})
		})
	}

	//gibt die Person mit der bestimmten GoogleUserID als BO zurück
	getPersonByGoogleID(google_user_id){
		return this.#fetchAdvanced(this.#getPersonByGoogleIDURL(google_user_id)).then((responseJSON) => {
			let personBO = PersonBO.fromJSON(responseJSON);
			console.info(personBO)
			return new Promise(function (resolve){
				resolve(personBO)
			})
		})
	}

	//gibt den Studenten mit der bestimmten GoogleUserID als BO zurück	
	getStudentByGoogleID(google_user_id){
		return this.#fetchAdvanced(this.#getStudentByGoogleIDURL(google_user_id)).then((responseJSON) => {
			let studentBO = StudentBO.fromJSON(responseJSON);
			// console.info(studentBO)
			return new Promise(function (resolve){
				resolve(studentBO)
			})
		})
	}

	//gibt den Studenten mit der bestimmten StudentenID als BO zurück
	getStudentByID(id){
		return this.#fetchAdvanced(this.#getStudentByIDURL(id)).then((responseJSON) => {
			let studentBO = StudentBO.fromJSON(responseJSON);
			console.info(studentBO)
			return new Promise(function (resolve){
				resolve(studentBO)
			})
		})
	}

	//setzt die Teilnahme für eine bestimmte LehrangebotID mit der bestimmten StudentID
	setTeilnahme(lehrangebotId, studentID){
        //TODO Set User ID
         return this.#fetchAdvanced(this.#postTeilnahmeURL(lehrangebotId, studentID),{method: 'POST'}).then((responseJSON) => {

		})

	}

	//löscht den Teilnahme BO mit der bestimmten LehrangebotID und der bestimmten StudentID
	deleteTeilnahme(lehrangebotId, studentID){
        //TODO Set User ID
         return this.#fetchAdvanced(this.#deleteTeilnahmeURL(lehrangebotId, studentID),{method: 'DELETE'}).then((responseJSON) => {

		})

	}

	//updatet den Teilnahmen BO 
	updateTeilnahme(teilnahmeBO){
         return this.#fetchAdvanced(this.#updateTeilnahmeURL(teilnahmeBO.getID()),{
			method: 'PUT',
			headers:{
				'Accept': 'application/json, text/plain',
				'Content-type': 'application/json',
			},
			body: JSON.stringify(teilnahmeBO)
		}).then((responseJSON) => {
			let responseTeilnahmeBO = TeilnahmeBO.fromJSON(responseJSON)[0];
			return new Promise(function (resolve){
				resolve(responseTeilnahmeBO)
			})
		})
	}

	//gibt die Bewertung mit der bestimmten ID als BO zurück
	getBewertung(id){
		return this.#fetchAdvanced(this.#getBewertungURL(id)).then((responseJSON) => {
			let bewertungBO = BewertungBO.fromJSON(responseJSON);
			console.info(bewertungBO)
			return new Promise(function (resolve){
				resolve(bewertungBO)
			})
		})
	}

	//gibt alle Bewertungen als BO zurück
	getBewertungen(){
		return this.#fetchAdvanced(this.#getBewertungenURL()).then((responseJSON) => {
			let bewertungBOs = BewertungBO.fromJSON(responseJSON);
			console.info(bewertungBOs)
			return new Promise(function (resolve){
				resolve(bewertungBOs)
			})
		})
	}

	//gibt alle Module als BO zurück
	getModule(){
		return this.#fetchAdvanced(this.#getModuleURL()).then((responseJSON) => {
			let modulBOs = ModulBO.fromJSON(responseJSON);
			console.info(modulBOs)
			return new Promise(function (resolve){
				resolve(modulBOs)
			})
		})
	}

	//Modul hinzufügen
	addModul(modulBO) {
		return this.#fetchAdvanced(this.#addModulURL(), {
			method: 'POST',
			headers: {
				'Accept': 'application/json, text/plain',
				'Content-type': 'application/json',
			},
			body: JSON.stringify(modulBO)
		}).then((responseJSON) => {
			// zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
			let responseModulBO = ModulBO.fromJSON(responseJSON);
			return new Promise(function (resolve) {
				resolve(responseModulBO);
			})
		})
	}

	//Modul updaten/bearbeiten
	updateModul(modulBO){
		return this.#fetchAdvanced(this.#updateModulURL(), {
			method: 'PUT',
			headers: {
				'Accept': 'application/json, text/plain',
				'Content-type': 'application/json',
			},
			body: JSON.stringify(modulBO)
		}).then((responseJSON) => {
			// zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
			let responseModulBO = ModulBO.fromJSON(responseJSON);
			return new Promise(function (resolve) {
				resolve(responseModulBO);
			})
		})
	}

	//Modul löschen
	deleteModul(id){
		return this.#fetchAdvanced(this.#deleteModulURL(id),{method: 'DELETE'})
	}

	//Student updaten
	updateStudent(id,name,matrNr){
		return this.#fetchAdvanced(this.#updateStudentURL(id,name,matrNr), {
			method: 'PUT',
			headers: {
				'Accept': 'application/json, text/plain',
				'Content-type': 'application/json',
			}
		})
	}

	//User updaten
	updateUser(id,name,email){
		return this.#fetchAdvanced(this.#updateUserURL(id,name,email), {
			method: 'PUT',
			headers: {
				'Accept': 'application/json, text/plain',
				'Content-type': 'application/json',
			}
		})
	}

	//User löschen
	deleteUser(id){
		return this.#fetchAdvanced(this.#deleteUserURL(id),{method: 'DELETE'})
	}

	//alle Module für ein bestimmtes Projekt bekommen
	getModule_by_projekt_id(id){
		return this.#fetchAdvanced(this.#getModule_by_projekt_idURL(id)).then((responseJSON) => {
			let modulBO = ModulBO.fromJSON(responseJSON);
			console.info(modulBO)
			return new Promise(function (resolve){
				resolve(modulBO)
			})
		})
	}

	//Wählbare Module eines Projekts erstellen
	postProjekte_hat_module(projekt_id, module){
	   return this.#fetchAdvanced(this.#postProjekte_hat_moduleURL(projekt_id, module),{method: 'POST'})
   }

   //Wählbare Module eines Projekts updaten
   updateProjekte_hat_module(projekt_id, module){
	   return this.#fetchAdvanced(this.#updateProjekte_hat_moduleURL(projekt_id, module),{method: 'PUT'})
	}

	//Studenten eines Projekts bekommen
	getStudentenByProjektId(id){
		return this.#fetchAdvanced(this.#getStudentenByProjektIdURL(id)).then((responseJSON) => {
			let studentBOs = StudentBO.fromJSON(responseJSON);
			console.info(studentBOs)
			return new Promise(function (resolve){
				resolve(studentBOs)
			})
		})
	}

	//gibt die Teilnahmen mit der bestimmten ProjektID als BO zurück
	getTeilnahmenByProjektId(id){
		return this.#fetchAdvanced(this.#getTeilnahmenByProjektIdURL(id)).then((responseJSON) => {
			let teilnahmeBOs = TeilnahmeBO.fromJSON(responseJSON);
			console.info(teilnahmeBOs)
			return new Promise(function (resolve){
				resolve(teilnahmeBOs)
			})
		})
	}	

	//gibt die Semester mit der bestimmten SemesterID als BO zurück
	getSemester_by_id(id){
		return this.#fetchAdvanced(this.#getSemester_by_idURL(id)).then((responseJSON) => {
			let semesterBO = SemesterBO.fromJSON(responseJSON);
			console.info(semesterBO)
			return new Promise(function (resolve){
				resolve(semesterBO)
			})
		})		
	}
	//gibt alle Semester als BO zurück
	getSemester(){
		return this.#fetchAdvanced(this.#getSemesterURL()).then((responseJSON) => {
			let semesterBOs = SemesterBO.fromJSON(responseJSON);
			console.info(semesterBOs)
			return new Promise(function (resolve){
				resolve(semesterBOs)
			})
		})
	}

	//Semester hinzufügen
	addSemester(semesterBO) {
		return this.#fetchAdvanced(this.#addSemesterURL(), {
			method: 'POST',
			headers: {
				'Accept': 'application/json, text/plain',
				'Content-type': 'application/json',
			},
			body: JSON.stringify(semesterBO)
		}).then((responseJSON) => {
			// zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
			let responseSemesterBO = SemesterBO.fromJSON(responseJSON);
			return new Promise(function (resolve) {
				resolve(responseSemesterBO);
			})
		})
	}

	//Semester updaten
	updateSemester(semesterBO){
		return this.#fetchAdvanced(this.#updateSemesterURL(), {
			method: 'PUT',
			headers: {
				'Accept': 'application/json, text/plain',
				'Content-type': 'application/json',
			},
			body: JSON.stringify(semesterBO)
		}).then((responseJSON) => {
			// zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
			let responseSemesterBO = SemesterBO.fromJSON(responseJSON);
			return new Promise(function (resolve) {
				resolve(responseSemesterBO);
			})
		})
	}

	//Semester löschen
	deleteSemester(id){
		return this.#fetchAdvanced(this.#deleteSemesterURL(id),{method: 'DELETE'})
	}

	//Alle Semester eines Studenten bekommen, in der er eine Teilnahme hat
	getSemesterOfStudent(id){
		return this.#fetchAdvanced(this.#getSemesterOfStudentURL(id)).then((responseJSON) => {
			let semesterBOs = SemesterBO.fromJSON(responseJSON);
			console.info(semesterBOs)
			return new Promise(function (resolve){
				resolve(semesterBOs)
			})
		})
	}

	//gibt alle Studenten als BO zurück
	getStudenten(){
		return this.#fetchAdvanced(this.#getStudentenURL()).then((responseJSON) => {
			let studentBOs = StudentBO.fromJSON(responseJSON);
			console.info(studentBOs)
			return new Promise(function (resolve){
				resolve(studentBOs)
			})
		})
	}

	//gibt alle Personen als BO zurück
	getPersons(){

		return this.#fetchAdvanced(this.#getUserURL()).then((responseJSON) => {
			let personBOs = PersonBO.fromJSON(responseJSON);
			return new Promise(function (resolve){
				resolve(personBOs)
			})
		})
	}
}
