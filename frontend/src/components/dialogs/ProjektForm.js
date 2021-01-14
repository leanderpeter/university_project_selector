import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ElectivAPI, ProjektBO } from '../../api';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from "@material-ui/core/Chip";
import ListItemText from "@material-ui/core/ListItemText";


/*
Dieses Form zeigt ein Dialog zum erstllen/updaten von ProjektBO's. Falls ein Projekt bereits besteht wird das Formular als edit konfiguireirt.
Falls das Projekt Objekt null ist wird das Formular zum erstellen eine PojektBO's konfiguriert.
Dafuer wird auf die API zugegriffen (Backend zugriff)
Funktion onClose erstellt/updated/abbruch des Prozesses.
*/

class ProjektForm extends Component {

	constructor(props) {
		super(props);

		let nm = '', mt = null, bs = '', bt = '', ep = '',wt = false, av = 0, ai = 0, pb = '', br = false, rm = '', sp = 'deutsch', dz = '', at = '', tl = '';
		let boolvor = false, boolin = false, boolpraef = false;
		if (props.projekt){
			var  hj = 0, pa = 0;
		}
		else{
			var hj = null, pa = null;
		}
		

		//init state
		this.state = {
			name: nm,
			nameValidationFailed: false,
			nameEdited: false,

			max_teilnehmer: mt,
			max_teilnehmerValidationFailed: false,
			max_teilnehmerEdited: false,

			beschreibung: bs,
			beschreibungValidationFailed: false,
			beschreibungEdited: false,

			betreuer: bt,
			betreuerValidationFailed: false,
			betreuerEdited: false,

			externer_partner: ep,
			externer_partnerValidationFailed: false,
			externer_partnerEdited: false,

			woechentlich: wt,
			woechentlichValidationFailed: false,
			woechentlichEdited: false,

			boolBlock_vor: boolvor,
			anzahl_block_vor: av,
			anzahl_block_vorValidationFailed: false,
			anzahl_block_vorEdited: false,

			boolBlock_in: boolin,
			anzahl_block_in: ai,
			anzahl_block_inValidationFailed: false,
			anzahl_block_inEdited: false,

			boolBlockpraef: boolpraef,
			praeferierte_block: pb,
			praeferierte_blockValidationFailed: false,
			praeferierte_blockEdited: false,

			bes_raum: br,
			bes_raumValidationFailed: false,
			bes_raumEdited: false,

			raum: rm,
			raumValidationFailed: false,
			raumEdited: false,

			sprache: sp,
			spracheValidationFailed: false,
			spracheEdited: false,

			dozent: dz,
			dozentValidationFailed: false,
			dozentEdited: false,

			aktueller_zustand: "Neu",

			halbjahr: hj,
			halbjahrEdited: false,

			art: pa,
			artEdited: false,

			anzahlTeilnehmer: at,
			anzahlTeilnehmerValidationFailed: false,
			anzahlTeilnehmerEdited: false,

			teilnehmerListe: tl,
			teilnehmerListeValidationFailed: false,
			teilnehmerListeEdited: false,

			addingInProgress: false,
			updatingInProgress: false,
			addingError: null,
			updatingError: null,

			modulwahl: [],
			moduleEdited: false,

			semester: [],
			projektarten: [],
			module: []
		};
		// State speichern falls cancel 
		this.baseState = this.state;
	}

	// Projekt hinzufugen
	addProjekt =  () => {
		let newProjekt = new ProjektBO(
			0,
			this.state.name,
			this.state.max_teilnehmer, 
			this.state.beschreibung, 
			this.state.betreuer, 
			this.state.externer_partner, 
			this.state.woechentlich,
			this.state.anzahl_block_vor,
			this.state.anzahl_block_in,
			this.state.praeferierte_block,
			this.state.bes_raum,
			this.state.raum,
			this.state.sprache,
			this.props.currentPerson.id,
			this.state.aktueller_zustand,
			this.state.halbjahr,
			this.state.art,
			this.state.anzahlTeilnehmer,
			this.state.teilnehmerListe,
			);
		ElectivAPI.getAPI().addProjekt(newProjekt).then(projekt => {
			this.props.getProjekte();
			ElectivAPI.getAPI().postProjekte_hat_module(projekt.id, JSON.stringify(this.state.modulwahl))}).then(projekt => {
			// Backend erfolgreich
			// reinitialisierung fuer ein neues leere Projekt
			this.setState(this.baseState);
			this.props.onClose(projekt); //Aufrufen parent in backend
		}).catch(e => 
			this.setState({
				updatingInProgress: false,
				updatingError: e
			})
			);
		// Ladeanimation einblenden
		this.setState({
			updatingInProgress: true,
			updatingError: null
		});
	}

	updateProjekt = () => {
		let projekt = this.props.projekt;
		projekt.setname(this.state.name);
		projekt.setmax_teilnehmer(this.state.max_teilnehmer);
		projekt.setbeschreibung(this.state.beschreibung);
		projekt.setbetreuer(this.state.betreuer );
		projekt.setexterner_partner(this.state.externer_partner);
		projekt.setwoechentlich(this.state.woechentlich);
		projekt.setanzahl_block_vor(this.state.anzahl_block_vor);
		projekt.setanzahl_block_in(this.state.anzahl_block_in);
		projekt.setpraeferierte_block(this.state.praeferierte_block);
		projekt.setbes_raum(this.state.bes_raum);
		projekt.setraum(this.state.raum);
		projekt.setsprache(this.state.sprache);
		projekt.setAktuellerZustand(this.state.aktueller_zustand);
		projekt.setHalbjahr(this.state.halbjahr);
		projekt.setArt(this.state.art);
		projekt.setAnzahlTeilnehmer(this.state.anzahlTeilnehmer);
		projekt.setTeilnehmerListe(this.state.teilnehmerListe);
		ElectivAPI.getAPI().updateProjekt(projekt).then(projekt => {
			this.props.getProjekte();
			ElectivAPI.getAPI().updateProjekte_hat_module(projekt.id, JSON.stringify(this.state.modulwahl))}).then(projekt => {
			// Backend erfolgreich
			// reinitialisierung fuer ein neues leere Projekt
			this.setState(this.baseState);
			this.props.onClose(projekt); //Aufrufen parent in backend
		}).catch(e => 
			this.setState({
				updatingInProgress: false,
				updatingError: e
			})
			);
		// Ladeanimation einblenden
		this.setState({
			updatingInProgress: true,
			updatingError: null
		});
	}

	getUpdateInfos = () => {
		let nm = this.props.projekt.getname();
		let mt = this.props.projekt.getmax_teilnehmer();
		let bs = this.props.projekt.getbeschreibung();
		let bt = this.props.projekt.getbetreuer();
		let ep = this.props.projekt.getexterner_partner();
		let wt = this.props.projekt.getwoechentlich();
		let av = this.props.projekt.getanzahl_block_vor();
		let ai = this.props.projekt.getanzahl_block_in();
		let pb = this.props.projekt.getpraeferierte_block();
		let br = this.props.projekt.getbes_raum();
		let rm = this.props.projekt.getraum();
		let sp = this.props.projekt.getsprache();
		let dz = this.props.projekt.getdozent();
		let at = this.props.projekt.getAnzahlTeilnehmer();
		let tl = this.props.projekt.getTeilnehmerListe();
		let hj = this.props.projekt.getHalbjahr();
		let pa = this.props.projekt.getArt();
		let boolvor = false;
		let boolin = false;
		let boolpraef = false;
		if(av !== null && av > 0){
			boolvor = true 
		}
		if(ai !== null && ai > 0){
			boolin = true 
		}
		if(pb !== null && pb !== ''){
			boolpraef = true 
		}
		this.setState({
			name: nm,
			max_teilnehmer: mt,
			beschreibung: bs,
			betreuer: bt,
			externer_partner: ep,
			woechentlich: wt,
			boolBlock_vor: boolvor,
			anzahl_block_vor: av,
			boolBlock_in: boolin,
			anzahl_block_in: ai,
			boolBlockpraef: boolpraef,
			praeferierte_block: pb,
			bes_raum: br,
			raum: rm,
			sprache: sp,
			dozent: dz,
			aktueller_zustand: "Neu",
			halbjahr: hj,
			art: pa,
			anzahlTeilnehmer: at,
			teilnehmerListe: tl,
		})
	}

	// ---------------------------------------------------------------
	//textFieldValueChange fehlt noch
	// ---------------------------------------------------------------

	// Validierung der Textfeldaenderungen 
	textFieldValueChange = (event) => {
		const value = event.target.value;

		let error = false;
		if (value.trim().length === 0) {
			error = true;
		}
		this.setState({
			[event.target.id]: event.target.value,
			[event.target.id + 'ValidationFailed']: error,
			[event.target.id + 'Edited']: true
		});
	}

	numberValueChange = (event) => {
		const value = event.target.value;
		const re = /^[0-9]{1,3}$/;

		let error = false;
		if (value.trim().length === 0) {
			error = true;
		}
		if (re.test(event.target.value) === false) {
			error = true;
		}

		this.setState({
			[event.target.id]: event.target.value,
			[event.target.id + 'ValidationFailed']: error,
			[event.target.id + 'Edited']: true
		});
	}

	checkboxValueChange = (event) => {
		this.setState({
			[event.target.id]: event.target.checked,
		});
	}

	radioValueChange = (event) => {
		this.setState({
			sprache: event.target.value,
		});
	}

	getSemester = () => {
		ElectivAPI.getAPI().getSemester()
		.then(semesterBOs =>
			this.setState({
				semester: semesterBOs,
				error: null,
				loadingInProgress: false,
			})).catch(e =>
				this.setState({
					semester: [],
					error: e,
					loadingInProgress: false,
				}));
		this.setState({
			error: null,
			loadingInProgress: true,
			loadingTeilnahmeError: null
		});
	}

	getProjektart = () => {
		ElectivAPI.getAPI().getProjektart().then(projektartBOs =>
		  this.setState({
			projektarten: projektartBOs
		  })).then(()=>{
			  console.log(this.state.projektarten)

		  }) 
			.catch(e => 
		this.setState({
		  projektarten: []
		}));
	  }


	// API Anbindung um alle Module vom Backend zu bekommen 
    getModule = () => {
      ElectivAPI.getAPI().getModule()
      .then(modulBOs =>
          this.setState({
              module: modulBOs,
              error: null,
              loadingInProgress: false,
          })).catch(e =>
              this.setState({
                  module: [],
                  error: e,
                  loadingInProgress: false,
              }));
      this.setState({
          error: null,
          loadingInProgress: true,
          loadingTeilnahmeError: null
      });
  }

	getModule_by_projekt_id = () => {
		ElectivAPI.getAPI().getModule_by_projekt_id(this.props.projekt.id)
		.then(modulBOs => {
			let modulIDs = [];
			modulBOs.forEach(modul=>{
				modulIDs.push(modul.id)
			})
			this.setState({
				modulwahl: modulIDs,
				error: null,
				loadingInProgress: false,
			})})
			.catch(e =>
				this.setState({
					modulwahl: null,
					error: e,
					loadingInProgress: false,
				}));
		this.setState({
			error: null,
			loadingInProgress: true
		});
	}

	handleSemesterChange = (semester) => {
		this.setState({
		  halbjahr: semester.target.value,
		  halbjahrEdited: true
		})
		setTimeout(() => {
			console.log('Ausgewählte Semester ID:',this.state.halbjahr)   
		  }, 0);
	  };

	handleArtChange = (projektart) => {
		this.setState({
			art: projektart.target.value,
			artEdited: true
		})
		setTimeout(() => {
			console.log('Ausgewählte Projektart ID:',this.state.art)
		  }, 0);
	  };
	
	handleModulChange = (event) => {
		this.setState({
			modulwahl: event.target.value,
			moduleEdited: true
		})
		setTimeout(() => {
			console.log('Ausgewählte ModulIDs:',this.state.modulwahl)
		  }, 0);
	}

	handleClose = () => {
		// State zurucksetzen
		this.setState(this.baseState);
		this.props.onClose(null);
	}

	getInfos = () => {
		this.getSemester();
		this.getProjektart();
		this.getModule();
		if (this.props.projekt) {
			this.getUpdateInfos();
			this.getModule_by_projekt_id();
		}
	}

	// Rendering

	render() {
		const { classes, projekt, show } = this.props;
		const {
			name,
			nameValidationFailed,
			nameEdited,

			max_teilnehmer,
			max_teilnehmerValidationFailed,
			max_teilnehmerEdited,

			beschreibung,
			beschreibungValidationFailed,
			beschreibungEdited,

			betreuer,
			betreuerValidationFailed,
			betreuerEdited,

			externer_partner,
			externer_partnerValidationFailed,
			externer_partnerEdited,

			woechentlich,
			woechentlichValidationFailed,
			woechentlichEdited,

			boolBlock_vor,
			anzahl_block_vor,
			anzahl_block_vorValidationFailed,
			anzahl_block_vorEdited,

			boolBlock_in,
			anzahl_block_in,
			anzahl_block_inValidationFailed,
			anzahl_block_inEdited,

			boolBlockpraef,
			praeferierte_block,
			praeferierte_blockValidationFailed,
			praeferierte_blockEdited,

			bes_raum,
			bes_raumValidationFailed,
			bes_raumEdited,

			raum,
			raumValidationFailed,
			raumEdited,

			sprache,
			spracheValidationFailed,
			spracheEdited,

			addingInProgress,
			updatingInProgress,
			addingError,
			updatingError,

			semester,
			halbjahr,
			halbjahrEdited,
			
			projektarten,
			art,
			artEdited,

			module,
			modulwahl,
			moduleEdited,

		} = this.state;
		let title = '';
		let header = '';

		if (projekt) {
			// Projekt objekt true, somit ein edit
			title = `Projekt "${projekt.name}" bearbeiten`;
			header = 'Projektdaten einfügen';
		} else {
			title = 'Erstelle ein neues Projekt';
			header = 'Projektdaten einfügen';
		}

		return (
      show ?
        <Dialog open={show} onEnter={this.getInfos} onClose={this.handleClose} maxWidth='sm'>
          <DialogTitle id='form-dialog-title'>{title}
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {header}
            </DialogContentText>
            <form className={classes.root} noValidate autoComplete='off'>
				<TextField autoFocus type='text' required fullWidth margin='small' id='name' label='Projektname' variant="outlined" value={name}
				onChange={this.textFieldValueChange} error={nameValidationFailed} 
				helperText={nameValidationFailed ? 'The name must contain at least one character' : ' '} />
				<TextField className={classes.max_teilnehmer} type='text' required margin='small' id='max_teilnehmer' label='Maximale Teilnehmeranzahl' variant="outlined" value={max_teilnehmer}
				onChange={this.numberValueChange} error={max_teilnehmerValidationFailed}
				helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
				
				<FormControl component="fieldset">
					<RadioGroup  row aria-label="position" value= {sprache} defaultValue="deutsch" onChange={this.radioValueChange}>
						<FormControlLabel
						value="deutsch" 
						control={<Radio color="primary" />}
						label="deutsch"
						labelPlacement="top"
						/>
						<FormControlLabel
						value="englisch"
						control={<Radio color="primary" />}
						label="englisch"
						labelPlacement="top"
						/>
					</RadioGroup>
				</FormControl>
				<br/>
				{
            	semester ?
				<FormControl required variant="outlined" className={classes.formControl}>
				<InputLabel>Semester</InputLabel> 
					<Select  value = {halbjahr} label="Semester" onChange={this.handleSemesterChange}>
					{
					semester.map(semester =>
					<MenuItem value={semester.getID()}><em>{semester.getname()}</em></MenuItem>
					)
					}
					</Select>                                                                
				</FormControl>                                  
				:
				<FormControl required variant="outlined" className={classes.formControl}>
				<InputLabel>Semester</InputLabel>
					<Select value="" label="Semester">
					<MenuItem value=""><em>Semester noch nicht geladen</em></MenuItem>
					</Select>
				</FormControl>
				}
				
				{
            	projektarten ?
				<FormControl required variant="outlined" className={classes.formControlpa}>
				<InputLabel>Projektart</InputLabel> 
					<Select  value = {art} label="Projektart" onChange={this.handleArtChange}>
					{
					projektarten.map(projektart =>
					<MenuItem value={projektart.getID()}><em>{projektart.getname()}</em></MenuItem>
					)
					}
					</Select>                                                                
				</FormControl>                                  
				:
				<FormControl required variant="outlined" className={classes.formControl}>
				<InputLabel>Projektart</InputLabel>
					<Select value={art} label="Projektart">
					<MenuItem value=""><em>Projektarten noch nicht geladen</em></MenuItem>
					</Select>
				</FormControl>
				}
				<br/>
				{
            	module ?
				<FormControl required variant="outlined" className={classes.formControlmo}>
				<InputLabel>Anrechenbare Module</InputLabel> 
					<Select 
					required
					value = {modulwahl} 
					multiple label="Anrechenbare Module" 
					onChange={this.handleModulChange}
					renderValue={(selected) => (
						<div className={classes.chips}>
						  {selected.map((value) => (
							<Chip key={value} label={module[value-1].name} className={classes.chip} />
						  ))}
						</div>
					  )}>
					{
					module.map(modul =>
						<MenuItem key={modul.getID()} value={modul.getID()}>
							<Checkbox checked={modulwahl.indexOf(modul.getID()) > -1} />
							<ListItemText>{modul.getname()} ({modul.getEdv_nr()})</ListItemText>
						</MenuItem>
					)
					}
					</Select>                                                                
				</FormControl>                                  
				:
				<FormControl required variant="outlined" className={classes.formControlmo}>
				<InputLabel>Anrechenbare Module</InputLabel> 
					<Select 
					value = ""
					multiple label="Anrechenbare Module">
						<MenuItem key="" value="">
							Module nicht geladen
						</MenuItem>
					</Select>                                                                
				</FormControl>
				}
				<br/>

				<FormGroup row>
				<FormControlLabel control={
					<Checkbox
						checked={woechentlich}
						onChange={this.checkboxValueChange}
						id="woechentlich"
						color="primary"
					/>
					}
					label="Wöchentliche Termine"
					labelPlacement="end"
				/>
				</FormGroup>
				<FormGroup row>
				<FormControlLabel control={
					<Checkbox
						checked={bes_raum}
						onChange={this.checkboxValueChange}
						id="bes_raum"
						color="primary"
					/>
					}
					label="Besonderer Raum notwendig"
					labelPlacement="end"
				/>
				</FormGroup>
				{ bes_raum === true || bes_raum === 1 ?
					<TextField type='text' required fullWidth margin='small' id='raum' label='Raum' variant="outlined" value={raum}
					onChange={this.textFieldValueChange} error={raumValidationFailed}
					helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
				:
				<></>
				}
				<FormGroup row>
				<FormControlLabel control={
					<Checkbox
						checked={boolBlock_vor}
						onChange={this.checkboxValueChange}
						id="boolBlock_vor"
						color="primary"
					/>
					}
					label="Blocktage vor Beginn der Vorlesungszeit"
					labelPlacement="end"
				/>
				</FormGroup>
				{ boolBlock_vor === true ?
					<TextField type='text' required fullWidth margin='small' id='anzahl_block_vor' label='Anzahl Blocktage'variant="outlined"  value={anzahl_block_vor}
					onChange={this.numberValueChange} error={anzahl_block_vorValidationFailed}
					helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
				:
				<></>
				}
				<FormGroup row>
				<FormControlLabel control={
					<Checkbox
						checked={boolBlock_in}
						onChange={this.checkboxValueChange}
						id="boolBlock_in"
						color="primary"
					/>
					}
					label="Blocktage in der Prüfungszeit"
					labelPlacement="end"
				/>
				</FormGroup>
				{ boolBlock_in === true ?
					<TextField type='text' required fullWidth margin='small' id='anzahl_block_in' label='Anzahl Blocktage'variant="outlined"  value={anzahl_block_in}
					onChange={this.numberValueChange} error={anzahl_block_inValidationFailed}
					helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
				:
				<></>
				}
				<FormGroup row>
				<FormControlLabel control={
					<Checkbox
						checked={boolBlockpraef}
						onChange={this.checkboxValueChange}
						id="boolBlockpraef"
						color="primary"
					/>
					}
					label="Blocktage (Samstage) in der Vorlesungszeit"
					labelPlacement="end"
				/>
				</FormGroup>
				{ boolBlockpraef === true ?
					<TextField type='text' required fullWidth margin='small' id='praeferierte_block' label='Präferierte Tage' variant="outlined" value={praeferierte_block}
					onChange={this.textFieldValueChange} error={praeferierte_blockValidationFailed}
					helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
				:
				<></>
				}
				<TextField type='text' fullWidth margin='small' id='betreuer' label='Betreuer' variant="outlined" value={betreuer}
				onChange={this.textFieldValueChange} error={betreuerValidationFailed}
				helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
				<TextField type='text' fullWidth margin='small' id='externer_partner' label='Externe Partner' variant="outlined" value={externer_partner}
				onChange={this.textFieldValueChange} error={externer_partnerValidationFailed}
				helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
				<TextField type='text' required fullWidth margin='small' id='beschreibung' label='Projektbeschreibung' multiline rows= {4} variant="outlined" value={beschreibung}
				onChange={this.textFieldValueChange} error={beschreibungValidationFailed}
				helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
            </form>
            <LoadingProgress show={addingInProgress || updatingInProgress} />
            {
              // Show error message in dependency of projekt prop
              projekt ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`The projekt ${projekt.getID()} could not be updated.`} onReload={this.updateProjekt} />
                :
                <ContextErrorMessage error={addingError} contextErrorMsg={`The Projekt could not be added.`} onReload={this.addProjekt} />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            {
              // If a Projekt is given, show an update button, else an add button
              projekt ?
                <Button disabled={nameValidationFailed || max_teilnehmerValidationFailed || beschreibungValidationFailed} variant='contained' onClick={this.updateProjekt} color='primary'>
                  Speichern
              </Button>
			: 
			<Button disabled={nameValidationFailed || !nameEdited || max_teilnehmerValidationFailed || !max_teilnehmerEdited || beschreibungValidationFailed || !beschreibungEdited ||!halbjahrEdited || !artEdited || !moduleEdited}  
				variant='contained' onClick={this.addProjekt} color='primary'>
                  Hinzufügen
             </Button>
            }
          </DialogActions>
        </Dialog>
        : null
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  max_teilnehmer: {
	  width: 250,
	  marginRight: theme.spacing(2)
  },
  formControl: {
	minWidth: 170,
	marginBottom: theme.spacing(1),
  },
  formControlpa: {
	minWidth: 240,
	marginBottom: theme.spacing(1),
	marginLeft: theme.spacing(3)
  },
  formControlmo: {
	width: 435,
	marginTop: theme.spacing(2),
	marginBottom: theme.spacing(2),
  },
  chips: {
	  display: 'flex',
	  flexWrap: 'wrap'
  },
  chip: {
	  margin: 2
  }
});



/** PropTypes */
ProjektForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ProjektBO's to be edited */
  projekt: PropTypes.object,
  /** If true, the form is rendered */
  show: PropTypes.bool.isRequired,
  /**  
   * Handler function which is called, when the dialog is closed.
   * Sends the edited or created projektBO's as parameter or null, if cancel was pressed.
   *  
   * Signature: onClose(ProjektBO's projekt);
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ProjektForm);
