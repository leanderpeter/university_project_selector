import NamedBusinessObject from './NamedBusinessObject';

/*
Projekt von ElectivApp
*/

export default class ProjektBO extends NamedBusinessObject{
	/*
	Erstellt ein BO mit den Parametern:
  `name` varchar(100) NOT NULL DEFAULT '',
  `description` varchar(100) NOT NULL DEFAULT '',
  `instructor` varchar(100) NOT NULL DEFAULT '',
  `date` varchar(100) NOT NULL DEFAULT '',
  `max_subscriber` int(11) NOT NULL DEFAULT '0',
	*/
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
	Erhalte max_subscriber
	*/
	getmax_teilnehmer(){
		return this.max_teilnehmer;
	}

	/*
	Setze max_subscriber
	*/
	setmax_teilnehmer(amax_teilnehmer){
		this.max_teilnehmer = amax_teilnehmer;  
	}

		/*
	Erhalte description
	*/
	getbeschreibung(){
		return this.beschreibung;
	}
	/*
	Setze description
	*/
	setbeschreibung(aprojektbeschreibung){
		this.beschreibung = aprojektbeschreibung;  
	}

		/*
	Erhalte instructor 
	*/
	getbetreuer(){
		return this.betreuer;
	}
	/*
	Setze instructor
	*/
	setbetreuer(abetreuer){
		this.betreuer = abetreuer;  
	}
		/*
	usw. Erhalte
	*/
	getexterner_partner(){
		return this.externer_partner;
	}
	/*
	Setze 
	*/
	setexterner_partner(aexterner_partner){
		this.externer_partner = aexterner_partner;  
	}
	/*
	Erhalte 
	*/
	getwoechentlich(){
		return this.woechentlich;
	}
	/*
	Setze 
	*/
	setwoechentlich(awoechentlich){
		this.woechentlich = awoechentlich;  
	}
		/*
	Erhalte 
	*/
	getanzahl_block_vor(){
		return this.anzahl_block_vor;
	}
	/*
	Setze 
	*/
	setanzahl_block_vor(aanzahl_block_vor){
		this.anzahl_block_vor = aanzahl_block_vor;  
	}
		/*
	Erhalte 
	*/
	getanzahl_block_in(){
		return this.anzahl_block_in;
	}
	/*
	Setze 
	*/
	setanzahl_block_in(aanzahl_block_in){
		this.anzahl_block_in = aanzahl_block_in;  
	}
		/*
	Erhalte 
	*/
	getpraeferierte_block(){
		return this.praeferierte_block;
	}
	/*
	Setze 
	*/
	setpraeferierte_block(apraeferierte_block){
		this.praeferierte_block = apraeferierte_block;  
	}
			/*
	Erhalte 
	*/
	getbes_raum(){
		return this.bes_raum;
	}
	/*
	Setze 
	*/
	setbes_raum(abes_raum){
		this.bes_raum = abes_raum;  
	}
				/*
	Erhalte 
	*/
	getraum(){
		return this.raum;
	}
	/*
	Setze 
	*/
	setraum(araum){
		this.raum = araum;  
	}
			/*
	Erhalte 
	*/
	getsprache(){
		return this.sprache;
	}
	/*
	Setze 
	*/
	setsprache(asprache){
		this.sprache = asprache;  
	}

	getdozent(){
		return this.dozent;
	}

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
	Erhalte  Anzahl Teilnehmer
	*/
	getAnzahlTeilnehmer(){
		return this.anzahlTeilnehmer;
	}

    /*
	Setze  Anzahl Teilnehmer
	*/
	setAnzahlTeilnehmer(aanzahlTeilnehmer){
		this.anzahlTeilnehmer = aanzahlTeilnehmer;
	}

	/*
	Erhalte  Anzahl Teilnehmer
	*/
	getTeilnehmerListe(){
		return this.teilnehmerListe;
	}

    /*
	Setze  Anzahl Teilnehmer
	*/
	setTeilnehmerListe(ateilnehmerListe){
		this.teilnehmerListe = ateilnehmerListe;
	}

	/*
	Erhalte  Anzahl ECTS
	*/
	getECTS(){
		return this.ects;
	}

    /*
	Setze  Anzahl Teilnehmer
	*/
	setECTS(aects){
		this.ects = aects;
	}
	
	/*
	Gebe ein Array von Projekt BO's zuruck.
	*/
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