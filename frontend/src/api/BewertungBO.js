import BusinessObject from "./BusinessObject";

export default class BewertungBO extends BusinessObject{

	constructor(anote){
        super();
        this.note = anote;
    }
    
	/*
	Erhalte 
	*/
	getnote(){
		return this.note;
	}
	/*
	Setze 
	*/
	setnote(anote){
		this.note = anote;  
    }

    static fromJSON(bewertungen) {
		let results = null;
		if (Array.isArray(bewertungen)) {
			results = [];
			bewertungen.forEach((c) => {
				Object.setPrototypeOf(c, BewertungBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = bewertungen;
			Object.setPrototypeOf(c, BewertungBO.prototype);
			results = c;
		}
		return results;
	}
}
