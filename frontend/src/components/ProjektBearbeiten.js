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

//import AddStudent Dialog
import AddStudent from './dialogs/AddStudent';
//import ProjektBearbeitenEintrag
import ProjektBearbeitenEintrag from './ProjektBearbeitenEintrag';





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


class ProjektBearbeiten extends Component {

    constructor(props){
        super(props);

        this.state = {
            teilnahmen:[],
            projekte:[],
            "currentProjekt": null,
            error: null,
            loadingInProgress: false,
            showAddStudent: false,
            
        };
        this.getTeilnahmenByProjektId=this.getTeilnahmenByProjektId.bind(this)
    }
    
    getProjekte = () => {
      //Funtion für den Dozenten 
      //API Anbindung holt alle Projekte im richtigen Zustand, vom jeweiligen Dozenten vom Backend
      console.log("Hallo",this.props.currentPerson)
      if (this.props.currentPerson.getrolle()==="Dozent"){
        ElectivAPI.getAPI().getProjekteByZustandByDozent("in Bewertung",this.props.currentPerson.getID())
          .then(projekteBOs =>
            this.setState({								//neuer status wenn fetch komplett
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

    //Funtion für den Admin  
    //API Anbindung holt alle Projekte im richtigen Zustand vom Backend
    if (this.props.currentPerson.getrolle()==="Admin"){
			ElectivAPI.getAPI().getProjekteByZustand("in Bewertung")
      .then(projekteBOs => 
				this.setState({								//neuer status wenn fetch komplett
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
        this.setState({
            teilnahmen: teilnahmeBOs,
            error: null,
            loadingInProgress: false,
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
    
    //bei Klick Button Bewertung abgeben, wird der Zustand des Projektes in den nächsten Zustand versetzt
    bewertungAbgeschlossenButtonClicked = event => {
      //Logik fuer bewertung abgeschlossen Button
      ElectivAPI.getAPI().setZustandAtProjekt(this.state.currentProjekt, "Bewertung abgeschlossen").then(()=>{
        this.getProjekte()
        this.getTeilnahmenByProjektId()
      }); 
    }

    //bei Klick auf + Button wird ein Dialog fenster geöffnet für das Hinzufügen von Studenten
    addStudentButtonClicked = event => {
      event.stopPropagation();
      this.setState({
        showAddStudent: true
      });
    }
    //bei Klick auf X Button wird der Dialog wieder geschlossen
    addStudentClosed = () => {
        this.setState({
          showAddStudent: false
        });
        this.getTeilnahmenByProjektId(this.state.currentProjekt);
    }


    componentDidMount() {
      this.getProjekte();
    }

    //bei Änderung der Select Komponente wird das Projekt als das aktuelle Projekt ausgewählt  
    handleChange = currentProjekt => (event) => {
      this.setState({
        currentProjekt:event.target.value
      })
      this.getTeilnahmenByProjektId(event.target.value)
    };

    render(){
        const { classes } = this.props;
        const {currentRolle, projekte, currentProjekt, teilnahmen, error, loadingInProgress, showAddStudent}  = this.state;
        
        return(
          <div className={classes.root}>
            
            {/*erster sichtbarer Teil wenn noch kein Projekt ausgewählt wurde*/}
            <Grid className={classes.grid} container spacing={2} display="flex" margin="auto">
              <Grid item xs={12} sm={6} >
                  
                    <FormControl className={classes.formControl}>
                      <InputLabel>Projektname</InputLabel>
                        <Select  className={classes.formControl} style={{ minWidth:"8rem"}}  value={currentProjekt }  onChange={this.handleChange("currentProjekt")}>
                          {
                          projekte.map(projekt =>
                          <MenuItem value={projekt.getID()}><em>{projekt.getname()}</em></MenuItem>
                          )
                          }
                        </Select>                                                              
                    </FormControl>
              </Grid>
            
            {/*wenn ein Projekt ausgewählt wurde*/}
                  {currentProjekt?
                    <>
                        <Grid item xs/>
                        <Grid item className={classes.grid} >
                            <Tooltip title='Teilnehmer hinzufügen' placement="left">
                              <Fab size="small" align="right" className={classes.addButton} color="primary" aria-label="add" onClick={this.addStudentButtonClicked}>
                                <AddIcon />
                              </Fab> 
                              </Tooltip>
                        </Grid>
                        
                        <TableContainer component={Paper}>
                          <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                              <StyledTableRow>
                                <StyledTableCell align="center">Student</StyledTableCell>
                                <StyledTableCell align="center">Matrikelnr.</StyledTableCell>
                                <StyledTableCell align="center">Note</StyledTableCell>
                                <StyledTableCell align="center">Teilnahme</StyledTableCell>
                              </StyledTableRow>
                            </TableHead>
                              <TableBody>
                                {
                                  teilnahmen.map(teilnahme =>
                                    <ProjektBearbeitenEintrag key={teilnahme.getID()} teilnahme = {teilnahme} reloadteilnahmen={this.getTeilnahmenByProjektId} />
                                  )
                                }
                              </TableBody> 
                          </Table>
                              <LoadingProgress show={loadingInProgress} />
                              <ContextErrorMessage error={error} contextErrorMsg = {'Projekte Bearbeiten konnten nicht geladen werden'} onReload={this.getTeilnahmen} /> 
                              <AddStudent show={showAddStudent} currentProjekt={currentProjekt} teilnahmen={teilnahmen} onClose={this.addStudentClosed}/>
                        </TableContainer>
                      
                      <Grid item xs/>
                      <Grid item>
                        <Button variant="contained" color="primary" onClick={this.bewertungAbgeschlossenButtonClicked}  >Bewertung abgeben</Button>
                      </Grid>
                      
                    </>
                  :
                  <></>
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
ProjektBearbeiten.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** @ignore */
    location: PropTypes.object.isRequired,
	// logged in Firebase user/person
    show: PropTypes.bool.isRequired
}



export default withRouter(withStyles(styles)(ProjektBearbeiten));