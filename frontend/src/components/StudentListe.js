import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {ElectivAPI} from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import {withStyles, IconButton, InputAdornment, TextField, Paper, Grid} from '@material-ui/core';
import LoadingProgress from './dialogs/LoadingProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ClearIcon from '@material-ui/icons/Clear';

import StudentListeEintrag from './StudentListeEintrag';

class StudentListe extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            user: [],
            filteredUser: [],
            userFilter: '',
            showDeleteForm: false,
            error: null,
            loadingInProgress: false,
        };
    }


    // API Anbindung um alle Module vom Backend zu bekommen
    getUser = () => {
        ElectivAPI.getAPI().getStudenten()
            .then(userBOs =>
                this.setState({
                    user: userBOs,
                    filteredUser: [...userBOs],
                    error: null,
                    loadingInProgress: false,
                })).catch(e =>
            this.setState({
                user: [],
                filteredUser: [],
                error: e,
                loadingInProgress: false,
            }));
        this.setState({
            error: null,
            loadingInProgress: true,
        });
    }

    //Suche leeren
    clearFilterFieldButtonClicked = () => {
        this.setState({
            filteredSemester: [...this.state.semester],
            semesterFilter: ''
        });
    }

    //Suche-Funktion zum Suchen von Semester
    filterFieldValueChange = event => {
        const value = event.target.value.toLowerCase();
        this.setState({
            filteredUser: this.state.user.filter(user => {
                return user.getname().toLowerCase().includes(value);
            }),
            userFilter: value
        });
    }


    // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
    componentDidMount() {
        this.getUser();
    }


    /** Renders the component */
    render() {
        const {classes} = this.props;
        const {loadingInProgress, error, filteredUser, userFilter} = this.state;

        return (
            <div className={classes.root}>
                <Grid container spacing={2} alignItems="center">

                    <Grid item>
                        <TextField
                            className={classes.filter}
                            type='text'
                            label='User suchen'
                            value={userFilter}
                            onChange={this.filterFieldValueChange}
                            InputProps={{
                                endAdornment: <InputAdornment position='end'>
                                    <IconButton onClick={this.clearFilterFieldButtonClicked}>
                                        <ClearIcon fontSize="small"/>
                                    </IconButton>
                                </InputAdornment>,
                            }}
                        />
                    </Grid>
                </Grid>
                <Paper>
                    <List className={classes.root} dense>
                        {
                            filteredUser.map(user =>
                                <StudentListeEintrag key={user.getID()} user={user} show={this.props.show}
                                                     getUser={this.getUser}/>)
                        }
                        <ListItem>
                            <LoadingProgress show={loadingInProgress}/>
                            <ContextErrorMessage error={error}
                                                 contextErrorMsg={`Studentliste konnte nicht geladen werden.`}
                                                 onReload={null}/>
                        </ListItem>
                    </List>
                    <LoadingProgress show={loadingInProgress}/>
                    <ContextErrorMessage error={error} contextErrorMsg={`Die Seite konnte nicht geladen werden.`}/>
                </Paper>

            </div>
        );
    }
}

/** Component specific styles */
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2),
        paddingTop: '4px'
    },
    addButton: {
        marginRight: theme.spacing(2)
    },
    filter: {
        marginLeft: theme.spacing(2)
    }
});

/** PropTypes */
StudentListe.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** @ignore */
    location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(StudentListe));

