import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import { ElectivAPI } from '../api';
/*
import CustomerForm from './dialogs/CustomerForm';
import CustomerDeleteDialog from './dialogs/CustomerDeleteDialog';
import AccountList from './AccountList';
*/

//Muss noch geschrieben werden!

var InfoList = null;
var ProjektForm = null;
var ProjektDeleteDialog = null;


class ProjektListeEintrag extends Component {

	constructor(props) {
		super(props);

		// Status initalisieren
		this.state = {
			projekt: props.projekt,
			showProjektForm: false,
			showProjektDeleteDialog: false

		};
	}

	// Handles events wenn sich der status der oeffnung aendert
	expansionPanelStateChanged = () => {
		this.props.onExpandedStateChange(this.props.projekt);
	}

	// Kummert sich um das loschen des Projekts
	deleteProjektHandler = (deletedProjekt) => {
		//Delete CODE
	}

	// Kummert sich um den Edit Button
	editProjektButtonClicked = (event) => {
		//Edit Button Code
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
				showProjektForm: false
			});
		}
	}

	// Handles click of Projekt delete Button
	deleteProjektButtonClicked = (event) => {
		// DELETE ACTION CODE
	}

	// Handles Close event of Projektdeletedialog
	deleteProjektDialogClosed = (projekt) => {
		// MORE CODE!
	}
	setTeilnahmeAnProjekt = () => {

	}

	teilnahmeButtonClicked = event => {
    	//Logik fuer Teilnahme Button
    	ElectivAPI.getAPI().setTeilnahme(this.props.projekt.id);
	}

	/** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states projekt
    const { projekt } = this.state;

    // console.log(this.state);
    return (
      <div>
        <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`projekt${projekt.getID()}Infopanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{projekt.getname()} bei {projekt.getbetreuer()} </Typography> <Typography variant='body1' color={'success.main'}> {projekt.getmax_teilnehmer()}/0 Plätze besetzt
                </Typography>
              </Grid>
              <Grid item xs />
              <Grid item>
              	<Typography variant='body2' color={'textSecondary'}>Details</Typography>
            	</Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant='body1' color={'textSecondary'}>{projekt.getbeschreibung()}</Typography>
            <Typography variant='body1' color={'textSecondary'}>Findet statt in Raum {projekt.getraum()}</Typography>
            
          </AccordionDetails>
          <AccordionDetails>
          <Button id='btn' className={classes.teilnahmeButton} variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.teilnahmeButtonClicked}>
          Teilnahme
        </Button>
            
          </AccordionDetails>
        </Accordion>
              
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  teilnahmeButton: {
    position: 'absolute',
    right: theme.spacing(3),
    bottom: theme.spacing(0),
  }
});

/** PropTypes */
ProjektListeEintrag.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The CustomerBO to be rendered */
  customer: PropTypes.object.isRequired,
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
  onCustomerDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(ProjektListeEintrag);