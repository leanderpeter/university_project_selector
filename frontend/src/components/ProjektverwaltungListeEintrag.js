import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import { ElectivAPI } from '../api';
import ProjektForm from './dialogs/ProjektForm';


class ProjektverwaltungListeEintrag extends Component {

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

  annehmenButtonClicked = event => {
    //Logik fuer annehmen Button
    this.setState({ projektAnnehmenButton: true });
    this.setState({ projektAblehnenButton: true });
    ElectivAPI.getAPI().setZustandAtProjekt(this.props.projekt.id, "Genehmigt");
  }

  ablehnenButtonClicked = event => {
    //Logik fuer ablehnen Button
    this.setState({ projektAnnehmenButton: true });
    this.setState({ projektAblehnenButton: true });
    ElectivAPI.getAPI().setZustandAtProjekt(this.props.projekt.id, "Abgelehnt");
  }


  // Kummert sich um das close event vom ProjektForm
  projektFormClosed = (projekt) => {
    if (projekt) {
      this.setState({
        projekt: projekt,
        showProjektForm: false
      });
    } else {
      this.setState({
        showProjektForm: false
      });
    }
  }



  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states projekt
    const { projekt, showProjektForm } = this.state;



    return (
      <div>
        <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`projekt${projekt.getID()}Infopanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{projekt.getname()} bei {projekt.getbetreuer()} </Typography> <Typography variant='body1' color={'success.main'}>
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
            <Button className={classes.projektAnnehmenButton} variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.annehmenButtonClicked} disabled={this.state.projektAnnehmenButton}>
              Annehmen
        </Button>
            <Button className={classes.projektAblehnenButton} variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.ablehnenButtonClicked} disabled={this.state.projektAblehnenButton}>
              Ablehnen
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
  projektAnnehmenButton: {
    position: 'absolute',
    right: theme.spacing(22),
    bottom: theme.spacing(0),
  },
  projektAblehnenButton: {
    position: 'absolute',
    right: theme.spacing(3),
    bottom: theme.spacing(0),
  }
});

/** PropTypes */
ProjektverwaltungListeEintrag.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ProjektBO to be rendered */
  projekt: PropTypes.object.isRequired,
  /** The state of this ProjektverwaltungListeEintrag. If true the projekt is shown with its accounts */
  expandedState: PropTypes.bool.isRequired,
  /** The handler responsible for handle expanded state changes (exanding/collapsing) of this ProjektverwaltungListeEintrag 
   * 
   * Signature: onExpandedStateChange(projektBo projekt)
   */
  onExpandedStateChange: PropTypes.func.isRequired,

}

export default withStyles(styles)(ProjektverwaltungListeEintrag);