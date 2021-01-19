import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ElectivAPI from '../api/ElectivAPI';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import LoadingProgress from './dialogs/LoadingProgress';
import ContextErrorMessage from './dialogs/ContextErrorMessage';


/**
 * Die einzelne Teilnahme inklusive aller für den Administrator relevanten Informationen werden dargestellt
 * 
 * Hierfür werden der Student inklusive Matrikelnummer, der Dozent sowie die Note angezeigt
 */

//Css Style für Tabellen Zellen
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.darkgrey,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

//Css Style für Tabellen Zeilen  
const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(4n+1)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

class NotenlisteEintrag extends Component {

    constructor(props){
        super(props);

        //initiiere einen leeren state
        this.state = {
            studentName: null,
            mat_nr: null,
            note: null,
            projekt: null,
            dozentName: null,
            loadingInProgress: false,
            error: null
        };
    }

     // API Anbindung um den Student der Teilnahme vom Backend zu bekommen 
     getStudentByID = () => {
      ElectivAPI.getAPI().getStudentByID(this.props.teilnahme.teilnehmer)
          .then(studentBO =>
              this.setState({
                  studentName: studentBO.getname(),
                  mat_nr: studentBO.getmat_nr(),
                  error: null,
                  loadingInProgress: false,
              })
              ).catch(e =>
                  this.setState({
                      studentName: null,
                      mat_nr: null,
                      error: e,
                      loadingInProgress: false,
                  }));
          this.setState({
              error: null,
              loadingInProgress: true
          });
      }  
  
    // API Anbindung um die Bewertung der Teilnahme vom Backend zu bekommen 
    getBewertung = () => {
      ElectivAPI.getAPI().getBewertung(this.props.teilnahme.resultat)
      .then(bewertungBO =>
          this.setState({
              note: bewertungBO.getnote(),
              error: null,
              loadingInProgress: false,
          }))
          .catch(e =>
              this.setState({
                  note: null,
                  error: null,
                  loadingInProgress: false,
              }));
      this.setState({
          error: null,
          loadingInProgress: true
      });
    }

    // API Anbindung um das Projekt der Teilnahme vom Backend zu bekommen 
    getProjekt = () => {
      ElectivAPI.getAPI().getProjekt(this.props.teilnahme.lehrangebot)
      .then(projektBO =>
          this.setState({
            projekt: projektBO,
            loadingInProgress: false,
            error: null,
          })).then(()=>{
            this.getPerson()
          })
          .catch(e =>
              this.setState({
                projekt: null,
                loadingInProgress: false,
                error: e,
              }));
      this.setState({
        loadingInProgress: true,
        error: null
      });
    }

    // API Anbindung um den Dozent des Projekts der Teilnahme vom Backend zu bekommen 
    getPerson = () => {
      ElectivAPI.getAPI().getPerson(this.state.projekt.dozent)
      .then(personBO =>
          this.setState({
              dozentName: personBO.getname(),
              error: null,
              loadingInProgress: false,
          }))
          .catch(e =>
              this.setState({
                  dozentName: null,
                  error: e,
                  loadingInProgress: false,
              }));
      this.setState({
          error: null,
          loadingInProgress: true
      });
    }

    // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
    componentDidMount() {
        this.getStudentByID();
        this.getBewertung();
        this.getProjekt();
    }

    /** Rendert die Komponente */
    render(){
        const { classes } = this.props;
        const { studentName, mat_nr, note, dozentName, loadingInProgress, error } = this.state;
        
        return(
          <>
              <StyledTableRow key={this.props.teilnahme.id}>
                <StyledTableCell component="th" scope="row">{studentName}</StyledTableCell>
                <StyledTableCell align="left">{mat_nr}</StyledTableCell> 
                <StyledTableCell align="left">{dozentName}</StyledTableCell>
                <StyledTableCell align="center">{note}</StyledTableCell> 
              </StyledTableRow>
              <StyledTableRow> 
                  <StyledTableCell colspan="10" className={classes.laden}>
                      <LoadingProgress show={loadingInProgress}></LoadingProgress>
                      <ContextErrorMessage error={error} contextErrorMsg = {'Diese Teilnahme konnte nicht geladen werden'} onReload={this.getProjekt} />
                  </StyledTableCell>
              </StyledTableRow>
          </>
        );
    }
}

/** Component specific styles */
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(1),
    },
    table: {
        minWidth: 700,
      },
    laden: {
        padding: 0
      }
    });

/** PropTypes */
NotenlisteEintrag.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    teilnahme: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired
  }
  
  export default withStyles(styles)(NotenlisteEintrag);