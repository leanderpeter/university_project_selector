import ProjektBO from './ProjektBO';

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


	//meine Projekte anzeigen
	#getMeineProjekteURL = (id) => `${this.#ElectivServerBaseURL}/meineprojekte/${id}`;

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
		return this.#fetchAdvanced(this.#getProjekteURL()).then((responseJSON) => {
			let projektBOs = ProjektBO.fromJSON(responseJSON);
			console.info(projektBOs)
			return new Promise(function (resolve){
				resolve(projektBOs);
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

}