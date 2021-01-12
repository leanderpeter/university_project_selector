import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { ElectivAPI } from '../api';
import ProjektForm from './dialogs/ProjektForm';
import ProjektDelete from './dialogs/ProjektDelete';
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
      projektarten: [],
			showProjektForm: false,
      showProjektDeleteDialog: false,
		};
	}

	// Handles events wenn sich der status der oeffnung aendert
	expansionPanelStateChanged = () => {
		this.props.onExpandedStateChange(this.props.projekt);

    /*
		// Teilnahme Button deaktivieren, sofern Teilnehmer bereits in Projekt eingeschrieben
		if( this.props.projekt.teilnehmerListe.indexOf(this.props.currentStudent.id)> -1){
		    this.setState({teilnahmeButtonDisabled:true});
		}
    */
  }
  
  getProjekte = () => {
    this.props.getProjekte();
  }

  projektFormClosed = (projekt) => {
    if (projekt){
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

	bearbeitenButtonClicked = event => {
    event.stopPropagation();
    this.setState({
      showProjektForm: true
    });
  }
  
  projektDeleteButtonClicked =  event => {
    event.stopPropagation();
    this.setState({
      showProjektDeleteDialog: true
    });
  }

  projektDeleteClosed = () => {
      this.setState({
        showProjektDeleteDialog: false
      });
      this.getProjekte();
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
    const { classes, expandedState} = this.props;
    // Use the states projekt
    const { projekt, projektarten, showProjektForm, showProjektDeleteDialog} = this.state;

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
            <Typography variant='body1' color={'textSecondary'}>
                <b>Beschreibung: </b> {projekt.getbeschreibung()} <br />
                <b>Raum: </b>{projekt.getraum()}<br />
                <b>Maximale Teilnehmer: </b>{projekt.getmax_teilnehmer()}<br />
                <b>Betreuer: </b>{projekt.getbetreuer()}<br />
                <b>Externer Partner: </b>{projekt.getexterner_partner()}<br />
                <b>Wöchentlich: </b>{projekt.getwoechentlich() == "1" ? "Ja" : "Nein"}<br />
                <b>Anzahl Block vor: </b>{projekt.getanzahl_block_vor()}<br />
                <b>Anzahl Block in: </b>{projekt.getanzahl_block_in()}<br />
                <b>Sprache: </b>{projekt.getsprache()}<br />
                {projektarten.length > 0 && projekt ? 
                <>
                <b>Projektart: </b>{projektarten[projekt.art-1].name}<br />
                <b>SWS: </b>{projektarten[projekt.art-1].sws}<br />
                <b>ECTS: </b>{projektarten[projekt.art-1].ects}<br />
                </>
                :
                <>
                <b>ECTS noch nicht geladen</b><br />
                </>
                }
                <b>Präferierter Block: </b>{projekt.getpraeferierte_block()}<br />

            </Typography>
          </AccordionDetails>
          <AccordionDetails>
          <Grid container justify="flex-end" alignItems="center" spacing={2}>
            <Grid item>
              <Tooltip title='Löschen' placement="left">
                <IconButton className={classes.projektDeleteButton}  variant="contained"  onClick={this.projektDeleteButtonClicked}><DeleteIcon /></IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Button id='btn' className={classes.bearbeitenButton} variant='contained' color='primary' onClick={this.bearbeitenButtonClicked}>
              Bearbeiten
              </Button>
            </Grid>
          </Grid>
          </AccordionDetails>
        </Accordion>
        <ProjektForm show={showProjektForm} projekt={projekt} onClose={this.projektFormClosed} getProjekte= {this.getProjekte}/>
        <ProjektDelete show={showProjektDeleteDialog} projekt={projekt} onClose={this.projektDeleteClosed} />
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },

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