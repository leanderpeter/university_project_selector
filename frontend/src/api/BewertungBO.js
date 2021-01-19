import BusinessObject from "./BusinessObject";

/*
Realisierung eines BewertungsBO. Dieses besitzt eine Note
*/

export default class BewertungBO extends BusinessObject{

	constructor(anote){
        super();
        this.note = anote;
    }
    
	/*
	Erhalte Note
	*/
	getnote(){
		return this.note;
	}
	/*
	Setze Note
	*/
	setnote(anote){
		this.note = anote;  
	}
	
	//Return Array bzw. Objekt von Bewertungen aus einem JSON
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
