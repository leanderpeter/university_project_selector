import NamedBusinessObject from './NamedBusinessObject';

export default class ProjektartBO extends NamedBusinessObject{

	constructor(asws, aects){
		super();
		this.sws = asws;
		this.ects = aects;
	}

	get_sws(){
		return this.sws;
	}

	set_sws(asws){
		this.sws = asws
	}

	// --

	get_ects(){
		return this.ects;
	}

	set_ects(aects){
		this.ects = aects;
	}

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