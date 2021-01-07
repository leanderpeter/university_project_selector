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

        this.state = {
                projekt: props.projekt,
                showProjektForm: false,
                showProjektDeleteDialog: false,
                teilnahmeButtonDisabled:false,
                teilnahmeAbwaehlenButtonDisabled:true,
                teilnahmeChanged : false,
                projektarten: [],
                pArten: null

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
      this.setState({teilnahmeButtonDisabled:true});
      this.setState({teilnahmeAbwaehlenButtonDisabled:false});
      this.state.projekt.anzahlTeilnehmer = this.state.projekt.anzahlTeilnehmer + 1;
    	ElectivAPI.getAPI().setTeilnahme(this.props.projekt.id, this.props.currentStudent.id);
  }

  teilnahmeAbwaehlenButtonClicked = event => {
    //Logik fuer Teilnahme Button
    this.setState({teilnahmeButtonDisabled:false});
    this.setState({teilnahmeAbwaehlenButtonDisabled:true});
    this.state.projekt.anzahlTeilnehmer = this.state.projekt.anzahlTeilnehmer - 1;
    ElectivAPI.getAPI().deleteTeilnahme(this.props.projekt.id, this.props.currentStudent.id);
    this.setState({teilnahmeChanged:true})
}

  getProjektart = () => {
    ElectivAPI.getAPI().getProjektart().then(projektartBOs =>
      this.setState({
        projektarten: projektartBOs
      })).catch(e => 
    this.setState({
      //projektarten: []
    }));
  }


  componentDidMount() {
    this.getProjektart();
  }



	/** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states projekt
    const { projekt, projektarten, getprojektartArray} = this.state;
    var i = projektarten[(this.props.projekt.art)-1];

    	if(this.props.currentStudent != null && !this.state.teilnahmeChanged && this.props.projekt.teilnehmerListe.indexOf(this.props.currentStudent.id)> -1){
            this.state.teilnahmeButtonDisabled = true;
            this.state.teilnahmeAbwaehlenButtonDisabled = false;
            console.log(this.state);
		}
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

              <Button className={classes.teilnahmeAbwaehlenButton} variant='contained' size="small" color='primary' startIcon={<AddIcon />} onClick={this.teilnahmeAbwaehlenButtonClicked} disabled={this.state.teilnahmeAbwaehlenButtonDisabled}>
                  Teilnahme abwählen
               </Button>
               <Button className={classes.teilnahmeButton} variant='contained' color='primary' size="small" startIcon={<AddIcon />} onClick={this.teilnahmeButtonClicked} disabled={this.state.teilnahmeButtonDisabled}>
                  Teilnahme
               </Button>

              <Grid item>
              	<Typography variant='body2' color={'textSecondary'}></Typography>
            	</Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant='body1' color={'textSecondary'}>{projekt.getbeschreibung()}</Typography>
            <Typography variant='body1' color={'textSecondary'}>Findet statt in Raum {projekt.getraum()}</Typography>
            <Typography variant='body1' color={'textSecondary'}>{JSON.stringify(i)} ECTS</Typography>
            
          </AccordionDetails>
          <AccordionDetails>
            <Typography variant='body1' color={'textSecondary'}>{projekt.getbeschreibung()}</Typography>
            <Typography variant='body1' color={'textSecondary'}>Findet statt in Raum {projekt.getraum()}</Typography>
            <Typography variant='body1' color={'textSecondary'}>Dieses Projekt ist ein: </Typography>
            
          </AccordionDetails>
          <AccordionDetails>


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
    right: theme.spacing(32),
    bottom: theme.spacing(3)
  },
  teilnahmeAbwaehlenButton: {
    position: 'absolute',
    right: theme.spacing(6),
    bottom: theme.spacing(3),

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