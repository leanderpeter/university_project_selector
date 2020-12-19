import NamedBusinessObject from "./NamedBusinessObject";

export default class SemesterBO extends NamedBusinessObject{

	constructor(){
        super();
    }
    
    static fromJSON(semester) {
		let results = null;
		if (Array.isArray(semester)) {
			results = [];
			semester.forEach((c) => {
				Object.setPrototypeOf(c, SemesterBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = semester;
			Object.setPrototypeOf(c, SemesterBO.prototype);
			results = c;
		}
		return results;
	}
}
