import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';

import ListItem from '@material-ui/core/ListItem';
import {Typography, IconButton, Grid, Tooltip} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';


import StudentForm from './dialogs/StudentForm';

/**
 * Es wird ein einzelner Student angezeigt
 *
 * @see See [StudentForm](#studentform)
 *
 * Außerdem lassen sich Studenteneinträge bearbeiten
 *
 */
class StudentListeEintrag extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            showUserForm: false,
            error: null,
            loadingInProgress: false
        };
    }

    //Gibt den aktuellen User zurück
    getUser = () => {
        this.props.getUser();
    }

    //Wird aufgerufen, wenn der Button Bearbeiten geklickt wird
    bearbeitenButtonClicked = event => {
        event.stopPropagation();
        this.setState({
            showUserForm: true
        });
    }

    //Wird aufgerufen, wenn Speichern oder Abbrechen im Dialog gedrückt wird
    userFormClosed = (user) => {
        if (user) {
            this.setState({
                user: user,
                showUserForm: false
            });
        } else {
            this.setState({
                showUserForm: false
            });
        }
    }

    //Renders the component
    render() {
        const {classes, user} = this.props;
        const {showUserForm, error, loadingInProgress} = this.state;

        return (
            <div>
                <ListItem className={classes.root}>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                            <Typography>{user.mat_nr}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>{user.name}</Typography>
                        </Grid>
                        <Grid item xs/>
                        <Grid item>
                        </Grid>
                        <Tooltip title='Bearbeiten' placement="bottom">
                            <IconButton className={classes.bearbeitenButton} variant='contained'
                                        onClick={this.bearbeitenButtonClicked}>
                                <EditIcon/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </ListItem>
                <ListItem>
                    <LoadingProgress show={loadingInProgress}/>
                    <ContextErrorMessage error={error} contextErrorMsg={'Student konnte nicht geladen werden'}
                                         onReload={this.getUser}/>
                </ListItem>
                <Divider/>
                <StudentForm show={showUserForm} user={user} onClose={this.userFormClosed} getModule={this.getUser}/>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: '16px'
    },
});

/** PropTypes */
StudentListeEintrag.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired
}


export default withStyles(styles)(StudentListeEintrag);


