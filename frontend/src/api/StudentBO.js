import PersonBO from './PersonBO';


export default class StudentBO extends PersonBO{

	constructor(amat_nr, akuerzel){
        super();
        this.mat_nr = amat_nr;
        this.kuerzel = akuerzel;
	}


	getmat_nr(){
        return this.mat_nr;
    }

    setmat_nr(amat_nr){
        this.mat_nr = amat_nr;
    }


    getkuerzel(){
        return this.kuerzel;
    }

    setkuerzel(akuerzel){
        this.kuerzel = akuerzel;
    }

    static fromJSON(studenten) {
		let results = [];
		if (Array.isArray(studenten)) {
			studenten.forEach((c) => {
				Object.setPrototypeOf(c, StudentBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = studenten;
			Object.setPrototypeOf(c, StudentBO.prototype);
			results.push(c);
		}
		return results;
	}

}