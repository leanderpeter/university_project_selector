import BusinessObject from "./BusinessObject";

export default class TeilnahmeBO extends BusinessObject{

	constructor(ateilnehmer, alehrangebot, aanrechnung, aresultat){
        super();
        this.teilnehmer = ateilnehmer;
		this.lehrangebot = alehrangebot;
		this.anrechnung = aanrechnung;
		this.resultat = aresultat;
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
	 	/*
	Erhalte 
	*/
	getAnrechnung(){
		return this.anrechnung;
	}
	/*
	Setze 
	*/
	setAnrechnung(aanrechnung){
		this.anrechnung = aanrechnung;  
	}
	 	/*
	Erhalte 
	*/
	getresultat(){
		return this.resultat;
	}
	/*
	Setze 
	*/
	setResultat(aresultat){
		this.resultat = aresultat;  
    }
	
	/** 
   * Returns an Array of TeilnahmeBOs from a given JSON structure
   */
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
