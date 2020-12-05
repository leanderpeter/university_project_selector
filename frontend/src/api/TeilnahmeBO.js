import BusinessObject from "./BusinessObject";

export default class TeilnahmeBO extends BusinessObject{

	constructor(ateilnehmer, alehrangebot){
        super();
        this.teilnehmer = ateilnehmer;
        this.lehrangebot = alehrangebot;
    }
    
	/*
	Erhalte 
	*/
	getteilnehmer(){
		return this.teilnehmer;
	}
	/*
	Setze 
	*/
	setteilnehmer(ateilnehmer){
		this.teilnehmer = ateilnehmer;  
    }
    	/*
	Erhalte 
	*/
	getlehrangebot(){
		return this.lehrangebot;
	}
	/*
	Setze 
	*/
	setlehrangebot(alehrangebot){
		this.lehrangebot = alehrangebot;  
    }
    
    static fromJSON(teilnahmen) {
		let results = null;
		if (Array.isArray(teilnahmen)) {
			results = [];
			teilnahmen.forEach((c) => {
				Object.setPrototypeOf(c, TeilnahmeBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = teilnahmen;
			Object.setPrototypeOf(c, TeilnahmeBO.prototype);
			results = c;
		}
		return results;
	}
}
