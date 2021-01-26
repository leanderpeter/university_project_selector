import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, TextField, InputAdornment, IconButton, Grid, Typography, Button} from '@material-ui/core';
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
      projektFilter: '',
      error: null,
      ausgewaehlteEcts: null,
      loadingInProgress: false,
      expandedProjektID: expandedID,
      showProjekteForm: false,
      ectsCount: 0
    };
  }

  ectsCountFunc = (ects) => {
    setTimeout(() => {
      this.setState({
        ectsCount: this.state.ectsCount + ects
      })
    }, 0);

  }

  //hole alle Projekte vom Backend
  getProjekte = () => {
    ElectivAPI.getAPI().getProjekteByZustand("Genehmigt")
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

  // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
  componentDidMount() {
    this.getProjekte();
    this.getProjektarten();
  }

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



  /** Renders the component */
  render() {

    const { classes, currentStudent } = this.props;
    const { projekte, projektFilter, expandedProjektID, loadingInProgress, error, ectsCount, projektarten } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={1} className={classes.grid} justify='flex-start' alignItems='center'>
          <Grid item className={classes.projektFilter}>
            <Typography>
              Filter Projekliste nach Namen:
              </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoFocus
              fullWidth
              id='projektFilter'
              type='text'
              value={projektFilter}
              onChange={this.filterFieldValueChange}
              InputProps={{
                endAdornment: <InputAdornment position='end'>
                  <IconButton onClick={this.clearFilterFieldButtonClicked}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs />
          {currentStudent ?
            <Grid item className={classes.ectsCount}>
              <Button variant="outlined" color="primary" disableRipple style={{ backgroundColor: 'transparent', }}>Anzahl ECTS: {ectsCount}</Button>
            </Grid>
            :
            <>
            </>
          }
        </Grid>
        {projektarten.length > 0 && projekte.length > 0 ?
          <>
        <Button className={classes.ects} variant="outlined" color="primary" disableRipple style={{ backgroundColor: 'transparent', }}>5 ECTS</Button>
        {       
          projekte
          .filter(projekt => projekt.getArt()===1)
          .map(projekt => 
          <ProjektListeEintrag key={projekt.getID()} projekt={projekt} expandedState={expandedProjektID === projekt.getID()}
              onExpandedStateChange={this.onExpandedStateChange} currentStudent={currentStudent} ectsCountFunc={this.ectsCountFunc}
              ectsCount={ectsCount} projektarten={projektarten}
            />)
        } 
        <Button className={classes.ects} variant="outlined" color="primary" disableRipple style={{ backgroundColor: 'transparent', }}>10 ECTS</Button>
        {        
          projekte
          .filter(projekt => projekt.getArt()===2)
          .map(projekt => 
          <ProjektListeEintrag key={projekt.getID()} projekt={projekt} expandedState={expandedProjektID === projekt.getID()}
              onExpandedStateChange={this.onExpandedStateChange} currentStudent={currentStudent} ectsCountFunc={this.ectsCountFunc}
              ectsCount={ectsCount} projektarten={projektarten}
            />)
        } 
        <Button className={classes.ects} variant="outlined" color="primary" disableRipple style={{ backgroundColor: 'transparent', }}>20 ECTS</Button>
        {
          projekte
          .filter(projekt => projekt.getArt()===3)
          .map(projekt => 
          <ProjektListeEintrag key={projekt.getID()} projekt={projekt} expandedState={expandedProjektID === projekt.getID()}
              onExpandedStateChange={this.onExpandedStateChange} currentStudent={currentStudent} ectsCountFunc={this.ectsCountFunc}
              ectsCount={ectsCount} projektarten={projektarten}
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
    marginRight: theme.spacing(2)
  },
  ects:{
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
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

