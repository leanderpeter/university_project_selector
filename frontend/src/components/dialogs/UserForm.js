import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles, Button, IconButton, Dialog, DialogContent, DialogContentText,
    DialogTitle, DialogActions, TextField
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

import { ElectivAPI } from '../../api';

/**
 * Es wird ein Dialog mit einem Formular dargestellt, mit welchem man User bearbeiten kann
 *
 * @see See Matieral-UIs [Dialog] (https://material-ui.com/components/dialogs)
 *
 */
class UserForm extends Component {

    constructor(props) {
        super(props);

        //initiiere einen leeren state
        this.state = {
            name: '',
            nameValidationFailed: false,
            nameEdited: false,
            email: null,
            emailValidationFailed: false,
            emailEdited: false,
            addingError: null,
            addingInProgress: false,
            updatingError: null,
            updatingInProgress: false
        };
        this.baseState = this.state;
    }

    // API Anbindung um den User upzudaten
    updateUser = () => {
        let user = this.props.user;
        user.name = this.state.name
        user.email = this.state.email
        ElectivAPI.getAPI().updateUser(user.id, this.state.name, this.state.email).then(user => {
            this.setState(this.baseState);
            this.props.onClose(user); //Aufrufen parent in backend
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

    //Infos des zu bearbeitenden Studenten laden
    getInfos = () => {
        if (this.props.user) {
            let name = this.props.user.name;
            let email = this.props.user.email;
            this.setState({
                name: name,
                email: email,
            })
        }
    }

    //Setzen des Status, bei schließen des Dialogs
    handleClose = () => {
        this.setState(this.baseState);
        this.props.onClose(null);
    }


    render() {
        const { classes, show, user } = this.props;
        const {
            name,
            nameValidationFailed,
            email,
            emailValidationFailed,
            addingInProgress,
            updatingInProgress,
            updatingError,
        } = this.state;

        let title = `User "${user.name}" bearbeiten`
        let header = 'Neue Userdaten einfügen';

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

                            <TextField className={classes.textfield} autoFocus type='text' required fullWidth
                                margin='small' id='name' label='Name' variant="outlined" value={name}
                                onChange={this.textFieldValueChange} error={nameValidationFailed} />

                            <TextField className={classes.textfield} type='text' required fullWidth margin='small'
                                id='email' label='email' variant="outlined" value={email}
                                onChange={this.textFieldValueChange} error={emailValidationFailed} />
                        </form>
                        <LoadingProgress show={addingInProgress || updatingInProgress} />
                        {

                        <ContextErrorMessage error={updatingError}
                        contextErrorMsg={`The User ${user.getID()} could not be updated.`}
                        onReload={this.updateUser} />

                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='secondary'>
                            Abbrechen
                        </Button>
                        {
                            // If a Projekt is given, show an update button, else an add button
                            <Button disabled={nameValidationFailed || emailValidationFailed} variant='contained'
                                onClick={this.updateUser} color='primary'>
                                Speichern
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
UserForm.propTypes = {
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

export default withStyles(styles)(UserForm);