import BusinessObject from './BusinessObject';

/*
Projekt von ElectivApp
*/

export default class ProjektBO extends BusinessObject {
	/*
	Erstellt ein BO mit den Parametern:
  `name` varchar(100) NOT NULL DEFAULT '',
  `description` varchar(100) NOT NULL DEFAULT '',
  `instructor` varchar(100) NOT NULL DEFAULT '',
  `date` varchar(100) NOT NULL DEFAULT '',
  `max_subscriber` int(11) NOT NULL DEFAULT '0',
	*/
	constructor(_name, _description, _instructor, _date, _max_subscriber) {
		super();
		this.name = _name;
		this.description = _description;
		this.instructor = _instructor;
		this.date = _date;
		this.max_subscriber = _max_subscriber;
	}

	/*
	Erhalte 
	*/
	getname(){
		return this.name;
	}

	/*
	Setze 
	*/
	setname(_name){
		this.name = _name;  
	}

		/*
	Erhalte description
	*/
	getdescription(){
		return this.description;
	}

	/*
	Setze description
	*/
	setdescription(_description){
		this.description = _description;  
	}

		/*
	Erhalte instructor 
	*/
	getinstructor(){
		return this.instructor;
	}

	/*
	Setze instructor
	*/
	setinstructor(_instructor){
		this.instructor = _instructor;  
	}

		/*
	Erhalte date
	*/
	getdate(){
		return this.date;
	}

	/*
	Setze date
	*/
	setdate(_date){
		this.date = _date;  
	}

		/*
	Erhalte max_subscriber
	*/
	getmax_subscriber(){
		return this.max_subscriber;
	}

	/*
	Setze max_subscriber
	*/
	setmax_subscriber(_max_subscriber){
		this.max_subscriber = _max_subscriber;  
	}
	
	/*
	Gebe ein Array von Projekt BO's zuruck.
	*/
	static fromJSON(projekte) {
		let results = [];
		if (Array.isArray(projekte)) {
			projekte.forEach((c) => {
				Object.setPrototypeOf(c, ProjektBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = projekte;
			Object.setPrototypeOf(c, ProjektBO.prototype);
			results.push(c);
		}
		return results;
	}
}