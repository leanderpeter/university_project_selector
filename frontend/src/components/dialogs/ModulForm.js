import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogContent, DialogContentText,
     DialogTitle, DialogActions, InputAdornment, Typography, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';



class ModulForm extends Component {

	constructor(props) {
        super(props);
        this.state = {
            name: '',
            nameValidationFailed: false,
            nameEdited: false,

            edv_nr: null,
            edv_nrValidationFailed: false,
            edv_nrEdited: false,

            error: null,
            loadingInProgress: false,
        };
    }

    addModul = () => {

    }

    updateModul = () => {

    }

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
        const re = /^[0-9]{1,10}$/;

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


    handleClose = () => {
		this.props.onClose(null);
    }


    
    render() {
		const { classes, show } = this.props;
        const { modul, name, nameValidationFailed, nameEdited, edv_nr, edv_nrValidationFailed, edv_nrEdited, error, loadingInProgress  } = this.state;
        
        return (
            show ?
                <Dialog open={show} onClose={this.handleClose} maxWidth='xs' fullWidth>
                    <DialogTitle className={classes.dialogtitle}>Modul hinzufügen
                        <IconButton className={classes.closeButton} onClick={this.handleClose}>
                        <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        header
                        </DialogContentText>

                        <form className={classes.root} noValidate autoComplete='off'>

                        <TextField className={classes.textfield} autoFocus type='text' required fullWidth margin='small' id='name' label='Modulname' variant="outlined" value={name}
                        onChange={this.textFieldValueChange} error={nameValidationFailed}  />

                        <TextField className={classes.textfield} type='text' required fullWidth margin='small' id='edv_nr' label='EDV-Nummer' variant="outlined" value={edv_nr}
                        onChange={this.numberValueChange} error={edv_nrValidationFailed} />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='secondary'>
                        Abbrechen
                        </Button>
                        {
                        // If a Projekt is given, show an update button, else an add button
                        modul ?
                        <Button disabled={nameValidationFailed || edv_nrValidationFailed } variant='contained' onClick={this.updateModul} color='primary'>
                            Speichern
                        </Button>
                        : 
                        <Button disabled={nameValidationFailed || !nameEdited || edv_nrValidationFailed || !edv_nrEdited }  
                            variant='contained' onClick={this.addModul} color='primary'>
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
  ModulForm.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
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
  
  export default withStyles(styles)(ModulForm);