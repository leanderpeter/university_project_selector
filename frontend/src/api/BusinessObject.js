/*
Basisklasse fuer alle BO's welche eine ID besitzen
*/

export default class BusinessObject {
	/*
	Null constructor
	*/
	constructor(){
		this.id = 0;
	}

	/*
	Jedes Business Object erhaelt eine neue ID, die aId.
	*/
	setID(){
		return this.id;
	}

	/*
	Gebe die ID vom BO zurueck
	*/
	getID(){
		return this.id;
	}

	/*
	Gibt eine darstellung des BO's in Form eines String zuruck
	*/
	toString() {
		let result = '';
		for (var prop in this) {
			result += prop + ': ' +this[prop] + ' ';
		}
		return result;
	}
}