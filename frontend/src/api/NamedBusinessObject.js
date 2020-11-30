import BusinessObject from "./BusinessObject";

export default class NamedBusinessObject extends BusinessObject{

	constructor(aname){
        super();
        this.name = aname;
    }
    
	/*
	Erhalte 
	*/
	getname(){
		return this.name;
	}
	/*
	Setze 
	*/
	setname(aname){
		this.name = aname;  
	}
}
