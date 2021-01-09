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
	//update 
	//delete
	#searchProjektURL = (projektname) => `${this.#ElectivServerBaseURL}/projekte_by_name/${projektname}`;

	// ------------------------Projekte bearbeiten/hinzufugen---------------------------


	// ---------------------------------------------------------------------------------

	#addProjektPendingURL = () => `${this.#ElectivServerBaseURL}/projektePending`;
	#getProjektePendingURL = () => `${this.#ElectivServerBaseURL}/projektePending`;

	//Projekt nach ID bekommen
	#getProjektURL = (id) => `${this.#ElectivServerBaseURL}/projekt/${id}`;

	//alle Teilnahmen eines Students anzeigen
	#getTeilnahmenURL = (id) => `${this.#ElectivServerBaseURL}/teilnahmen/${id}`;

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

	//Module nach Id bekommen
	#getModule_by_projekt_idURL = (id) => `${this.#ElectivServerBaseURL}/modul/${id}`;

	//für ein Projekt wählbare Module in DB 'projekte_hat_module' einfügen 
	#postProjekte_hat_moduleURL = (projekt_id, module) => `${this.#ElectivServerBaseURL}/module?projekt_id=${projekt_id}&module=${module}`;

	#updateTeilnahmeURL = (id) => `${this.#ElectivServerBaseURL}/teilnahme2/${id}`;

	//Alle Semester bekommen
	#getSemesterURL = () => `${this.#ElectivServerBaseURL}/semester`;

	//Semester nach projekt Id bekommen
	#getSemester_by_idURL = (id) => `${this.#ElectivServerBaseURL}/semester/${id}`;


	//Studenten eines Projekts bekommen
	#getStudentenByProjektIdURL = (id) => `${this.#ElectivServerBaseURL}/student/projekt/${id}`
	
	//Teilnahmen eines Projekts bekommen
    #getTeilnahmenByProjektIdURL = (id) => `${this.#ElectivServerBaseURL}/teilnahmen/projekt/${id}`
  
	//Alle Semester bekommen
	#getStudentenURL = () => `${this.#ElectivServerBaseURL}/studenten`;

    //erhalte Projektarten nach ID
    #getProjektartByIDURL = (id) => `${this.#ElectivServerBaseURL}/projektart/${id}`
	//erhalte alle Projektarten
    #getProjektartURL = () => `${this.#ElectivServerBaseURL}/projektart`

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
	Gebe alle Projekt BO's zuruck
	*/
	getProjekte() {
		return this.#fetchAdvanced(this.#getProjekteURL(),{method: 'GET'}).then((responseJSON) => {
			let projektBOs = ProjektBO.fromJSON(responseJSON);
			console.info(projektBOs)
			return new Promise(function (resolve){
				resolve(projektBOs);
			})
		})
	}

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

	getProjektart() {
		return this.#fetchAdvanced(this.#getProjektartURL(), {method: 'GET'}).then((responseJSON) => {
			let projektartBos = ProjektartBO.fromJSON(responseJSON);
			return new Promise(function (resolve){
				resolve(projektartBos);
			})
		})
	}

	getProjektartById(id) {
		return this.#fetchAdvanced(this.#getProjektartByIDURL(id),{method: 'GET'}).then((responseJSON) => {
			let projektartBO = ProjektartBO.fromJSON(responseJSON);
			return new Promise(function (resolve){
				resolve(projektartBO);
			})
		})
	}

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

	getPendingProjekte() {
		return this.#fetchAdvanced(this.#getProjektePendingURL(),{method: 'GET'}).then((responseJSON) => {
			let projektBOs = ProjektBO.fromJSON(responseJSON);
			console.info(projektBOs)
			return new Promise(function (resolve){
				resolve(projektBOs);
			})
		})
	}
	getProjekt(id){
		return this.#fetchAdvanced(this.#getProjektURL(id)).then((responseJSON) => {
			let projektBO = ProjektBO.fromJSON(responseJSON);
			console.info(projektBO)
			return new Promise(function (resolve){
				resolve(projektBO)
			})
		})
	}

	updateProjekt(){
		//USW
	}

	deleteProjekt(){
		//USW
	}

	getPerson(id){
		return this.#fetchAdvanced(this.#getPersonURL(id)).then((responseJSON) => {
			let personBO = PersonBO.fromJSON(responseJSON);
			console.info(personBO)
			return new Promise(function (resolve){
				resolve(personBO)
			})
		})
	}
	
	getTeilnahmen(studentID){
		return this.#fetchAdvanced(this.#getTeilnahmenURL(studentID)).then((responseJSON) => {
			let teilnahmeBOs = TeilnahmeBO.fromJSON(responseJSON);
			console.info(teilnahmeBOs)
			return new Promise(function (resolve){
				resolve(teilnahmeBOs)
			})
		})
	}

	getTeilnahmen_by_modul_und_semester(modul_id, semester_id){
		return this.#fetchAdvanced(this.#getTeilnahmen_by_modul_und_semesterURL(modul_id, semester_id)).then((responseJSON) => {
			let teilnahmeBOs = TeilnahmeBO.fromJSON(responseJSON);
			console.info(teilnahmeBOs)
			return new Promise(function (resolve){
				resolve(teilnahmeBOs)
			})
		})
	}

	getPersonByGoogleID(google_user_id){
		return this.#fetchAdvanced(this.#getPersonByGoogleIDURL(google_user_id)).then((responseJSON) => {
			let personBO = PersonBO.fromJSON(responseJSON);
			console.info(personBO)
			return new Promise(function (resolve){
				resolve(personBO)
			})
		})
	}


	getStudentByGoogleID(google_user_id){
		return this.#fetchAdvanced(this.#getStudentByGoogleIDURL(google_user_id)).then((responseJSON) => {
			let studentBO = StudentBO.fromJSON(responseJSON);
			// console.info(studentBO)
			return new Promise(function (resolve){
				resolve(studentBO)
			})
		})
	}

	getStudentByID(id){
		return this.#fetchAdvanced(this.#getStudentByIDURL(id)).then((responseJSON) => {
			let studentBO = StudentBO.fromJSON(responseJSON);
			console.info(studentBO)
			return new Promise(function (resolve){
				resolve(studentBO)
			})
		})
	}

	setTeilnahme(lehrangebotId, studentID){
        //TODO Set User ID
         return this.#fetchAdvanced(this.#postTeilnahmeURL(lehrangebotId, studentID),{method: 'POST'}).then((responseJSON) => {

		})

	}

	deleteTeilnahme(lehrangebotId, studentID){
        //TODO Set User ID
         return this.#fetchAdvanced(this.#deleteTeilnahmeURL(lehrangebotId, studentID),{method: 'DELETE'}).then((responseJSON) => {

		})

	}

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


	getBewertung(id){
		return this.#fetchAdvanced(this.#getBewertungURL(id)).then((responseJSON) => {
			let bewertungBO = BewertungBO.fromJSON(responseJSON);
			console.info(bewertungBO)
			return new Promise(function (resolve){
				resolve(bewertungBO)
			})
		})
	}
	getBewertungen(){
		return this.#fetchAdvanced(this.#getBewertungenURL()).then((responseJSON) => {
			let bewertungBOs = BewertungBO.fromJSON(responseJSON);
			console.info(bewertungBOs)
			return new Promise(function (resolve){
				resolve(bewertungBOs)
			})
		})
	}

	getModule(){
		return this.#fetchAdvanced(this.#getModuleURL()).then((responseJSON) => {
			let modulBOs = ModulBO.fromJSON(responseJSON);
			console.info(modulBOs)
			return new Promise(function (resolve){
				resolve(modulBOs)
			})
		})
	}

	getModule_by_projekt_id(id){
		return this.#fetchAdvanced(this.#getModule_by_projekt_idURL(id)).then((responseJSON) => {
			let modulBO = ModulBO.fromJSON(responseJSON);
			console.info(modulBO)
			return new Promise(function (resolve){
				resolve(modulBO)
			})
		})
	}

	postProjekte_hat_module(projekt_id, module){
	   return this.#fetchAdvanced(this.#postProjekte_hat_moduleURL(projekt_id, module),{method: 'POST'})
   }

	getStudentenByProjektId(id){
		return this.#fetchAdvanced(this.#getStudentenByProjektIdURL(id)).then((responseJSON) => {
			let studentBOs = StudentBO.fromJSON(responseJSON);
			console.info(studentBOs)
			return new Promise(function (resolve){
				resolve(studentBOs)
			})
		})
	}
	getTeilnahmenByProjektId(id){
		return this.#fetchAdvanced(this.#getTeilnahmenByProjektIdURL(id)).then((responseJSON) => {
			let teilnahmeBOs = TeilnahmeBO.fromJSON(responseJSON);
			console.info(teilnahmeBOs)
			return new Promise(function (resolve){
				resolve(teilnahmeBOs)
			})
		})
	}


	


	getSemester_by_id(id){
		return this.#fetchAdvanced(this.#getSemester_by_idURL(id)).then((responseJSON) => {
			let semesterBO = SemesterBO.fromJSON(responseJSON);
			console.info(semesterBO)
			return new Promise(function (resolve){
				resolve(semesterBO)
			})
		})		
	}

	getSemester(){
		return this.#fetchAdvanced(this.#getSemesterURL()).then((responseJSON) => {
			let semesterBOs = SemesterBO.fromJSON(responseJSON);
			console.info(semesterBOs)
			return new Promise(function (resolve){
				resolve(semesterBOs)
			})
		})
	}
	getStudenten(){
		return this.#fetchAdvanced(this.#getStudentenURL()).then((responseJSON) => {
			let studentBOs = StudentBO.fromJSON(responseJSON);
			console.info(studentBOs)
			return new Promise(function (resolve){
				resolve(studentBOs)
			})
		})
	}
}
