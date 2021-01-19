import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ElectivAPI from '../api/ElectivAPI';
import { withStyles, Button, Grid, Typography,Fab,Select,TableFooter,FormControl,MenuItem,Paper,Table,TableRow,TableBody,TableHead,TableCell,TableContainer, InputLabel} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import { withRouter } from 'react-router-dom';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';

//Icons importieren
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import ArchiveIcon from '@material-ui/icons/Archive';

//import AddStudent Dialog
import AddStudent from './dialogs/AddStudent';
//import ProjektPflegenEintrag
import ProjektPflegenEintrag from './ProjektPflegenEintrag';



/**
 * dieser Tab wird unter 2 Rollen angezeigt:
 * Unter der Rolle Dozent:
 * Rendert die aktuellen sowie abgeschlossenen Projekte vom Dozenten 
 * und die Einträge der Projekte mithilfe der ProjektPflegenEintrag Komponente.
 * Ein Student kann zu einem aktuellen Projekt hinzugefügt werden.
 * Das Projekt kann nach Bewertung in den nächsten Zustand gebracht werden.
 * Bei einem abgeschlossenen Projekt kann kein Teilnehmer mehr hinzugefügt werden.
 * 
 * 
 * Unter der Rolle Admin:
 * Rendert alle aktuellen sowie abgeschlossenen Projekte 
 * und die Einträge der Projekte mithilfe der ProjektPflegenEintrag Komponente.
 * Ein Student kann zu einem aktuellen Projekt hinzugefügt werden.
 * Das Projekt kann nach Bewertung in den nächsten Zustand gebracht werden.
 * Bei einem abgeschlossenen Projekt kann kein Teilnehmer mehr hinzugefügt werden.
 * 
 * 
 * @see See component [ProjektPflegenEintrag](#projektpflegeneintrag)
 * @see See dialong   [AddStudent](#addstudent)
 * 
 * @author [Pascal Gienger](https://github.com/PascalGienger)
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
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);


class ProjektPflegen extends Component {

    constructor(props){
        super(props);
        
        // Initiert den state
        this.state = {
            teilnahmen:[],
            projekte:[],
            currentProjektBO : null,
            abgeschlosseneProjekte: [],
            currentProjekt: null,
            semester: null,
            error: null,
            loadingInProgress: false,
            showAddStudent: false,
            
        };
        this.getTeilnahmenByProjektId=this.getTeilnahmenByProjektId.bind(this)
    }
    
  //API Anbindung um alle aktuellen Projekte vom Backend zu bekommen
  getProjekte = () => {
    //Funtion unter der Rolle des Dozenten 
    //API Anbindung holt alle Projekte im richtigen Zustand, vom jeweiligen Dozenten vom Backendconsole.log("Hallo",this.props.currentPerson)
    if (this.props.currentPerson.getrolle()==="Dozent"){
      ElectivAPI.getAPI().getProjekteByZustandByDozent("in Bewertung",this.props.currentPerson.getID())
        .then(projekteBOs =>
          this.setState({								    //neuer status wenn fetch komplett
            projekte: projekteBOs, 
            loadingInProgress: false,				// deaktiviere ladeindikator
            error: null,
          })).catch(e =>
            this.setState({
              projekte: [],
              loadingInProgress: false,
              error: e
            }));
      // setze laden auf wahr
      this.setState({
        loadingInProgress: true,
        error: null
      });
    }
    //Funtion unter der Rolle des Admin  
    //API Anbindung holt alle Projekte im richtigen Zustand vom Backend
    if (this.props.currentPerson.getrolle()==="Admin"){
			ElectivAPI.getAPI().getProjekteByZustand("in Bewertung")
      .then(projekteBOs => 
				this.setState({								    //neuer status wenn fetch komplett
					projekte: projekteBOs,	
					loadingInProgress: false,				// deaktiviere ladeindikator
          error: null,
				})).catch(e =>
					this.setState({
						projekte: [],
						loadingInProgress: false,
						error: e
          }));
    // setze laden auf wahr
    this.setState({
      loadingInProgress: true,
      error: null
    });
    }
  }

  getAbgeschlosseneProjekte = () => {
    //Funtion unter der Rolle des Dozenten 
    //API Anbindung holt alle Projekte im richtigen Zustand, vom jeweiligen Dozenten vom Backend
    if (this.props.currentPerson.getrolle()==="Dozent"){
      ElectivAPI.getAPI().getProjekteByZustandByDozent("Bewertung abgeschlossen",this.props.currentPerson.getID())
        .then(projekteBOs =>
          this.setState({								//neuer status wenn fetch komplett
            abgeschlosseneProjekte: projekteBOs, 
            loadingInProgress: false,				// deaktiviere ladeindikator
            error: null,
          })).catch(e =>
            this.setState({
              abgeschlosseneProjekte: [],
              loadingInProgress: false,
              error: e
            }));
      // setze laden auf wahr
      this.setState({
        loadingInProgress: true,
        error: null
      });
    }
    //Funtion unter der Rolle des Admin  
    //API Anbindung holt alle Projekte im richtigen Zustand vom Backend
    if (this.props.currentPerson.getrolle()==="Admin"){
      ElectivAPI.getAPI().getProjekteByZustand("Bewertung abgeschlossen")
      .then(projekteBOs => 
        this.setState({								//neuer status wenn fetch komplett
          abgeschlosseneProjekte: projekteBOs,	
          loadingInProgress: false,				// deaktiviere ladeindikator
          error: null,
        })).catch(e =>
          this.setState({
            abgeschlosseneProjekte: [],
            loadingInProgress: false,
            error: e
          }));
    // setze laden auf wahr
    // console.log(this.projekte.toString());
    this.setState({
      loadingInProgress: true,
      error: null
    });
    }
  }

  // API Anbindung holt alle Teilnahmen der jeweiligen Projekt ID vom Backend
  getTeilnahmenByProjektId=(id)=>{
    ElectivAPI.getAPI().getTeilnahmenByProjektId(id)
    .then(teilnahmeBOs =>
      this.setState({                 //neuer status wenn fetch komplett
          teilnahmen: teilnahmeBOs,
          error: null,
          loadingInProgress: false,   // deaktiviere ladeindikator
      })
    ).catch(e =>
          this.setState({
              teilnahme: [],
              error: e,
              loadingInProgress: false,
          }));
    this.setState({
        error: null,
        loadingInProgress: true,
        loadingProjekteError: null
    });
  }

  // API Anbindung um alle Senester vom Backend zu bekommen 
  getSemester = () => {
    ElectivAPI.getAPI().getSemester()
    .then(semesterBOs =>
        this.setState({                 //neuer status wenn fetch komplett
            semester: semesterBOs,
            error: null,
            loadingInProgress: false,   // deaktiviere ladeindikator
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
  
    
  //bei Klick von dem Button: Bewertung abgeben, wird der Zustand des Projektes in den nächsten Zustand versetzt
  bewertungAbgeschlossenButtonClicked = event => {
    //Logik fuer bewertung abgeschlossen Button
    ElectivAPI.getAPI().setZustandAtProjekt(this.state.currentProjekt, "Bewertung abgeschlossen").then(()=>{
      this.getProjekte()
      this.getAbgeschlosseneProjekte()
      this.setState({
        currentProjekt: null,
        currentProjektBO: null,
        teilnahmen: null,
      })
    }); 
  }

  //bei Klick auf + Button wird ein Dialogfenster geöffnet für das Hinzufügen von Studenten
  addStudentButtonClicked = event => {
    event.stopPropagation();
    this.setState({
      showAddStudent: true
    });
  }
  //bei Klick auf X Button wird das Dialogfenster wieder geschlossen
  addStudentClosed = () => {
      this.setState({
        showAddStudent: false
      });
      this.getTeilnahmenByProjektId(this.state.currentProjekt);
  }

  /** Lifecycle Methode, die bei dem Einfügen der Komponente in den Browser DOM aufgerufen wird*/
  componentDidMount() {
    this.getProjekte();
    this.getAbgeschlosseneProjekte();
    this.getSemester();
  }

  //bei Änderung der Select Komponente wird das ausgewählte Projekt als das aktuelle Projekt ausgewählt  
  handleChange = currentProjekt => (event) => {
    let projektBO= event.target.value
    
    this.setState({
      currentProjekt: projektBO.getID(),
      currentProjektBO: projektBO,
    })
    
    this.getTeilnahmenByProjektId(projektBO.getID())
  };

    /** Rendert die Komponente*/
    render(){
        const { classes } = this.props;
        const { projekte, abgeschlosseneProjekte, currentProjekt,currentProjektBO, teilnahmen, semester, error, loadingInProgress, showAddStudent}  = this.state;
        
        return(
          <div className={classes.root}>          
            {/*erster sichtbarer Teil wenn noch kein Projekt ausgewählt wurde*/}
            <Grid className={classes.grid} container spacing={2} display="flex" margin="auto">
              <Grid item xs={12} sm={4} >
                    <FormControl className={classes.formControl}>
                      <InputLabel>aktuelle Projekte </InputLabel>
                        <Select  className={classes.formControl} style={{ minWidth:"9rem"}}  value={currentProjektBO}  onChange={this.handleChange(currentProjekt)}>
                          {
                            projekte.map(projekt =>
                            <MenuItem value={projekt}><em>{projekt.getname()}</em></MenuItem>
                            )
                          }
                        </Select>                                                              
                    </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} >
              {semester?
                <>   
                    <FormControl className={classes.formControl}>
                      <InputLabel>abgeschlossene Projekte</InputLabel>
                        <Select  className={classes.formControl} style={{ minWidth:"17rem"}}  value={currentProjektBO}  onChange={this.handleChange(currentProjekt)}>
                          {
                          abgeschlosseneProjekte.map(projekt =>
                          <MenuItem value={projekt}><em>{projekt.getname()} ({semester[projekt.halbjahr - 1].name})</em></MenuItem>
                          )
                          }
                        </Select>                                                              
                    </FormControl>
                </>
                :
                <>
                </>
              }
              </Grid>

            {/*wenn ein Projekt ausgewählt wurde*/}
                  {currentProjektBO?
                    <>
                    {teilnahmen ?
                        <>
                        {/*wenn der aktuelle Zustand des Projektes in Bewertung ist*/}
                        {currentProjektBO.aktueller_zustand === "in Bewertung"?
                        <>
                        <Grid item xs/>
                        <Grid item className={classes.grid} >
                            <Tooltip title='Teilnehmer hinzufügen' placement="left">
                              <Fab size="small" align="right" className={classes.addButton} color="primary" aria-label="add" onClick={this.addStudentButtonClicked}>
                                <AddIcon />
                              </Fab> 
                              </Tooltip>
                        </Grid>
                        </>
                          :
                        <>
                        {/*wenn der aktuelle Zustand des Projektes nicht in Bewertung ist, wird er nicht anklickbar angezeigt */}
                          <Grid item xs/>
                          <Grid item className={classes.grid} >
                              <Tooltip title='Teilnehmer hinzufügen' placement="left">
                                <Fab size="small" align="right" className={classes.addButton} color="primary" aria-label="add" onClick={this.addStudentButtonClicked} disabled>
                                  <AddIcon />
                                </Fab> 
                                </Tooltip>
                          </Grid>
                        </>
                      }

                      {/*Tabellen Header Zeileninhalte*/}
                      <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                          <TableHead>
                            <StyledTableRow>
                              <StyledTableCell align="center">Student </StyledTableCell>
                              <StyledTableCell align="center">Matrikelnr.</StyledTableCell>
                              <StyledTableCell align="center">Note</StyledTableCell>
                              <StyledTableCell align="center">Teilnahme</StyledTableCell>
                            </StyledTableRow>
                          </TableHead>
                            <TableBody>
                              {/*Tabellenzelleninhalte in der ProjektBearbeitenEintrag Komponente*/}
                              {
                                teilnahmen.map(teilnahme =>
                                  <ProjektPflegenEintrag key={teilnahme.getID()} teilnahme = {teilnahme} reloadteilnahmen={this.getTeilnahmenByProjektId} currentProjektBO = {currentProjektBO} currentProjekt = {currentProjekt} />
                                )
                              }
                            </TableBody> 
                        </Table>
                            <LoadingProgress show={loadingInProgress} />
                            <ContextErrorMessage error={error} contextErrorMsg = {'Projekte Bearbeiten konnten nicht geladen werden'} onReload={this.getTeilnahmen} /> 
                            {/*AddStudent Komponente*/}
                            <AddStudent show={showAddStudent} currentProjekt={currentProjekt} teilnahmen={teilnahmen} onClose={this.addStudentClosed}/>
                      </TableContainer>
                      

                      {/*Bewertung abschließen Button wird nur angezeigt wenn das Projekt sich noch in dem Bewertungszustand befindet*/}
                      {currentProjektBO ?
                        <>
                          {currentProjektBO.aktueller_zustand === "in Bewertung"?
                            <>
                              <Grid item xs/>
                              <Grid item>
                                <Button variant="contained" color="primary" onClick={this.bewertungAbgeschlossenButtonClicked}  >Bewertung abgeben</Button>
                              </Grid>
                            </>
                            :
                            <>  
                            </>
                          }
                        </>
                        :null
                      }
                      </>
                      :
                      <>
                      </>
                    }
                    </>
                    :
                    <>
                    </>
                  }   
                  </Grid>           
          </div>
        )
    }
}

/** Component specific styles */
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1)
      },
      content: {
        margin: theme.spacing(1),
      },
      addButton: {
      },
      grid:{
      }
  });

/** PropTypes */
ProjektPflegen.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** @ignore */
    location: PropTypes.object.isRequired,
	// logged in Firebase user/person
    show: PropTypes.bool.isRequired
}



export default withRouter(withStyles(styles)(ProjektPflegen));