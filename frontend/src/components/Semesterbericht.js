import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ElectivAPI from '../api/ElectivAPI';
import { withStyles, Button, Typography, Grid, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import SaveIcon from '@material-ui/icons/Save';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import SemesterberichtEintrag from './SemesterberichtEintrag';

/**
 * Es werden alle Projekte des aktuell eingeloggten Studenten nach dem ausgewählten Semester angezeigt
 * 
 * @see See [SemesterberichtEintrag](#semesterberichteintrag)
 * 
 * Hierfür werden alle Teilnahmen des aktuell eingeloggten Student eines bestimmten Semesters geladen 
 * und in die Componente MeineProjekteEintrag gemappt
 * 
 */


//Css Style für Tabellen Zellen
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);


//Css Style für Tabllen Zeilen
const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(4n+1)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);


class Semesterbericht extends Component {

    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {
            teilnahmen : [],
            semester: [],
            semesterwahl: null,
            currentStudentName: null,
            currentStudentmat_nr: null,
            error: null,
            loadingInProgress: false, 
        };
    }


    // API Anbindung um Teilnahmen des Students vom Backend zu bekommen 
    getTeilnahmen = () => {
            ElectivAPI.getAPI().getTeilnahmenBySemester(this.props.currentStudent.id, this.state.semesterwahl)
            .then(teilnahmeBOs =>
                this.setState({
                    teilnahmen: teilnahmeBOs,
                    error: null,
                    loadingInProgress: false,
                })).catch(e =>
                    this.setState({
                        teilnahmen: [],
                        error: e,
                        loadingInProgress: false,
                    }));
            this.setState({
                error: null,
                loadingInProgress: true,
                loadingTeilnahmeError: null
            });
    }

    // API Anbindung um alle Semester vom Backend zu bekommen 
    getSemesterOfStudent = () => {
        ElectivAPI.getAPI().getSemesterOfStudent(this.props.currentStudent.id)
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

  //bei Änderung des Semester Dropdown Menüs wird das ausgewählte Semester im State als semesterwahl gesetzt
  semesterChange = (semester) => {
    this.setState({
      semesterwahl: semester.target.value,
    })
    setTimeout(() => {
    //console.log('Ausgewählte Semester ID:',this.state.semesterwahl)   
    this.getTeilnahmen();
    }, 0);
  };

    // Funktion, die einen Print-Befehl ausführt
    printSemesterbericht= () => {
      window.print()
    }

    // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
    componentDidMount() {
        this.getSemesterOfStudent();
        this.setState({
            currentStudentName: this.props.currentStudent.getname(),
            currentStudentmat_nr: this.props.currentStudent.getmat_nr(),
        })
    }
    
    render(){

        const { classes } = this.props;
        const {  semesterwahl, teilnahmen, semester, currentStudentName, currentStudentmat_nr, error, loadingInProgress} = this.state;
        
        return(
            <div className={classes.root}>
                <Grid container className={classes.header} justify="center" alignItems="center" spacing={2}>
                    <Grid item>
                    { semester ?
                        <FormControl className={classes.formControl}>
                        <InputLabel>Semester</InputLabel> 
                            <Select value={semesterwahl} onChange={this.semesterChange}>
                            {
                            semester.map(semester =>
                            <MenuItem value={semester.getID()}><em>{semester.getname()}</em></MenuItem>
                            )
                            }
                            </Select>                                                                
                        </FormControl>                                  
                        :
                        <FormControl className={classes.formControl}>
                        <InputLabel>Semester</InputLabel>
                            <Select value="">
                            <MenuItem value=""><em>Semester noch nicht geladen</em></MenuItem>
                            </Select>
                        </FormControl>
                    }
                    </Grid>
                    <Grid item xs/>
                    <Grid item>
                        <Button variant="outlined" color="primary" disableRipple 
                        style={{ backgroundColor: 'transparent', textTransform: 'None'}}
                        >Name: {currentStudentName}<br/>Matrikelnummer: {currentStudentmat_nr}</Button>
                    </Grid>
                </Grid>
                { semesterwahl ? 
                <>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Projekt</StyledTableCell>                                
                                <StyledTableCell align="center">Dozent</StyledTableCell>
                                <StyledTableCell align="center">ECTS</StyledTableCell>
                                <StyledTableCell align="center">Note</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {
                                teilnahmen ?
                                <>
                                {
                                    teilnahmen.map(teilnahme => 
                                        <SemesterberichtEintrag key={teilnahme.getID()} teilnahme = {teilnahme} 
                                        getTeilnahmen = {this.getTeilnahmen}
                                        show={this.props.show}
                                    />) 
                                }
                                </>
                                :
                                <></>
                            }
                        </TableBody>
                    </Table>
                    <LoadingProgress show={loadingInProgress} />
                    <ContextErrorMessage error={error} contextErrorMsg = {'Deine Projekte konnten nicht geladen werden'} onReload={this.getTeilnahmen} /> 
                </TableContainer>
                <Button variant="contained" color="primary" size="medium" className={classes.button} startIcon={<SaveIcon />} onClick={this.printSemesterbericht}>
                Semesterbericht
                </Button> 
                </>
                :
                <>
                <Typography className={classes.warnung}> Bitte wählen Sie zunächst ein Semester aus</Typography>
                <LoadingProgress show={loadingInProgress} />
                <ContextErrorMessage error={error} contextErrorMsg={`Semester konnten nicht geladen werden`} onReload={this.getSemesterOfStudent}/>
                </>
                }            
            </div>
        )
    }
}

/** Component specific styles */
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
      },
      table: {
        minWidth: 700,
      },
      header:{
        marginBottom: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
      },
      button:{
          marginTop: theme.spacing(2),
          marginBottom: theme.spacing(3),
          float: 'right'
      },
      formControl: {
          minWidth: 120,
          marginBottom: theme.spacing(2),
      },
      warnung: {
        color: theme.palette.secondary.main,
        paddingLeft: theme.spacing(1)
      }
  });

/** PropTypes */
Semesterbericht.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** @ignore */
    location: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired
}



export default withRouter(withStyles(styles)(Semesterbericht));



