import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import { ElectivAPI } from '../api';
import ProjektForm from './dialogs/ProjektForm';
/*
import CustomerDeleteDialog from './dialogs/CustomerDeleteDialog';
import AccountList from './AccountList';
*/

//Muss noch geschrieben werden!

var InfoList = null;
var ProjektDeleteDialog = null;


class ProjektDozentListeEintrag extends Component {

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

		// Teilnahme Button deaktivieren, sofern Teilnehmer bereits in Projekt eingeschrieben
		if( this.props.projekt.teilnehmerListe.indexOf(this.props.currentStudent.id)> -1){
		    this.setState({teilnahmeButtonDisabled:true});
		}
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
    	this.setState({teilnahmeButtonDisabled:true});
    	ElectivAPI.getAPI().setTeilnahme(this.props.projekt.id, this.props.currentStudent.id);
	}

	/** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states projekt
    const { projekt, showProjektForm} = this.state;

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
                <Typography variant='body1' className={classes.heading}>{projekt.getname()} bei {projekt.getbetreuer()} </Typography> <Typography variant='body1' color={'success.main'}>{projekt.getAnzahlTeilnehmer()} / {projekt.getmax_teilnehmer()} Plätze besetzt
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
          <Button id='btn' className={classes.teilnahmeButton} variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.teilnahmeButtonClicked} disabled={this.state.teilnahmeButtonDisabled}>
          Teilnahme
        </Button>
            
          </AccordionDetails>
        </Accordion>
        <ProjektForm show={showProjektForm} projekt={projekt} onClose={this.projektFormClosed} />

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
ProjektDozentListeEintrag.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ProjektBO to be rendered */
  projekt: PropTypes.object.isRequired,
  /** The state of this ProjektDozentListeEintrag. If true the projekt is shown with its accounts */
  expandedState: PropTypes.bool.isRequired,
  /** The handler responsible for handle expanded state changes (exanding/collapsing) of this ProjektDozentListeEintrag 
   * 
   * Signature: onExpandedStateChange(projektBo projekt)
   */
  onExpandedStateChange: PropTypes.func.isRequired,
  /** 
   *  Event Handler function which is called after a sucessfull delete of this customer.
   * 
   * Signature: onProjektDelete(projektBO projekt)
   */
  onProjektDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(ProjektDozentListeEintrag);