import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { withRouter } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { ElectivAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';

import ProjektForm from './dialogs/ProjektForm';
import ProjektDozentListeEintrag from './ProjektDozentListeEintrag';

/*
Erstellt eine Liste von ProjektDozentListeEintrag fuer jedes Projekt
*/



class ProjektDozentListe extends Component {

  constructor(props) {
    super(props);

    let expandedID = null;

    if (this.props.location.expandProjekt) {
      expandedID = this.props.location.expandProjekt.getID();
    }

    //gebe einen leeren status
    this.state = {
      projekte: [],
      filteredProjekte: [],
      projektFilter: '',
      error: null,
      loadingInProgress: false,
      expandedProjektID: expandedID,
      showProjekteForm: false,
      filterValue: 'Neu'
    };
  }

  //hole alle Projekte vom Backend
  getProjekte = () => {
    if (this.props.currentPerson.getrolle() === 'Admin') {
      ElectivAPI.getAPI().getProjekteByZustand('Neu')
        .then(projekteBOs => {
          this.setState({								//neuer status wenn fetch komplett
            projekte: projekteBOs,
            filteredProjekte: [...projekteBOs],		//speicher eine kopie
            loadingInProgress: false,				// deaktiviere ladeindikator
            error: null,
          })
        })
      ElectivAPI.getAPI().getProjekteByZustand('Abgelehnt').then(projekteBOs => {
        this.setState({								//neuer status wenn fetch komplett
          projekte: [...this.state.projekte, ...projekteBOs],
          loadingInProgress: false,				// deaktiviere ladeindikator
          error: null,
        })
      })
      ElectivAPI.getAPI().getProjekteByZustand('Genehmigt').then(projekteBOs => {
        this.setState({								//neuer status wenn fetch komplett
          projekte: [...this.state.projekte, ...projekteBOs],
          loadingInProgress: false,				// deaktiviere ladeindikator
          error: null,
        })
      })
        .catch(e =>
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
    } else {
      ElectivAPI.getAPI().getProjekteByZustandByDozent("Neu", this.props.currentPerson.getID())
        .then(projekteBOs => {
          this.setState({								//neuer status wenn fetch komplett
            projekte: projekteBOs,
            filteredProjekte: [...projekteBOs],		//speicher eine kopie
            loadingInProgress: false,				// deaktiviere ladeindikator
            error: null
          })
        })
      ElectivAPI.getAPI().getProjekteByZustandByDozent("Abgelehnt", this.props.currentPerson.getID())
        .then(projekteBOs => {
          this.setState({								//neuer status wenn fetch komplett
            projekte: [...this.state.projekte, ...projekteBOs],
            loadingInProgress: false,				// deaktiviere ladeindikator
            error: null
          })
        })
      ElectivAPI.getAPI().getProjekteByZustandByDozent("Genehmigt", this.props.currentPerson.getID())
        .then(projekteBOs => {
          this.setState({								//neuer status wenn fetch komplett
            projekte: [...this.state.projekte, ...projekteBOs],
            loadingInProgress: false,				// deaktiviere ladeindikator
            error: null
          })
        })
        .catch(e =>
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
  // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
  componentDidMount() {
    this.getProjekte();
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

  addProjektButtonClicked = event => {
    event.stopPropagation();
    this.setState({
      showProjekteForm: true
    });
  }

  projektFormClosed = projekt => {
    if (projekt) {
      const newProjektList = [...this.state.projekte, projekt];
      this.setState({
        projekte: newProjektList,
        filteredProjekte: [...newProjektList],
        showProjekteForm: false,
        filterValue: 'Neu'
      });
    } else {
      this.setState({
        showProjekteForm: false,
        filterValue: 'Neu'
      });
    }
  }

  filterFieldValueChange = event => {


    var filteredProjekte = []
    for (var i = 0; i < this.state.projekte.length; i++) {
      if (this.state.projekte[i].aktueller_zustand === event.target.value) {
        filteredProjekte.push(this.state.projekte[i]);
      }
    }

    this.setState({
      filteredProjekte: filteredProjekte,
      filterValue: event.target.value
    })

  }





  /** Renders the component */
  render() {
    const { classes, currentPerson } = this.props;
    const { filteredProjekte, expandedProjektID, loadingInProgress, error, showProjekteForm, filterValue } = this.state;

    return (
      <div className={classes.root}>
        <Grid className={classes.projektFilter} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography>
              Ihre Projekte mit dem Status:
              </Typography>
          </Grid>
          <Grid item xs={4}>
            <Select id='projektFilter' value={filterValue} onChange={this.filterFieldValueChange}>
              <MenuItem value={'Neu'} >Neu</MenuItem>
              <MenuItem value={'Genehmigt'}>Genehmigt</MenuItem>
              <MenuItem value={'Abgelehnt'}>Abgelehnt</MenuItem>
            </Select>


          </Grid>
          <Grid item xs />
          <Grid item>
            <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addProjektButtonClicked}>
              Projekt anlegen
          </Button>
          </Grid>
        </Grid>
        {
          // Show the list of ProjektDozentListeEintrag components
          // Do not use strict comparison, since expandedProjektID maybe a string if given from the URL parameters

          filteredProjekte.map(projekt =>
            <ProjektDozentListeEintrag key={projekt.getID()} projekt={projekt} expandedState={expandedProjektID === projekt.getID()}
              onExpandedStateChange={this.onExpandedStateChange} currentPerson={currentPerson} getProjekte={this.getProjekte} projektFormClosed={this.projektFormClosed}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of Projects could not be loaded.`} onReload={this.getProjekte} />
        <ProjektForm show={showProjekteForm} currentPerson={currentPerson} onClose={this.projektFormClosed} getProjekte={this.getProjekte} />
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  projektFilter: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  }
});

/** PropTypes */
ProjektDozentListe.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ProjektDozentListe));

