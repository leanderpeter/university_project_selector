import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
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

		if (this.props.location.expandProjekt){
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
			showProjekteForm: false
		};
	}

	//hole alle Projekte vom Backend
	getProjekte = () => {
		ElectivAPI.getAPI().getProjekte()
      .then(projekteBOs => 
				this.setState({								//neuer status wenn fetch komplett
					projekte: projekteBOs,					
					filteredProjekte: [...projekteBOs],		//speicher eine kopie
					loadingInProgress: false,				// deaktiviere ladeindikator
					error: null
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
	// Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
	componentDidMount() {
		this.getProjekte();
	}



	/** Renders the component */
	render() {
    const { classes } = this.props;
    const { filteredProjekte, projektFilter, expandedProjektID, loadingInProgress, error, showProjekteForm } = this.state;

    return (
      <div className={classes.root}>
        <Grid className={classes.projektFilter} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
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
                </InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs />
          <Grid item>
            <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addCustomerButtonClicked}>
              Projekt hinzufugen
          </Button>
          </Grid>
        </Grid>
        { 
          // Show the list of ProjektListeEintrag components
          // Do not use strict comparison, since expandedProjektID maybe a string if given from the URL parameters
          
          filteredProjekte.map(projekt =>
            <ProjektListeEintrag key={projekt.getID()} projekt={projekt} expandedState={expandedProjektID === projekt.getID()}
              onExpandedStateChange={this.onExpandedStateChange}
              onCustomerDeleted={this.customerDeleted}
            />) 
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of customers could not be loaded.`} onReload={this.getProjekte} />
        
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
ProjektListe.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ProjektListe));
	
