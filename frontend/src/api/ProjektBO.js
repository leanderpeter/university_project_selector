import NamedBusinessObject from './NamedBusinessObject';

/*
Realisierung eines ProjektBOs mit allen Attributen
*/

export default class ProjektBO extends NamedBusinessObject{
	constructor(aid, aname, amax_teilnehmer, aprojektbeschreibung, abetreuer, aexterner_partner, awoechentlich, aanzahl_block_vor, aanzahl_block_in, apraeferierte_block, abes_raum, araum, asprache, adozent, azustand, ahalbjahr, aart, aanzahlTeilnehmer,ateilnehmerListe){
		super(aid, aname);
		this.id = aid;
		this.name = aname;
		this.max_teilnehmer = amax_teilnehmer;
		this.beschreibung = aprojektbeschreibung;
		this.betreuer = abetreuer;
		this.externer_partner = aexterner_partner;
		this.woechentlich =awoechentlich;
		this.anzahl_block_vor = aanzahl_block_vor;
		this.anzahl_block_in = aanzahl_block_in;
		this.praeferierte_block = apraeferierte_block;
		this.bes_raum = abes_raum;
		this.raum = araum;
		this.sprache = asprache;
		this.dozent = adozent;
		this.aktueller_zustand = azustand
		this.halbjahr = ahalbjahr;
		this.art = aart;
		this.anzahlTeilnehmer = aanzahlTeilnehmer;
		this.teilnehmerListe = ateilnehmerListe;
	}


	/*
	Erhalte max_teilnehmer
	*/
	getmax_teilnehmer(){
		return this.max_teilnehmer;
	}

	/*
	Setze max_teilnehmer
	*/
	setmax_teilnehmer(amax_teilnehmer){
		this.max_teilnehmer = amax_teilnehmer;  
	}

	/*
	Erhalte beschreibung
	*/
	getbeschreibung(){
		return this.beschreibung;
	}
	/*
	Setze beschreibung
	*/
	setbeschreibung(aprojektbeschreibung){
		this.beschreibung = aprojektbeschreibung;  
	}

	/*
	Erhalte betreuer 
	*/
	getbetreuer(){
		return this.betreuer;
	}
	/*
	Setze betruer
	*/
	setbetreuer(abetreuer){
		this.betreuer = abetreuer;  
	}
	/*
	Erhalte externer_partner
	*/
	getexterner_partner(){
		return this.externer_partner;
	}
	/*
	Setze externer_partner
	*/
	setexterner_partner(aexterner_partner){
		this.externer_partner = aexterner_partner;  
	}
	/*
	Erhalte woechentlich
	*/
	getwoechentlich(){
		return this.woechentlich;
	}
	/*
	Setze woechentlich
	*/
	setwoechentlich(awoechentlich){
		this.woechentlich = awoechentlich;  
	}
	/*
	Erhalte anzahl_block_vor
	*/
	getanzahl_block_vor(){
		return this.anzahl_block_vor;
	}
	/*
	Setze anzahl_block_vor
	*/
	setanzahl_block_vor(aanzahl_block_vor){
		this.anzahl_block_vor = aanzahl_block_vor;  
	}	
	/*
	Erhalte anzahl_block_in
	*/
	getanzahl_block_in(){
		return this.anzahl_block_in;
	}
	/*
	Setze anzahl_block_in
	*/
	setanzahl_block_in(aanzahl_block_in){
		this.anzahl_block_in = aanzahl_block_in;  
	}
	/*
	Erhalte praeferierte_block
	*/
	getpraeferierte_block(){
		return this.praeferierte_block;
	}
	/*
	Setze praeferierte_block
	*/
	setpraeferierte_block(apraeferierte_block){
		this.praeferierte_block = apraeferierte_block;  
	}
	/*
	Erhalte bes_raum
	*/
	getbes_raum(){
		return this.bes_raum;
	}
	/*
	Setze bes_raum
	*/
	setbes_raum(abes_raum){
		this.bes_raum = abes_raum;  
	}
	/*
	Erhalte raum
	*/
	getraum(){
		return this.raum;
	}
	/*
	Setze raum
	*/
	setraum(araum){
		this.raum = araum;  
	}
	/*
	Erhalte sprache
	*/
	getsprache(){
		return this.sprache;
	}
	/*
	Setze sprache
	*/
	setsprache(asprache){
		this.sprache = asprache;  
	}
	/*
	Erhalte dozent
	*/
	getdozent(){
		return this.dozent;
	}
	/*
	Setze dozent
	*/
	setdozent(adozent){
		this.dozent = adozent;
	}

	/*
	Erhalte aktuellen Zustand
	*/
	getAktuellerZustand(){
		return this.aktueller_zustand;
	}
	/*
	Setze aktuellen Zustand
	*/
	setAktuellerZustand(azustand){
		this.aktueller_zustand = azustand;  
	}

	/*
	Erhalte  Halbjahr
	*/
	getHalbjahr(){
		return this.halbjahr;
	}

    /*
	Setze  Halbjahr
	*/
	setHalbjahr(ahalbjahr){
		this.halbjahr = ahalbjahr;
	}
			/*
	Erhalte  Art
	*/
	getArt(){
		return this.art;
	}

    /*
	Setze  Art
	*/
	setArt(aart){
		this.art = aart;
	}

    /*
	Erhalte Anzahl Teilnehmer
	*/
	getAnzahlTeilnehmer(){
		return this.anzahlTeilnehmer;
	}

    /*
	Setze Anzahl Teilnehmer
	*/
	setAnzahlTeilnehmer(aanzahlTeilnehmer){
		this.anzahlTeilnehmer = aanzahlTeilnehmer;
	}

	/*
	Erhalte TeilnehmerListe
	*/
	getTeilnehmerListe(){
		return this.teilnehmerListe;
	}

    /*
	Setze TeilnehmerListe
	*/
	setTeilnehmerListe(ateilnehmerListe){
		this.teilnehmerListe = ateilnehmerListe;
	}

	/*
	Erhalte Anzahl ECTS
	*/
	getECTS(){
		return this.ects;
	}

    /*
	Setze Anzahl ECTS
	*/
	setECTS(aects){
		this.ects = aects;
	}
	
	//Return Array bzw. Objekt von Projekten aus einem JSON
	static fromJSON(projekte) {
		let results = null;
		if (Array.isArray(projekte)) {
			results = [];
			projekte.forEach((c) => {
				Object.setPrototypeOf(c, ProjektBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = projekte;
			Object.setPrototypeOf(c, ProjektBO.prototype);
			results = c;
		}
		return results;
	}
}