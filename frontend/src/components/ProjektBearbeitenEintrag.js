import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ElectivAPI from '../api/ElectivAPI';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LoadingProgress from './dialogs/LoadingProgress';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import TableFooter from '@material-ui/core/TableFooter';

//import Component
import ModulEintrag from './ModulEintrag';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

class ProjektBearbeitenEintrag extends Component {

    constructor(props){
        super(props);

        this.state = {
            modul: props.modul,
            teilnahmen : [],
            projekt: null,
            projektID: null,
            projektName: null,
            studentName: null,
            dozentName: null,
            note: null,
            loadingInProgress: false,
            error: null
        };
    }

  // Handles events wenn sich der status der oeffnung aendert
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.projekt);
    this.getTeilnahmen_by_projekt();
    console.log(this.props.projekt.getID(),'Projekt')
  }

  // Kummert sich um das close event vom ProjektForm
  projektFormClosed = (projekt) => {
    if ( projekt ) {
      this.setState({
        projekt: projekt,
        showProjektForm: false
      });
    }else {
      this.setState({
        showprojektForm: false
      });
    }
  }

    //Noch zu tun:  projektBO soll kein Array sein. Die 2 Funktionen sollen nacheinander aufgerufen werden
    
    getTeilnahmen_by_projekt = () => {
        ElectivAPI.getAPI().getTeilnahmen_by_projekt(this.props.projekt.getID())
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
    
    getProjekt = () => {
      ElectivAPI.getAPI().getProjekt(this.props.teilnahme.lehrangebot)
      .then(projektBO =>
          this.setState({
            projekt: projektBO[0],
            projektID: projektBO[0].id,
            projektName: projektBO[0].name,
            loadingInProgress: false,
            error: null,
          })).then(()=>{
            this.getPerson()
            this.getBewertung()
            this.getStudent()
          })
          .catch(e =>
              this.setState({
                projekt: null,
                projektID: null,
                projektName: null,
                loadingInProgress: false,
                error: e,
              }));
      this.setState({
        loadingInProgress: true,
        error: null
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

    getStudent = () => {
      ElectivAPI.getAPI().getStudent(this.state.teilnahme.teilnehmer)
      .then(studentBO =>
          this.setState({
              studentName: studentBO.getname(),
              error: null,
              loadingInProgress: false,
          }))
          .catch(e =>
              this.setState({
                  studentName: null,
                  error: null,
                  loadingInProgress: false,
              }));
      this.setState({
          error: null,
          loadingInProgress: true
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
      this.getProjekt();
    }

    componentDidUpdate(prevProps){
      if((this.props.show) && (this.props.show !== prevProps.show)) {
        this.getProjekt();
      }
    }


    render(){
        const {classes, expandedState} = this.props;
        const {  projekt, projektID, projektName, studentName, dozentName, note, loadingInProgress, error } = this.state;

        return(
              <StyledTableRow key={projektID}>
                <StyledTableCell component="th" scope="row">{studentName}</StyledTableCell>
                <StyledTableCell align="center">{dozentName}</StyledTableCell> 
                <StyledTableCell align="center">{note}</StyledTableCell> 
                <StyledTableCell align="center"><Button style={{backgroundColor:"lightblue", display:"flex",margin:"auto"}} variant="contained" >entfernen</Button>
                              
                    
                </StyledTableCell>
                  <LoadingProgress show={loadingInProgress}></LoadingProgress>
                  <ContextErrorMessage error={error} contextErrorMsg = {'Dieses Projekt konnte nicht geladen werden'} onReload={this.getPerson} />
              </StyledTableRow>
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
    content: {
        margin: theme.spacing(1),
      },
    table: {
        minWidth: 700,
      },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    button: {
        margin: theme.spacing(1),
        },
    });

/** PropTypes */
ProjektBearbeitenEintrag.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** Projekt to be rendered */
    projekt: PropTypes.object.isRequired,
    /** The state of this ProjektListeEintrag. If true the customer is shown with its accounts */
    expandedState: PropTypes.bool.isRequired,
    /** The handler responsible for handle expanded state changes (exanding/collapsing) of this ProjektListeEintrag 
     * 
     * Signature: onExpandedStateChange(CustomerBO customer)
     */
    onExpandedStateChange: PropTypes.func.isRequired,

    /** 
     *  Event Handler function which is called after a sucessfull delete of this customer.
     * 
     * Signature: onCustomerDelete(CustomerBO customer)
     */
    onCustomerDeleted: PropTypes.func.isRequired,
    /** wenn true, dozent wird geladen */
    show: PropTypes.bool.isRequired
  }
  


export default withStyles(styles)(ProjektBearbeitenEintrag);


