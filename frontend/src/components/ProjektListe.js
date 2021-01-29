import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, TextField, InputAdornment, IconButton, Grid, Typography, Button, formatMs} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import { ElectivAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';

// import CustomerForm from './dialogs/CustomerForm';
import ProjektListeEintrag from './ProjektListeEintrag';

/*
Erstellt eine Liste von ProjektListeEintrag fuer jedes Projekt
*/

class ProjektListe extends Component {

  constructor(props) {
    super(props);
    let expandedID = null;

    if (this.props.location.expandProjekt) {
      expandedID = this.props.location.expandProjekt.getID();
    }

    //gebe einen leeren status
    this.state = {
      projekte: [],
      projektarten: [],
      filteredProjekte: [],
      projektFilter: '',
      error: null,
      ausgewaehlteEcts: null,
      loadingInProgress: false,
      expandedProjektID: expandedID,
      showProjekteForm: false,
      ectsCount: 0,
      personen: [],
      aktuelleWahl: false,
      genehmigteProjekte: [],
      
    };
    this.wahlFreigeben = this.wahlFreigeben.bind(this)
  }

  // ECTS counter funktion. Erhaelt die ects und addiert diese bei Aufruf zu ectsCount im state
  ectsCountFunc = (ects) => {
    setTimeout(() => {
      this.setState({
        ectsCount: this.state.ectsCount + ects
      })
    }, 0);

  }

/*   //Suche-Funktion zum Suchen von Projekten
  filterFieldValueChange= event => {
    const value = event.target.value.toLowerCase();
    this.setState({
        filteredProjekte: this.state.projekte.filter(projekt => {
            let nameContainsValue = projekt.getname().toLowerCase().includes(value);
            return nameContainsValue;
        }),
        projektFilter: value
    });
  }

  //Suche leeren
  clearFilterFieldButtonClicked = () => {
    this.setState({
        filteredProjekte: [...this.state.projekte],
        projektFilter: ''
    });
  } */


  //hole alle Projekte vom Backend
  getProjekte = () => {
    
    ElectivAPI.getAPI().getProjekteByZustand('Wahlfreigabe')
      .then(projekteBOs =>{

        var aktuelleWahl = projekteBOs.length > 0
        this.setState({								//neuer status wenn fetch komplett
          aktuelleWahl: aktuelleWahl,
          projekte: projekteBOs,
          filteredProjekte: [...projekteBOs],
          loadingInProgress: false,				// deaktiviere ladeindikator
          error: null,
        })}).catch(e =>
          this.setState({
            projekte: [],
            filteredProjekte: [],
            loadingInProgress: false,
            error: e
          }));
    // setze laden auf wahr
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }
  getGenehmigteProjekte = () => {
    
    ElectivAPI.getAPI().getProjekteByZustand('Genehmigt')
      .then(projekteBOs =>{
        this.setState({								//neuer status wenn fetch komplett
          genehmigteProjekte: projekteBOs,
          loadingInProgress: false,				// deaktiviere ladeindikator
          error: null,
        })}).catch(e =>
          this.setState({
            genehmigteProjekte: [],
            loadingInProgress: false,
            error: e
          }));
    // setze laden auf wahr
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }

  // Holt alle Projektarten vom Backend mit GET Methode
  getProjektarten = () => {
    ElectivAPI.getAPI().getProjektart()
      .then(projekteartBos =>
        this.setState({								//neuer status wenn fetch komplett
          projektarten: projekteartBos,
          loadingInProgress: false,				// deaktiviere ladeindikator
          error: null,
        })).catch(e =>
          this.setState({
            projektarten: [],
            loadingInProgress: false,
            error: e
          }));
    // setze laden auf wahr
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }

  // Holt alle Personen vom Backend
  getPPersonen = () => {
    ElectivAPI.getAPI().getPersons()
      .then(personBOs =>
        this.setState({								//neuer status wenn fetch komplett
          personen: personBOs,
          loadingInProgress: false,				// deaktiviere ladeindikator
          error: null,
        })).catch(e =>
          this.setState({
            personen: [],
            loadingInProgress: false,
            error: e
          }));
    // setze laden auf wahr
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }

  // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
  componentDidMount() {
    this.getProjekte();
    this.getProjektarten();
    this.getPPersonen();
    this.getGenehmigteProjekte();
  }

  // Funktion fuer die Projektklappen oeffnung und den einhergehenden State change
  onExpandedStateChange = projekt => {
    //  Zum anfang Projekt Eintrag = null
    let newID = null;

    // Falls ein Objekt geclicket wird, collapse
    if (projekt.getID() !== this.state.expandedProjektID) {
      // Oeffnen mit neuer Projekt ID
      newID = projekt.getID()
    }
    this.setState({
      expandedProjektID: newID,
    });
  }
  wahlFreigeben(){
    var neuerZustand = 'Wahlfreigabe'
    if(this.state.aktuelleWahl){
      neuerZustand = 'in Bewertung' 
    
    for ( var i=0; i<this.state.projekte.length; i++){
      this.state.projekte[i].setAktuellerZustand(neuerZustand)
      ElectivAPI.getAPI().setZustandAtProjekt(this.state.projekte[i].getID(),neuerZustand)
    }}
    else{ for ( var i=0; i<this.state.genehmigteProjekte.length; i++){
      this.state.genehmigteProjekte[i].setAktuellerZustand(neuerZustand)
      ElectivAPI.getAPI().setZustandAtProjekt(this.state.genehmigteProjekte[i].getID(),neuerZustand)

    }
  } this.getProjekte()
    
  }


  /** Renders the component */
  render() {

    const { classes, currentStudent } = this.props;
    const { aktuelleWahl, projekte, projektFilter, filteredProjekte, expandedProjektID, loadingInProgress, error, ectsCount, projektarten, personen } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={1} className={classes.grid} justify='flex-start' alignItems='center'>
          {/* <Grid item className={classes.projektFilter}>
            <Typography>
              Filter Projekliste nach Namen:
              </Typography>
          </Grid>
        <Grid item xs={4}>
        <TextField
                className={classes.filter}
                type='text'
                label=''
                value={projektFilter}
                onChange={this.filterFieldValueChange}
                InputProps={{
                    endAdornment: <InputAdornment position='end'>
                    <IconButton onClick={this.clearFilterFieldButtonClicked}>
                        <ClearIcon fontSize="small"/>
                    </IconButton>
                    </InputAdornment>,
                }}
            />
          </Grid> */}
          <Grid item xs />
          {currentStudent ?
            <Grid item className={classes.ectsCount}>
              <Button variant="outlined" color="primary" className={classes.buttonEcts} disableRipple style={{ backgroundColor: 'transparent', }}>Anzahl ECTS: {ectsCount}</Button>
            </Grid>
            :
            <>{aktuelleWahl ?
            <Button className={classes.wahlFreigeben} variant="contained" color="secondary" onClick= {this.wahlFreigeben} >Wahl beenden</Button>
            :
            <Button className={classes.wahlFreigeben} variant="contained" color="primary" onClick= {this.wahlFreigeben} >Wahl freigeben</Button>

            
            } </>
          }
        </Grid>
        {projektarten.length > 0 && personen.length > 0 && filteredProjekte.length > 0 ?
          <>
          
        <Button className={classes.ects} variant="outlined" color="primary" disableRipple style={{ backgroundColor: 'transparent', }}>5 ECTS</Button>
        {       
          filteredProjekte
          .filter(projekt => projekt.getArt()===1)
          .map(projekt => 
          <ProjektListeEintrag key={projekt.getID()} projekt={projekt} expandedState={expandedProjektID === projekt.getID()}
              onExpandedStateChange={this.onExpandedStateChange} currentStudent={currentStudent} ectsCountFunc={this.ectsCountFunc}
              ectsCount={ectsCount} projektarten={projektarten} personen={personen}
            />)
        } 
        <Button className={classes.ects} variant="outlined" color="primary" disableRipple style={{ backgroundColor: 'transparent', }}>10 ECTS</Button>
        {        
          filteredProjekte
          .filter(projekt => projekt.getArt()===2)
          .map(projekt => 
          <ProjektListeEintrag key={projekt.getID()} projekt={projekt} expandedState={expandedProjektID === projekt.getID()}
              onExpandedStateChange={this.onExpandedStateChange} currentStudent={currentStudent} ectsCountFunc={this.ectsCountFunc}
              ectsCount={ectsCount} projektarten={projektarten} personen={personen}
            />)
        } 
        <Button className={classes.ects} variant="outlined" color="primary" disableRipple style={{ backgroundColor: 'transparent', }}>20 ECTS</Button>
        {
          filteredProjekte
          .filter(projekt => projekt.getArt()===3)
          .map(projekt => 
          <ProjektListeEintrag key={projekt.getID()} projekt={projekt} expandedState={expandedProjektID === projekt.getID()}
              onExpandedStateChange={this.onExpandedStateChange} currentStudent={currentStudent} ectsCountFunc={this.ectsCountFunc}
              ectsCount={ectsCount} projektarten={projektarten} personen={personen}
            />)
        } 
          </>
          :
          <>
            <Typography>Daten noch nicht geladen</Typography>
          </>

        }

        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of Projects could not be loaded.`}
          onReload={()=>{
            this.getProjekte();
            this.getProjektarten();
            }} />

      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  grid: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  ectsCount: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  ects:{
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%'
  },
  buttonEcts:{
    minWidth: 155
  },
  wahlFreigeben:{
    minWidth: 155,
    marginRight: theme.spacing(2),
    
  }
  
  
  

});

/** PropTypes */
ProjektListe.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ProjektListe));

