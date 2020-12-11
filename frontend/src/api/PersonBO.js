import NamedBusinessObject from './NamedBusinessObject';


export default class PersonBO extends NamedBusinessObject{

	constructor(aemail, agoogle_user_id, arolle){
        super();
        this.email = aemail;
        this.google_user_id = agoogle_user_id;
        this.rolle = arolle;
	}


	getemail(){
        return this.email;
    }

    setemail(aemail){
        this.email = aemail;
    }


    getgoogle_user_id(){
        return this.google_user_id;
    }

    setgoogle_user_id(agoogle_user_id){
        this.google_user_id = agoogle_user_id;
    }


    getrolle(){
        return this.rolle;
    }

    setrolle(arolle){
        this.rolle = arolle;
    }
    
    static fromJSON(personen) {
		let results = null;
		if (Array.isArray(personen)) {
			results = [];
			personen.forEach((c) => {
				Object.setPrototypeOf(c, PersonBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = personen;
			Object.setPrototypeOf(c, PersonBO.prototype);
			results = c;
		}
		return results;
	}

}