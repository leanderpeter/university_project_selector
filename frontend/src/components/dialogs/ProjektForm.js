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


/*
Dieses Form zeigt ein Dialog zum erstllen/updaten von ProjektBO's. Falls ein Projekt bereits besteht wird das Formular als edit konfiguireirt.
Falls das Projekt Objekt null ist wird das Formular zum erstellen eine PojektBO's konfiguriert.
Dafuer wird auf die API zugegriffen (Backend zugriff)
Funktion onClose erstellt/updated/abbruch des Prozesses.
*/

class ProjektForm extends Component {

	constructor(props) {
		super(props);

		let nm = '', mt = '', bs = '', bt = '', ep = '',wt = false, av = 0, ai = 0, pb = '', br = false, rm = '', sp = 'deutsch', dz = '', at = '', tl = '';
		if (props.projekt) {
			nm = props.projekt.getname();
			mt = props.projekt.getmax_teilnehmer();
			bs = props.projekt.getbeschreibung();
			bt = props.projekt.getbetreuer();
			ep = props.projekt.getexterner_partner();
			wt = props.projekt.getwoechentlich();
			av = props.projekt.getanzahl_block_vor();
			ai = props.projekt.getanzahl_block_in();
			pb = props.projekt.getpraeferierte_block();
			br = props.projekt.getbes_raum();
			rm = props.projekt.getraum();
			sp = props.projekt.getsprache();
			dz = props.projekt.getdozent();
			at = props.projekt.getAnzahlTeilnehmer();
			tl = props.projekt.getTeilnehmerListe();
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

			boolBlock_vor: false,
			anzahl_block_vor: av,
			anzahl_block_vorValidationFailed: false,
			anzahl_block_vorEdited: false,

			boolBlock_in: false,
			anzahl_block_in: ai,
			anzahl_block_inValidationFailed: false,
			anzahl_block_inEdited: false,

			boolBlockpraef: false,
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
			dozentValidationFailed: false,
			dozentEdited: false,

			halbjahr: null,
			dozentValidationFailed: false,
			dozentEdited: false,

			art: null,
			dozentValidationFailed: false,
			dozentEdited: false,

			anzahlTeilnehmer: at,
			anzahlTeilnehmerValidationFailed: false,
			anzahlTeilnehmerEdited: false,

			teilnehmerListe: tl,
			teilnehmerListeValidationFailed: false,
			teilnehmerListeEdited: false,

			addingInProgress: false,
			updatingInProgress: false,
			addingError: null,
			updatingError: null
		};
		// State speichern falls cancel 
		this.baseState = this.state;
	}

	// Projekt hinzufugen
	addProjekt = async () => {
		let newProjekt = new ProjektBO(
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
			this.state.art,
			this.state.halbjahr,
			this.state.anzahlTeilnehmer,
			this.state.teilnehmerListe,
			this.state.name
			);
			newProjekt.setname(this.state.name);
		await ElectivAPI.getAPI().addProjekt(newProjekt).then(projekt => {
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
		this.props.getProjekte();
	}

	updateProjekt = () => {

	}

	// ---------------------------------------------------------------
	//update Projekt fehlt noch
	//textFieldValueChange fehlt noch
	// ---------------------------------------------------------------

	// Validierung der textfeldaenderungen 
	textFieldValueChange = (event) => {
		const value = event.target.value;

		let error = false;
		if (value.trim().lenght === 0) {
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
		if (value.trim().lenght === 0) {
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

	handleClose = () => {
		// State zurucksetzen
		this.setState(this.baseState);
		this.props.onClose(null);
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
			updatingError

		} = this.state;
		let title = '';
		let header = '';

		if (projekt) {
			// Projekt objekt true, somit ein edit
			title = 'Update Projekt';
			header = 'Projekt ID: hier muss dann die ID hin';
		} else {
			title = 'Erstelle ein neues Projekt';
			header = 'Projektdaten einfugen';
		}

		return (
      show ?
        <Dialog open={show} onClose={this.handleClose} maxWidth='sm'>
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
				<TextField autoFocus type='text' required fullWidth margin='small' id='name' label='Projektname:' variant="outlined" value={name}
				onChange={this.textFieldValueChange} error={nameValidationFailed} 
				helperText={nameValidationFailed ? 'The name must contain at least one character' : ' '} />
				<TextField type='text' required fullWidth margin='small' id='max_teilnehmer' label='Maximale Teilnehmeranzahl:' variant="outlined" value={max_teilnehmer}
				onChange={this.numberValueChange} error={max_teilnehmerValidationFailed}
				helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
				
				<FormControl component="fieldset">
					<RadioGroup  row aria-label="position" defaultValue="deutsch" onChange={this.radioValueChange}>
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
					labelPlacement="start"
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
					labelPlacement="start"
				/>
				</FormGroup>
				{ bes_raum === true ?
					<TextField type='text' required fullWidth margin='small' id='raum' label='raum:' variant="outlined" value={raum}
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
					labelPlacement="start"
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
					labelPlacement="start"
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
					labelPlacement="start"
				/>
				</FormGroup>
				{ boolBlockpraef === true ?
					<TextField type='text' required fullWidth margin='small' id='praeferierte_block' label='Präferierte Tage' variant="outlined" value={praeferierte_block}
					onChange={this.textFieldValueChange} error={praeferierte_blockValidationFailed}
					helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
				:
				<></>
				}
				<TextField type='text' fullWidth margin='small' id='betreuer' label='Betreuer:' variant="outlined" value={betreuer}
				onChange={this.textFieldValueChange} error={betreuerValidationFailed}
				helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
				<TextField type='text' fullWidth margin='small' id='externer_partner' label='Externe Partner:' variant="outlined" value={externer_partner}
				onChange={this.textFieldValueChange} error={externer_partnerValidationFailed}
				helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
				<TextField type='text' required fullWidth margin='small' id='beschreibung' label='Projektbeschreibung:' multiline rows= {4} variant="outlined" value={beschreibung}
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
              Cancel
            </Button>
            {
              // If a Projekt is given, show an update button, else an add button
              projekt ?
                <Button disabled={nameValidationFailed || max_teilnehmerValidationFailed} variant='contained' onClick={this.updateProjekt} color='primary'>
                  Update
              </Button>
				: <Button disabled={nameValidationFailed || !nameEdited || max_teilnehmerValidationFailed || !max_teilnehmerEdited || beschreibungValidationFailed || !beschreibungEdited}  
				variant='contained' onClick={this.addProjekt} color='primary'>
                  Add
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
