import ProjektBO from './ProjektBO';
import StudentBO from './StudentBO';

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
	#addProjektURL = () => `${this.#ElectivServerBaseURL}/projekte`;
	#getProjektURL = (id) => `${this.#ElectivServerBaseURL}/projekte/${id}`;
	//update 
	//delete
	#searchProjektURL = (projektname) => `${this.#ElectivServerBaseURL}/projekte_by_name/${projektname}`;

	// ------------------------Projekte bearbeiten/hinzufugen---------------------------


	// ---------------------------------------------------------------------------------

	#addProjektPendingURL = () => `${this.#ElectivServerBaseURL}/projektePending`;


	//meine Projekte anzeigen
	#getMeineProjekteURL = (id) => `${this.#ElectivServerBaseURL}/meineprojekte/${id}`;
  
	//Teilnahme wählen
	#putTeilnahmeURL = (lehrangebotId,teilnehmerId) => `${this.#ElectivServerBaseURL}/teilnahme?lehrangebotId=${lehrangebotId}&teilnehmerId=${teilnehmerId}`;

	//getStudent: google_user_id
	#getStudentURL = (google_user_id) => `${this.#ElectivServerBaseURL}/student/${google_user_id}`;

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

	addProjekt(ProjektBO) {
		return this.#fetchAdvanced(this.#addProjektPendingURL(), {
			method: 'POST',
			headers: {
				'Accept': 'application/json, text/plain',
				'Content-type': 'application/json',
			},
			body: JSON.stringify(ProjektBO)
		}).then((responseJSON) => {
			// zuruck kommt ein array, wir benoetigen aber nur ein Objekt aus dem array
			let responseProjektBO = ProjektBO.fromJSON(responseJSON)[0];
			return new Promise(function (resolve) {
				resolve(responseProjektBO);
			})
		})
	}

	updateProjekt(){
		//USW
	}

	deleteProjekt(){
		//USW
	}

	
	getMeineProjekte(studentID){
		return this.#fetchAdvanced(this.#getMeineProjekteURL(studentID)).then((responseJSON) => {
			let projektBOs = ProjektBO.fromJSON(responseJSON);
			console.info(projektBOs)
			return new Promise(function (resolve){
				resolve(projektBOs)
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
}