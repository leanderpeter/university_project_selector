import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles, Button, IconButton, Dialog, DialogContent, DialogContentText,
    DialogTitle, DialogActions, TextField
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

import { ElectivAPI, ModulBO } from '../../api';

/**
 * Es wird ein Dialog mit einem Formular dargestellt, mit welchem man Module erstellen und bearbeiten kann
 * 
 * @see See Matieral-UIs [Dialog] (https://material-ui.com/components/dialogs)
 * 
 */

class ModulForm extends Component {

    constructor(props) {
        super(props);

        //initiiere einen leeren state
        this.state = {
            name: '',
            nameValidationFailed: false,
            nameEdited: false,

            edv_nr: null,
            edv_nrValidationFailed: false,
            edv_nrEdited: false,

            addingError: null,
            addingInProgress: false,

            updatingError: null,
            updatingInProgress: false
        };
        this.baseState = this.state;
    }

    // API Anbindung um das Modul über das Backend in die Datenbank einzufügen
    addModul = () => {
        let newModul = new ModulBO()
        newModul.setID(0)
        newModul.setname(this.state.name)
        newModul.setEdv_nr(this.state.edv_nr)
        ElectivAPI.getAPI().addModul(newModul).then(modul => {
            this.props.getModule()
            this.setState(this.baseState);
            this.props.onClose(modul); //Aufrufen parent in backend
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

    // API Anbindung um das Modul über das Backend in die Datenbank upzudaten
    updateModul = () => {
        let modul = this.props.modul;
        modul.setname(this.state.name)
        modul.setEdv_nr(this.state.edv_nr)
        ElectivAPI.getAPI().updateModul(modul).then(modul => {
            this.props.getModule()
            this.setState(this.baseState);
            this.props.onClose(modul); //Aufrufen parent in backend
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

    // Validierung der Textfeldaenderungen nur numerische Werte
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

    //Infos des zu bearbeitenden Moduls laden
    getInfos = () => {
        if (this.props.modul) {
            let name = this.props.modul.getname();
            let edv_nr = this.props.modul.getEdv_nr();
            this.setState({
                name: name,
                edv_nr: edv_nr,
            })
        }
    }

    //Wenn das Dialog geschlossen wird
    handleClose = () => {
        this.setState(this.baseState);
        this.props.onClose(null);
    }


    /** Rendert die Komponente */
    render() {
        const { classes, show, modul } = this.props;
        const {
            name,
            nameValidationFailed,
            nameEdited,

            edv_nr,
            edv_nrValidationFailed,
            edv_nrEdited,

            addingInProgress,
            addingError,
            updatingInProgress,
            updatingError, } = this.state;

        let title = '';
        let header = '';

        if (modul) {
            // Modul objekt true, somit ein edit
            title = `Modul "${modul.name}" bearbeiten`;
            header = 'Neue Moduldaten einfügen';
        } else {
            title = 'Erstelle ein neues Modul';
            header = 'Moduldaten einfügen';
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

                            <TextField className={classes.textfield} autoFocus type='text' required fullWidth margin='small' id='name' label='Modulname' variant="outlined" value={name}
                                onChange={this.textFieldValueChange} error={nameValidationFailed} />

                            <TextField className={classes.textfield} type='text' required fullWidth margin='small' id='edv_nr' label='EDV-Nummer' variant="outlined" value={edv_nr}
                                onChange={this.numberValueChange} error={edv_nrValidationFailed} />
                        </form>
                        <LoadingProgress show={addingInProgress || updatingInProgress} />
                        {
                            // Show error message in dependency of modul prop
                            modul ?
                                <ContextErrorMessage error={updatingError} contextErrorMsg={`The Modul ${modul.getID()} could not be updated.`} onReload={this.updateModul} />
                                :
                                <ContextErrorMessage error={addingError} contextErrorMsg={`The Modul could not be added.`} onReload={this.addModul} />
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='secondary'>
                            Abbrechen
                        </Button>
                        {
                            // If a Modul is given, show an  (update) button, else an hinzufügen (add) button
                            modul ?
                                <Button disabled={nameValidationFailed || edv_nrValidationFailed} variant='contained' onClick={this.updateModul} color='primary'>
                                    Speichern
                        </Button>
                                :
                                <Button disabled={nameValidationFailed || !nameEdited || edv_nrValidationFailed || !edv_nrEdited}
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
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ModulForm);