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

	// Array 
	static fromJSON(projektart){
		let result = null;
		let c = projektart;
		Object.setPrototypeOf(c, ProjektartBO.prototype);
		result = c;
		return result
	}
}