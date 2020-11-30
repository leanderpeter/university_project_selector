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
	constructor(aname, aprojektbeschreibung, abetreuer, astart, amax_teilnehmer) {
		super();
		this.name = aname;
		this.description = aprojektbeschreibung;
		this.instructor = abetreuer;
		this.date = astart;
		this.max_subscriber = amax_teilnehmer;
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
	setname(aname){
		this.name = aname;  
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
	setdescription(aprojektbeschreibung){
		this.description = aprojektbeschreibung;  
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
	setinstructor(abetreuer){
		this.instructor = abetreuer;  
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
	setdate(astart){
		this.date = astart;  
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
	setmax_subscriber(amax_teilnehmer){
		this.max_subscriber = amax_teilnehmer;  
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