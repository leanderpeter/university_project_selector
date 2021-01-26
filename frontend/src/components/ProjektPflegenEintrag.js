import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ElectivAPI from '../api/ElectivAPI';
import { withStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LoadingProgress from './dialogs/LoadingProgress';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


/**
 * Rendert die Einträge der Projekte (vom Studenten den Namen, die Matrikelnummer, die Note).
 * Die Teilnahme eines Studenten kann bei einem aktuellen Projekt entfernt werden.
 * Bei einem abgeschlossenen Projekt kann die Teilnahme eines Studenten nicht mehr entfernt werden.
 * Die Note kann trotzdem weiterhin nachbearbeitet werden.
 * 
 * 
 */

//Css Style für die Tabellen Zellen
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

//Css Style für die Tabellen Zeilen
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(4n+1)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

class ProjektPflegenEintrag extends Component {

    constructor(props){
        super(props);

        // Initiert den state
        this.state = {
            teilnahmen : [],
            bewertungen: [],
            studentID: null,
            studentName: null,
            mat_nr: null,
            note: [],
            loadingInProgress: false,
            error: null
        };
    }

    //Button um die Teilnahme eines Studenten zu entfernen
    teilnahmeAbwaehlenButtonClicked = event => {
      //Logik fuer Teilnahme abwaehlen Button
      this.setState({teilnahmeAbwaehlenButtonDisabled:true});
      ElectivAPI.getAPI().deleteTeilnahme(this.props.teilnahme.lehrangebot, this.state.studentID).then(()=>this.props.reloadteilnahmen(this.props.teilnahme.lehrangebot));
      
    }
    
    // API Anbindung teilnehmenden Studenten des Projekts nach der StudentenID vom Backend zu bekommen 
    getStudentByID = () => {
        ElectivAPI.getAPI().getStudentByID(this.props.teilnahme.getteilnehmer())
        .then(studentBO =>
            this.setState({                       //neuer status wenn fetch komplett
              studentID: studentBO.getID(),
              studentName: studentBO.getname(),
              mat_nr:studentBO.getmat_nr(),
              loadingInProgress: false,           // deaktiviere ladeindikator
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

    // API Anbindung um die möglichen Bewertungen vom Backende zu erhalten 
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
    
    // API Anbindung um die Bewertung des Students vom Backend zu bekommen
    getBewertung = () => {
        ElectivAPI.getAPI().getBewertung(this.props.teilnahme.resultat)
        .then(bewertungBO =>
            this.setState({
                note: bewertungBO.getID(),
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

    
    //Bei Änderung der Bewertung in der Select Komponente wird die Bewertung im Backend geändert
    handleChange = async (resultat) => { 
              this.props.teilnahme.setResultat(resultat.target.value); 
              this.setState({
                note: resultat.target.value
              })               
              await ElectivAPI.getAPI().updateTeilnahme(this.props.teilnahme)
              //this.getBewertung()
    };

    /** Lifecycle Methode, die bei dem Einfügen der Komponente in den Browser DOM aufgerufen wird*/
    componentDidMount() {
      this.getStudentByID();
      this.getBewertung();
      this.getBewertungen();
    }

    /** Rendert die Komponente*/
    render(){
        const {classes,currentProjektBO} = this.props;
        const {bewertungen, studentName, mat_nr, note,  loadingInProgress, error } = this.state;

        return(
            //Tabelleneinträge für die Tabelle in der ProjektBearbeiten.js File
            <>
              <StyledTableRow >
                <StyledTableCell align="left" component="th" scope="row">{studentName}</StyledTableCell>
                <StyledTableCell align="center">{mat_nr}</StyledTableCell> 
                <StyledTableCell align="center">
                {bewertungen?
                    <FormControl className={classes.formControl} >
                            <Select value={note } onChange={this.handleChange}  >
                                {
                                bewertungen.map(bewertung =>
                                <MenuItem value={bewertung.getID()}><em>{bewertung.getnote()}</em></MenuItem>
                                )
                                }
                            </Select>  
                    </FormControl>                                  
                  :
                    <FormControl className={classes.formControl}>
                            <Select value={note} >
                                <MenuItem value={""}><em>Bewertungen nicht geladen</em></MenuItem>
                            </Select>  
                    </FormControl>
                }      
                </StyledTableCell> 

                <StyledTableCell align="center">
                  {currentProjektBO.aktueller_zustand === "Bewertung abgeschlossen"?
                    <>
                      <IconButton className={classes.teilnahmeAbwaehlenButton}  variant="contained"  onClick={this.teilnahmeAbwaehlenButtonClicked} disabled > <DeleteIcon /></IconButton>
                    </>
                    :
                    <>
                      <IconButton className={classes.teilnahmeAbwaehlenButton}  variant="contained"  onClick={this.teilnahmeAbwaehlenButtonClicked} > <DeleteIcon /></IconButton>
                    </>
                  }  
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow> 
              <StyledTableCell colspan="10" className={classes.laden}>
                <LoadingProgress show={loadingInProgress}></LoadingProgress>
                <ContextErrorMessage error={error} contextErrorMsg = {'Diese Teilnahme konnte nicht geladen werden'}
                      onReload={()=>{
                        this.getStudentByID();
                        this.getBewertung();
                        this.getBewertungen();
                  }} />
              </StyledTableCell>
            </StyledTableRow>
          </>
        );
    }
}

//Css Komponent Spezifischer Style 
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
        minWidth: 50,
    },
    button: {
        margin: theme.spacing(1),
        },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    laden: {
      padding: 0
    }
    });

/** PropTypes */
ProjektPflegenEintrag.propTypes = {
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
  


export default withStyles(styles)(ProjektPflegenEintrag);