import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogContent, DialogContentText,
     DialogTitle, DialogActions, InputAdornment, Typography, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

import { ElectivAPI, SemesterBO } from '../../api';

/**
 * Es wird ein Dialog mit einem Formular dargestellt, mit welchem man Semester erstellen / bearbeiten kann 
 * 
 * @see See Material-UIs [Dialog](https://material-ui.com/components/dialogs)
 * 
 */

class SemesterForm extends Component {

	constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            name: '',
            nameValidationFailed: false,
            nameEdited: false,

            addingError: null,
            addingInProgress: false,

            updatingError: null,
            updatingInProgress: false
        };
        this.baseState = this.state;
    }

    // API Anbindung um das Semester über das Backend in die Datenbank einzufügen
    addSemester = () => {
        let newSemester = new SemesterBO()
        newSemester.setID(0)
        newSemester.setname(this.state.name)
        ElectivAPI.getAPI().addSemester(newSemester).then(semester => {
            this.props.getSemester()
            this.setState(this.baseState);
            this.props.onClose(semester); //Aufrufen parent in Backend
		}).catch(e => 
			this.setState({
				addingInProgress: false,
				addingError: e
			})
			);
		// Ladeanimation einblenden
		this.setState({
			addingProgress: true,
			addingError: null
		});
    }

    // API Anbindung um das Semester über das Backend in der Datenbank upzudaten
    updateSemester = () => {
        let semester = this.props.semester;
        semester.setname(this.state.name)
        ElectivAPI.getAPI().updateSemester(semester).then(semester => {
            this.props.getSemester()
            this.setState(this.baseState);
            this.props.onClose(semester); //Aufrufen parent in backend
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

    // Validierung der Textfeldaenderungen um einheitlicher Format des Semesters zu speichern
	textFieldValueChange = (event) => {
		const value = event.target.value;
        const re = /(^SS[0-9]{2}$)|(^WS[0-9]{2}\/[0-9]{2}$)/;

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
    
    //Infos das zu bearbeutenden Semester laden
    getInfos = () => {
        if (this.props.semester) {
            let name = this.props.semester.getname();
            this.setState({
                name: name,
            })
		}
    }

    //wird aufgerufen, wenn das Dialog geschlossen wird
    handleClose = () => {
		this.setState(this.baseState);
		this.props.onClose(null);
    }

    /** Renders the component */
    render() {
		const { classes, show, semester } = this.props;
        const {             
            name, 
            nameValidationFailed, 
            nameEdited, 

            addingInProgress,
            addingError, 
            updatingInProgress,
            updatingError,  } = this.state;
        
        let title = '';
		let header = '';

		if (semester) {
			// Semester objekt true, somit ein edit
			title = `Semester "${semester.name}" bearbeiten`;
			header = 'Bitte Format SS** oder WS**/** verwenden';
		} else {
			title = 'Neues Semester erstellen';
			header = 'Bitte Format SS** oder WS**/** verwenden';
		}

        return (
            show ?
                <Dialog open={show} onEnter={this.getInfos} onClose={this.handleClose} maxWidth='xs' fullWidth>
                    <DialogTitle className={classes.dialogtitle}>{title}
                        <IconButton className={classes.closeButton} onClick={this.handleClose}>
                        <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        {header}
                        </DialogContentText>

                        <form className={classes.root} noValidate autoComplete='off'>

                        <TextField className={classes.textfield} autoFocus type='text' required fullWidth margin='small' id='name' label='Semester' variant="outlined" value={name}
                        onChange={this.textFieldValueChange} error={nameValidationFailed}  />

                        </form>
                        <LoadingProgress show={addingInProgress || updatingInProgress} />
                        {
                        // Show error message in dependency of semester prop
                        semester ?
                            <ContextErrorMessage error={updatingError} contextErrorMsg={`Semester ${semester.getID()} could not be updated.`} onReload={this.updateSemester} />
                            :
                            <ContextErrorMessage error={addingError} contextErrorMsg={`The Semester could not be added.`} onReload={this.addSemester} />
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='secondary'>
                        Abbrechen
                        </Button>
                        {
                        // If a Semester is given, show an speichern (update) button, else an hinzufügen button
                        semester ?
                        <Button disabled={nameValidationFailed } variant='contained' onClick={this.updateSemester} color='primary'>
                            Speichern
                        </Button>
                        : 
                        <Button disabled={nameValidationFailed || !nameEdited }  
                            variant='contained' onClick={this.addSemester} color='primary'>
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
    textfield: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
  });
  
  /** PropTypes */
  SemesterForm.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** If true, the form is rendered */
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  }
  
  export default withStyles(styles)(SemesterForm);