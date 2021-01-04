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
import StudentBO from '../api/StudentBO'

import ProjektBearbeiten from './ProjektBearbeiten';


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
            teilnahmen : [],
            bewertungen: [],
            studentID: null,
            studentName: null,
            mat_nr: null,
            note: null,
            loadingInProgress: false,
            error: null
        };
    }

  
    teilnahmeAbwaehlenButtonClicked = event => {
      //Logik fuer Teilnahme abwaehlen Button
      this.setState({teilnahmeAbwaehlenButtonDisabled:true});
      ElectivAPI.getAPI().deleteTeilnahme(this.props.teilnahme.lehrangebot, this.state.studentID).then(()=>this.props.reloadteilnahmen(this.props.teilnahme.lehrangebot));
      
    }
    
    getStudentById = () => {
        ElectivAPI.getAPI().getStudentById(this.props.teilnahme.getteilnehmer())
        .then(studentBO =>
            this.setState({
              studentID: studentBO.getID(),
              studentName: studentBO.getname(),
              mat_nr:studentBO.getmat_nr(),
              loadingInProgress: false,
              error: null,
            })).then(()=>{
              
            })
            .catch(e =>
                this.setState({
                  student: null,
                  studentID: null,
                  studentName: null,
                  loadingInProgress: false,
                  error: e,
                }));
        this.setState({
          loadingInProgress: true,
          error: null
        });
      }

    getBewertungen=()=>{
      ElectivAPI.getAPI().getBewertungen()
      .then(bewertungBOs =>
        this.setState({
            bewertungen: bewertungBOs,
            error: null,
            loadingInProgress: false,
        })).catch(e =>
            this.setState({
                bewertung: [],
                error: e,
                loadingInProgress: false,
            }));
      this.setState({
          error: null,
          loadingInProgress: true,
          loadingProjekteError: null
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

    

    
    

    

    componentDidMount() {
      this.getStudentById();
      this.getBewertung();
      this.getBewertungen();
      
    }

    


    render(){
        const {classes, expandedState} = this.props;
        const {bewertungen,studentID,studentName, mat_nr, note,  loadingInProgress, error } = this.state;

        return(
              <StyledTableRow >
                <StyledTableCell component="th" scope="row">{studentName}</StyledTableCell>
                <StyledTableCell align="center">{mat_nr} hallo</StyledTableCell> 
                <StyledTableCell align="center">
                <InputLabel>{note}</InputLabel>
                <Select   style={{display:"flex", minWidth:"5rem",paddingRight:"10px", paddingLeft:"10px",}} value={note }  >
                  {
                  bewertungen.map(bewertung =>
                  <MenuItem value={bewertung.getID()}><em>{bewertung.getnote()}</em></MenuItem>
                  )
                  }
                </Select>          
                </StyledTableCell> 
                <StyledTableCell align="center">
                  <Button className={classes.teilnahmeAbwaehlenButton} style={{backgroundColor:"lightblue", display:"flex",margin:"auto"}} variant="contained" onClick={this.teilnahmeAbwaehlenButtonClicked}>entfernen</Button>
                           
                    
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


