import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, IconButton, Dialog, DialogTitle, InputAdornment, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ClearIcon from '@material-ui/icons/Clear';
import { ElectivAPI } from '../../api';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import AddStudentEintrag from './AddStudentEintrag';

/**
 * Es wird ein Dialog ausgeführt, in dem alle Studenten angezeigt werden
 * 
 * @see See [AddStudentEintrag](#addstudenteintrag)
 * 
 * Dozent (oder Admin) kann nach einem bestimmten Studenten suchen  
 * Dozent (oder Admin) kann Studenten zu dem ausgewählten Projekt hinzufügen
 * 
 */


class AddStudent extends Component {

	constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            studenten: [],
            filteredStudenten: [],
            studentFilter: '',
            error: null,
            loadingInProgress: false,
        };
    }

    // API Anbindung um alle Studenten vom Backend zu bekommen 
    // Wenn ein Student (eine Teilnahme) schon an dem Projekt teilnimmt, wird diese nicht angezeigt
    getStudenten=()=>{
        ElectivAPI.getAPI().getStudenten()
        .then(studentBOs=>{
            var teilnahmeids = this.props.teilnahmen.map(teilnahme=>{
                return teilnahme.teilnehmer
            });
            studentenvar = studentBOs
            var a;
            for (a in teilnahmeids){
                var studentenids =  studentenvar.map(student=>{
                    return student.id
                });
                if (studentenids.indexOf(teilnahmeids[a] != -1)) {
                    studentenvar.splice(studentenids.indexOf(teilnahmeids[a]), 1)
                }
            }
        })
        .then(() =>     
            this.setState({
                studenten: studentenvar,
                filteredStudenten: [...studentenvar],
                error: null,
                loadingInProgress: false,
            })).catch(e =>
                this.setState({
                    student: [],
                    filteredStudenten: [],
                    error: e,
                    loadingInProgress: false,
                }));
            this.setState({
                error: null,
                loadingInProgress: true,
                loadingProjekteError: null
            });
      }

    //wird aufgerufen, wenn das Dialog geschlossen wird
    handleClose = () => {
		this.props.onClose(null);
    }

    //wird aufgerufen, wenn das Dialog geöffnet wird
    handleOpen = () => {
        this.getStudenten();
    }

    //Suche-Funktion zum Suchen nach Studentenname oder Matrikelnummer
    filterFieldValueChange= event => {
        const value = event.target.value.toLowerCase();
        this.setState({
            filteredStudenten: this.state.studenten.filter(student => {
                let nameContainsValue = student.getname().toLowerCase().includes(value);
                let mat_nrContainsValue = student.getmat_nr().toString().includes(value);
                return nameContainsValue || mat_nrContainsValue;
            }),
            studentFilter: value
        });
    }

    //Suche leeren
    clearFilterFieldButtonClicked = () => {
        this.setState({
            filteredStudenten: [...this.state.studenten],
            studentFilter: ''
        });
    }

    
    // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
    componentDidMount() {
      }
    
    /** Renders the component */
    render() {
		const { classes, show, currentProjekt } = this.props;
        const { filteredStudenten, studentFilter, error, loadingInProgress } = this.state;
        
        return (
            show ?
                <Dialog open={show} onEntered={this.handleOpen} onClose={this.handleClose} maxWidth='xs' fullWidth>
                    <DialogTitle className={classes.dialogtitle}>Student hinzufügen
                        <IconButton className={classes.closeButton} onClick={this.handleClose}>
                        <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <TextField
                        className={classes.filter}
                        id='studentFilter'
                        type='text'
                        label='Studenten suchen'
                        value={studentFilter}
                        onChange={this.filterFieldValueChange}
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>
                            <IconButton onClick={this.clearFilterFieldButtonClicked}>
                                <ClearIcon fontSize="small"/>
                            </IconButton>
                            </InputAdornment>,
                        }}
                    />
                            <List className={classes.root}>
                                  {
                                  filteredStudenten.map(student => 
                                    <AddStudentEintrag key={student.getID()} student = {student} currentProjekt={currentProjekt}
                                    show={this.props.show}
                                />)
                                  } 
                                <ListItem>
                                <LoadingProgress show={loadingInProgress} />
                                <ContextErrorMessage error={error} contextErrorMsg={`Studenten konnten nicht geladen werden.`} onReload={this.getStudenten} />
                                </ListItem>
                            </List>
                </Dialog>
            : null
        );
    }
}

var studentenvar;

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
    filter: {
        margin: theme.spacing(2),
        marginTop: 0,
        marginBottom: 0
    },
    dialogtitle: {
        paddingLeft: theme.spacing(2)
    }
  });
  
  /** PropTypes */
  AddStudent.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** If true, the form is rendered */
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  }
  
  export default withStyles(styles)(AddStudent);