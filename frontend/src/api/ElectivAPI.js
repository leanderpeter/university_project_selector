import ProjektBO from './ProjektBO';
import StudentBO from './StudentBO';
import PersonBO from './PersonBO';
import TeilnahmeBO from './TeilnahmeBO';
import BewertungBO from './BewertungBO';
import ModulBO from './ModulBO';

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
	#addProjekteURL = () => `${this.#ElectivServerBaseURL}/projekte`;
	#getProjekteByIDURL = (id) => `${this.#ElectivServerBaseURL}/projekte/${id}`;
	//update 
	//delete
	#searchProjektURL = (projektname) => `${this.#ElectivServerBaseURL}/projekte_by_name/${projektname}`;

	//Projekt nach ID bekommen
	#getProjektURL = (id) => `${this.#ElectivServerBaseURL}/projekt/${id}`;

	//alle Teilnahmen eines Students anzeigen
	#getTeilnahmenURL = (id) => `${this.#ElectivServerBaseURL}/teilnahmen/${id}`;
  
	//Teilnahme wählen
	#putTeilnahmeURL = (lehrangebotId,teilnehmerId) => `${this.#ElectivServerBaseURL}/teilnahme?lehrangebotId=${lehrangebotId}&teilnehmerId=${teilnehmerId}`;


	//getPerson: id
	#getPersonURL = (id) => `${this.#ElectivServerBaseURL}/person/${id}`;

	//getStudent: google_user_id
	#getStudentURL = (google_user_id) => `${this.#ElectivServerBaseURL}/student/${google_user_id}`;

	//Bewertung nach Id bekommen
	#getBewertungURL = (id) => `${this.#ElectivServerBaseURL}/bewertung/${id}`;

	//Module nach Id bekommen
	#getModule_by_projekt_idURL = (id) => `${this.#ElectivServerBaseURL}/module/${id}`;


	//Studenten eines Projekts bekommen
	#getStudentenByProjektIdURL = (id) => `${this.#ElectivServerBaseURL}/student/projekt/${id}`
	
	//Teilnahmen eines Projekts bekommen
    #getTeilnahmenByProjektIdURL = (id) => `${this.#ElectivServerBaseURL}/teilnahmen/projekt/${id}`
  


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

	getStudent(google_user_id){
		return this.#fetchAdvanced(this.#getStudentURL(google_user_id)).then((responseJSON) => {
			let studentBO = StudentBO.fromJSON(responseJSON);
			console.info(studentBO)
			return new Promise(function (resolve){
				resolve(studentBO)
			})
		})
	}

	setTeilnahme(lehrangebotId, studentID){
        //TODO Set User ID
         return this.#fetchAdvanced(this.#putTeilnahmeURL(lehrangebotId, studentID),{method: 'PUT'}).then((responseJSON) => {

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
	getModule_by_projekt_id(id){
		return this.#fetchAdvanced(this.#getModule_by_projekt_idURL(id)).then((responseJSON) => {
			let modulBO = ModulBO.fromJSON(responseJSON);
			console.info(modulBO)
			return new Promise(function (resolve){
				resolve(modulBO)
			})
		})
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
}

	

