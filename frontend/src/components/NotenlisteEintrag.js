import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ElectivAPI from '../api/ElectivAPI';
import { withStyles, makeStyles, createGenerateClassName } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import LoadingProgress from './dialogs/LoadingProgress';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import StudentBO from '../api/StudentBO';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.darkgrey,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
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

     //Student vom Backend abfragen
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

    componentDidMount() {
        this.getStudentByID();
        this.getBewertung();
        this.getProjekt();
    }

    render(){
        const {classes, expandedState, teilnahme} = this.props;
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
    /** Projekt to be rendered */
    teilnahme: PropTypes.object.isRequired,
    /** The state of this ProjektListeEintrag. If true the customer is shown with its accounts */
    expandedState: PropTypes.bool.isRequired,
    /** The handler responsible for handle expanded state changes (exanding/collapsing) of this ProjektListeEintrag 
     * 
     * Signature: onExpandedStateChange(CustomerBO customer)
     */
    onExpandedStateChange: PropTypes.func.isRequired,

    /** wenn true, dozent wird geladen */
    show: PropTypes.bool.isRequired
  }
  
  export default withStyles(styles)(NotenlisteEintrag);