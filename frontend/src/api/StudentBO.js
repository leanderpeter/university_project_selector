import PersonBO from './PersonBO';


export default class StudentBO extends PersonBO{

	constructor(amat_nr, akuerzel){
        super();
        this.mat_nr = amat_nr;
        this.kuerzel = akuerzel;
	}

	/*
	Erhalte 
	*/
	getmat_nr(){
        return this.mat_nr;
    }

	/*
	setze 
	*/
    setmat_nr(amat_nr){
        this.mat_nr = amat_nr;
    }
	/*
	Erhalte 
	*/
    getkuerzel(){
        return this.kuerzel;
    }
	/*
	setze 
	*/
    setkuerzel(akuerzel){
        this.kuerzel = akuerzel;
	}
	
	
	/** 
   * Returns an Array of StudentBOs from a given JSON structure
   */
    static fromJSON(studenten) {
		let results = null;
		if (Array.isArray(studenten)) {
			results = [];
			studenten.forEach((c) => {
				Object.setPrototypeOf(c, StudentBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = studenten;
			Object.setPrototypeOf(c, StudentBO.prototype);
			results = c;
		}
		return results;
	}

}