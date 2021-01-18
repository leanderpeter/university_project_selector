import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import { ElectivAPI } from '../api';


class ProjektListeEintrag extends Component {

  constructor(props) {
    super(props);

    this.state = {
      projekt: props.projekt,
      projektarten: [],
      showProjektForm: false,
      showProjektDeleteDialog: false,
      teilnahmeButtonDisabled: false,
      teilnahmeAbwaehlenButtonDisabled: true,
      teilnahmeChanged: false,
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
    event.stopPropagation()
    //Logik fuer Teilnahme Button
    this.setState({ teilnahmeButtonDisabled: true });
    this.setState({ teilnahmeAbwaehlenButtonDisabled: false });
    this.state.projekt.anzahlTeilnehmer = this.state.projekt.anzahlTeilnehmer + 1;
    ElectivAPI.getAPI().setTeilnahme(this.props.projekt.id, this.props.currentStudent.id);
  }

  teilnahmeAbwaehlenButtonClicked = event => {
    event.stopPropagation()
    //Logik fuer Teilnahme Button
    this.setState({ teilnahmeButtonDisabled: false });
    this.setState({ teilnahmeAbwaehlenButtonDisabled: true });
    this.state.projekt.anzahlTeilnehmer = this.state.projekt.anzahlTeilnehmer - 1;
    ElectivAPI.getAPI().deleteTeilnahme(this.props.projekt.id, this.props.currentStudent.id);
    this.setState({ teilnahmeChanged: true })
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


  /**
     <Button className={classes.teilnahmeAbwaehlenButton} variant='contained' size="small" color='primary' startIcon={<AddIcon />} onClick={this.teilnahmeAbwaehlenButtonClicked} disabled={this.state.teilnahmeAbwaehlenButtonDisabled}>
                    Teilnahme abwählen
                 </Button>
                 <Button className={classes.teilnahmeButton} variant='contained' color='primary' size="small" startIcon={<AddIcon />} onClick={this.teilnahmeButtonClicked} disabled={this.state.teilnahmeButtonDisabled}>
                    Teilnahme
                 </Button>
  
  */
  //small comment
  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states projekt
    const { projekt, projektarten } = this.state;

    if (this.props.currentStudent != null && !this.state.teilnahmeChanged && this.props.projekt.teilnehmerListe.indexOf(this.props.currentStudent.id) > -1) {
      this.state.teilnahmeButtonDisabled = true;
      this.state.teilnahmeAbwaehlenButtonDisabled = false;
    }

    console.log(projektarten.length)

    return (
      <div>
        <Accordion className={classes.root} defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`projekt${projekt.getID()}Infopanel-header`}
          >
            <Grid container spacing={2} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{projekt.getname()} bei {projekt.getbetreuer()} </Typography>
              </Grid>
              <Grid item xs />
              <Grid item>
                <Typography variant='body1' color={'success.main'}>{projekt.getAnzahlTeilnehmer()} / {projekt.getmax_teilnehmer()} Plätze besetzt
                </Typography>
              </Grid>
              <Grid item>
                {
                  this.state.teilnahmeButtonDisabled ?
                    <Button className={classes.teilnahmeAbwaehlenButton} variant='contained' size="small" color='secondary' onClick={this.teilnahmeAbwaehlenButtonClicked} disabled={this.state.teilnahmeAbwaehlenButtonDisabled}>
                      abwählen
                  </Button>
                    :

                    <Button className={classes.teilnahmeButton} variant='contained' color='primary' size="small" startIcon={<AddIcon />} onClick={this.teilnahmeButtonClicked} disabled={this.state.teilnahmeButtonDisabled}>
                      wählen
                   </Button>
                }
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <Typography variant='body1' color={'textSecondary'}>
              <b>Beschreibung: </b> {projekt.getbeschreibung()} <br />
              <b>Betreuer: </b>{projekt.getbetreuer()}<br />
              <b>Raum: </b>{projekt.getraum()}<br />
              <b>Maximale Teilnehmer: </b>{projekt.getmax_teilnehmer()}<br />
              <b>Externer Partner: </b>{projekt.getexterner_partner()}<br />
              <b>Wöchentlich: </b>{projekt.getwoechentlich() == "1" ? "Ja" : "Nein"}<br />
              <b>Blocktage vor Prüfungsphase: </b>{projekt.getanzahl_block_vor()}<br />
              <b>Blocktage während Prüfungsphase: </b>{projekt.getanzahl_block_in()}<br />
              <b>Sprache: </b>{projekt.getsprache()}<br />
              {projektarten.length > 0 && projekt ?
                <>
                  <b>Projektart: </b>{projektarten[projekt.art - 1].name}<br />
                  <b>SWS: </b>{projektarten[projekt.art - 1].sws}<br />
                  <b>ECTS: </b>{projektarten[projekt.art - 1].ects}<br />
                </>
                :
                <>
                  <b>ECTS noch nicht geladen</b><br />
                </>
              }
              <b>Präferierter Block: </b>{projekt.getpraeferierte_block()}<br />

            </Typography>
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
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  teilnahmeButton: {
    width: 100,
  },
  teilnahmeAbwaehlenButton: {
    width: 100,
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