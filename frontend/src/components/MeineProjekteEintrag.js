import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ElectivAPI from '../api/ElectivAPI';
import { withStyles } from '@material-ui/core/styles';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LoadingProgress from './dialogs/LoadingProgress';
import ContextErrorMessage from './dialogs/ContextErrorMessage';

/**
 * Es wird eine einzelne Teilnahme an einem Projekt mit allen not wendigen Informationen dargestellt
 * 
 * Hierfür werden Projektname, Anzahl der ECTS, Semester, Dozent , die Note angezeigt
 * 
 * Außerdem kann der Student nach der Benotung seine Teilnahme einem Modul zuweisen
 * 
 */


//Css Style Klassen für die Tabellen Zellen
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

//Css Style Klassen für die Tabellen Zeilen
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(4n+1)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


class MeineProjekteEintrag extends Component {

    constructor(props){
        super(props);

        // initiiere einen leeren state
        this.state = {
            projekt: null,
            projektID: null,
            projektName: null,
            projektZustand: null,
            ECTS: null,
            semester: null,
            module: null,
            dozentName: null,
            note: null,
            loadingInProgress: false,
            error: null
        };
    }

    // API Anbindung um Projekte vom Backend zu bekommen 
    getProjekt = () => {
      ElectivAPI.getAPI().getProjekt(this.props.teilnahme.lehrangebot)
      .then(projektBO =>
          this.setState({
            projekt: projektBO,
            projektID: projektBO.id,
            projektName: projektBO.name,
            projektZustand: projektBO.aktueller_zustand,
            loadingInProgress: false,
            error: null,
          })).then(()=>{
            this.getPerson()
            this.getBewertung()
            this.getModule_by_projekt_id()
            this.getSemester_by_id()
            this.getECTS()
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

    // API Anbindung um ECTS einer Projektart vom Backend zu bekommen 
    getECTS = () => {
      ElectivAPI.getAPI().getProjektartById(this.state.projekt.art)
      .then(ProjektartBO =>
          this.setState({
              ECTS: ProjektartBO.ects,
              error: null,
              loadingInProgress: false,
          }))
          .catch(e =>
              this.setState({
                  ECTS: null,
                  error: e,
                  loadingInProgress: false,
              }));
      this.setState({
          error: null,
          loadingInProgress: true
      });
    }

    // Wenn die Teilnahme schon bewertet wurde, gebe die Note aus
    getBewertung = () => {
      if (this.props.teilnahme.resultat !== null){
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
                  error: e,
                  loadingInProgress: false,
              }));
      this.setState({
          error: null,
          loadingInProgress: true
      });
    }
    }

    // API Anbindung um Semester vom Backend zu bekommen 
    getSemester_by_id = () => {
      ElectivAPI.getAPI().getSemester_by_id(this.state.projekt.getHalbjahr())
      .then(semesterBO =>
          this.setState({
              semester: semesterBO.name,
              error: null,
              loadingInProgress: false,
          }))
          .catch(e =>
              this.setState({
                  semester: null,
                  error: e,
                  loadingInProgress: false,
              }));
      this.setState({
          error: null,
          loadingInProgress: true
      });
    }

    // API Anbindung um wählbare Module für ein Projekt vom Backend zu bekommen 
    getModule_by_projekt_id = () => {
      ElectivAPI.getAPI().getModule_by_projekt_id(this.state.projektID)
      .then(modulBOs =>
          this.setState({
              module: modulBOs,
              error: null,
              loadingInProgress: false,
          }))
          .catch(e =>
              this.setState({
                  module: null,
                  error: e,
                  loadingInProgress: false,
              }));
      this.setState({
          error: null,
          loadingInProgress: true
      });
    }

// API Anbindung um Dozent vom Backend zu bekommen 
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

    // bei Änderung des Modul-Dropdown-Menüs wird das ausgewähte Modul im Backend als Anrechnung der Teilnahme in die Datenbank eingefügt 
    handleChange = async (edv) => {
      if (this.state.note === null){
        this.props.teilnahme.setAnrechnung(edv.target.value);
        // console.log(`Option selected:`, edv.target.value);
        await ElectivAPI.getAPI().updateTeilnahme(this.props.teilnahme);
        this.props.getTeilnahmen();
      }else{

      }
      
    };

    // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
    componentDidMount() {
      this.getProjekt();
    }

    // Wenn die Componente geupdatet wird
    componentDidUpdate(prevProps){
      if((this.props.show) && (this.props.show !== prevProps.show)) {
        this.getProjekt();
      }
    }

    /** Renders the component */
    render(){
        const {classes, teilnahme} = this.props;
        const { projektZustand, projektID, projektName, ECTS, semester, module, dozentName, note, loadingInProgress, error } = this.state;

        return(
          <>
                <StyledTableRow key={projektID}>
                  <StyledTableCell align="left">{projektName}</StyledTableCell>
                  <StyledTableCell align="center">{ECTS}</StyledTableCell>
                  <StyledTableCell align="center">{semester}</StyledTableCell>
                  <StyledTableCell align="center">{dozentName}</StyledTableCell> 
                  { projektZustand === 'Abgeschlossen' ?
                  <StyledTableCell align="center">{note}</StyledTableCell>
                  :
                  <StyledTableCell align="center"></StyledTableCell> 
                  }
                  <StyledTableCell align="right" className={classes.breite}>               
                                  { module ?
                                    <FormControl className={classes.formControl}>
                                      <InputLabel>Modul</InputLabel> 
                                        <Select value = {teilnahme.anrechnung} onChange={this.handleChange}>
                                          {
                                          module.map(modul =>
                                          <MenuItem value={modul.getID()}><em>{modul.getname()}</em></MenuItem>
                                          )
                                          }
                                        </Select>                                                                
                                    </FormControl>                                  
                                    :
                                    <FormControl className={classes.formControl}>
                                      <InputLabel>Modul</InputLabel>
                                        <Select value="">
                                          <MenuItem value=""><em></em></MenuItem>
                                        </Select>
                                    </FormControl>
                                  }
                  </StyledTableCell>
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
    content: {
        margin: theme.spacing(1),
      },
    table: {
        minWidth: 700,
      },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
        textAlign: "left"
    },
    button: {
        margin: theme.spacing(1),
        },
    laden: {
      padding: 0
    },
    breite: {
      width: 220
    }
    });

/** PropTypes */
MeineProjekteEintrag.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    projekt: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired
  }
  

export default withStyles(styles)(MeineProjekteEintrag);


