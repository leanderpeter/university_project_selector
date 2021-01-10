import NamedBusinessObject from "./NamedBusinessObject";

export default class ModulBO extends NamedBusinessObject{

	constructor(aedv_nr){
        super();
        this.edv_nr = aedv_nr;
    } 
	/*
	Erhalte 
	*/
	getEdv_nr(){
		return this.edv_nr;
	}
	/*
	Setze 
	*/
	setEdv_nr(aedv_nr){
		this.edv_nr = aedv_nr;  
    }

    static fromJSON(module) {
		let results = null;
		if (Array.isArray(module)) {
			results = [];
			module.forEach((c) => {
				Object.setPrototypeOf(c, ModulBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = module;
			Object.setPrototypeOf(c, ModulBO.prototype);
			results = c;
		}
		return results;
	}
}
