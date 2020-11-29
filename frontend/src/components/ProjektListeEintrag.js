import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
/*
import CustomerForm from './dialogs/CustomerForm';
import CustomerDeleteDialog from './dialogs/CustomerDeleteDialog';
import AccountList from './AccountList';
*/

class ProjektListEntry extends Component {

	constructor(props) {
		super(props);

		// Status initalisieren
		this.state = {
			projekt: props.projekt;
			showProjektForm: false;
			showProjektDeleteDialog: false;

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

	/** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states projekt
    const { projekt, showProjektForm, showProjektDeleteDialog } = this.state;

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
                <Typography variant='body1' className={classes.heading}>{projekt.get_name()}, {}
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup variant='text' size='small'>
                  <Button color='primary' onClick={this.editProjektButtonClicked}>
                    edit
                  </Button>
                  <Button color='secondary' onClick={this.deleteProjektButtonClicked}>
                    delete
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs />
              <Grid item>
                <Typography variant='body2' color={'textSecondary'}>List of Infos</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <InfoList show={expandedState} projekt={projekt} />
          </AccordionDetails>
        </Accordion>
        <ProjektForm show={showProjektForm} projekt={projekt} onClose={this.projektFormClosed} />
        <ProjektDeleteDialog show={showProjektDeleteDialog} projekt={projekt} onClose={this.deleteProjektDialogClosed} />
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  }
});

/** PropTypes */
CustomerListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The CustomerBO to be rendered */
  customer: PropTypes.object.isRequired,
  /** The state of this CustomerListEntry. If true the customer is shown with its accounts */
  expandedState: PropTypes.bool.isRequired,
  /** The handler responsible for handle expanded state changes (exanding/collapsing) of this CustomerListEntry 
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

export default withStyles(styles)(CustomerListEntry);