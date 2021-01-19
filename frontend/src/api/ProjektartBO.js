import NamedBusinessObject from './NamedBusinessObject';

export default class ProjektartBO extends NamedBusinessObject{

	constructor(asws, aects){
		super();
		this.sws = asws;
		this.ects = aects;
	}

	/*
	erhalte 
	*/
	get_sws(){
		return this.sws;
	}
	/*
	setze 
	*/
	set_sws(asws){
		this.sws = asws
	}
	/*
	erhalte 
	*/
	get_ects(){
		return this.ects;
	}
	/*
	setze 
	*/
	set_ects(aects){
		this.ects = aects;
	}

	/** 
   * Returns an Array of ProjektartBOs from a given JSON structure
   */
	static fromJSON(projektart) {
		let results = null;
		if (Array.isArray(projektart)) {
			results = [];
			projektart.forEach((c) => {
				Object.setPrototypeOf(c, ProjektartBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = projektart;
			Object.setPrototypeOf(c, ProjektartBO.prototype);
			results = c;
		}
		return results;
	}
}