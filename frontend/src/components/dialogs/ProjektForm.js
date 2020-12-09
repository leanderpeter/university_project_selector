import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ElectivAPI, ProjektBO } from '../../api';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

/*
Dieses Form zeigt ein Dialog zum erstllen/updaten von ProjektBO's. Falls ein Projekt bereits besteht wird das Formular als edit konfiguireirt.
Falls das Projekt Objekt null ist wird das Formular zum erstellen eine PojektBO's konfiguriert.
Dafuer wird auf die API zugegriffen (Backend zugriff)
Funktion onClose erstellt/updated/abbruch des Prozesses.
*/

class ProjektForm extends Component {

	constructor(props) {
		super(props);

		let nm = '', mt = '', bs = '', bt = '', ep = '', wt = '', av = '', ai = '', pb = '', br = '', rm = '', sp = '', dz = '', at = '', tl = '';
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

			anzahl_block_vor: av,
			anzahl_block_vorValidationFailed: false,
			anzahl_block_vorEdited: false,

			anzahl_block_in: ai,
			anzahl_block_inValidationFailed: false,
			anzahl_block_inEdited: false,

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
	addProjekt = () => {
		let newProjekt = new ProjektBO(
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
			this.state.dozent,
			this.state.anzahlTeilnehmer,
			this.state.teilnehmerListe
			);
		ElectivAPI.getAPI().addProjekt(newProjekt).then(projekt => {
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

			anzahl_block_vor,
			anzahl_block_vorValidationFailed,
			anzahl_block_vorEdited,

			anzahl_block_in,
			anzahl_block_inValidationFailed,
			anzahl_block_inEdited,

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

			dozent,
			dozentValidationFailed,
			dozentEdited,

			anzahlTeilnehmer,
			anzahlTeilnehmerValidationFailed,
			anzahlTeilnehmerEdited,

			teilnehmerListe,
			teilnehmerListeValidationFailed,
			teilnehmerListeEdited,

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
        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
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
              <TextField autoFocus type='text' required fullWidth margin='normal' id='name' label='Projektname:' value={name} 
                onChange={this.textFieldValueChange} error={nameValidationFailed} 
                helperText={nameValidationFailed ? 'The name must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='max_teilnehmer' label='Maximale Teilnehmeranzahl:' value={max_teilnehmer}
                onChange={this.textFieldValueChange} error={max_teilnehmerValidationFailed}
                helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='beschreibung' label='Projektbeschreibung:' value={beschreibung}
                onChange={this.textFieldValueChange} error={max_teilnehmerValidationFailed}
                helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='betreuer' label='Betreuer:' value={betreuer}
                onChange={this.textFieldValueChange} error={max_teilnehmerValidationFailed}
                helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='externer_partner' label='Externe Partner:' value={externer_partner}
                onChange={this.textFieldValueChange} error={max_teilnehmerValidationFailed}
                helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='woechentlich' label='Woechentlich:' value={woechentlich}
                onChange={this.textFieldValueChange} error={max_teilnehmerValidationFailed}
                helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='anzahl_block_vor' label='anzahl_block_vor:' value={anzahl_block_vor}
                onChange={this.textFieldValueChange} error={max_teilnehmerValidationFailed}
                helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='anzahl_block_in' label='anzahl_block_in:' value={anzahl_block_in}
                onChange={this.textFieldValueChange} error={max_teilnehmerValidationFailed}
                helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='praeferierte_block' label='praeferierte_block:' value={praeferierte_block}
                onChange={this.textFieldValueChange} error={max_teilnehmerValidationFailed}
                helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='bes_raum' label='bes_raum:' value={bes_raum}
                onChange={this.textFieldValueChange} error={max_teilnehmerValidationFailed}
                helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='raum' label='raum:' value={raum}
                onChange={this.textFieldValueChange} error={max_teilnehmerValidationFailed}
                helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='sprache' label='sprache:' value={sprache}
                onChange={this.textFieldValueChange} error={max_teilnehmerValidationFailed}
                helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='dozent' label='dozent:' value={dozent}
                onChange={this.textFieldValueChange} error={max_teilnehmerValidationFailed}
                helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='anzahlTeilnehmer' label='anzahlTeilnehmer:' value={anzahlTeilnehmer}
                onChange={this.textFieldValueChange} error={max_teilnehmerValidationFailed}
                helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='teilnehmerListe' label='teilnehmerListe:' value={teilnehmerListe}
                onChange={this.textFieldValueChange} error={max_teilnehmerValidationFailed}
                helperText={nameValidationFailed ? 'The Teilnehmeranzahl must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='max_teilnehmer' label='Maximale Teilnehmeranzahl:' value={max_teilnehmer}
                onChange={this.textFieldValueChange} error={max_teilnehmerValidationFailed}
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
                : <Button disabled={nameValidationFailed || !nameEdited || max_teilnehmerValidationFailed || !max_teilnehmerEdited} variant='contained' onClick={this.addProjekt} color='primary'>
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
