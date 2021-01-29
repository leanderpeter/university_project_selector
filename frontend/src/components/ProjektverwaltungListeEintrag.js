import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { ElectivAPI } from '../api';
import ProjektForm from './dialogs/ProjektForm';


class ProjektverwaltungListeEintrag extends Component {

    constructor(props) {
        super(props);

        // Status initalisieren
        this.state = {
            projekt: props.projekt,
            projektarten: [],
            showProjektForm: false,
            showProjektDeleteDialog: false,
            dozentName: ""
        };
    }

    // Handles events wenn sich der status der oeffnung aendert
    expansionPanelStateChanged = () => {
        this.props.onExpandedStateChange(this.props.projekt);
    }

    annehmenButtonClicked = event => {
        event.stopPropagation()
        //Logik fuer annehmen Button
        this.setState({ projektAnnehmenButton: true });
        this.setState({ projektAblehnenButton: true });
        ElectivAPI.getAPI().setZustandAtProjekt(this.props.projekt.id, "Genehmigt");
    }

    ablehnenButtonClicked = event => {
        event.stopPropagation()
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

    // API Anbindung um Dozent vom Backend zu bekommen 
    getPerson = () => {
        ElectivAPI.getAPI().getPerson(this.state.projekt.dozent)
        .then(personBO =>
            this.setState({
                dozentName: personBO.getname(),
                error: null,
                loadingInProgress: false,
            }))
            .catch(e =>
                this.setState({
                    dozentName: null,
                    error: e,
                    loadingInProgress: false,
                }));
        this.setState({
            error: null,
            loadingInProgress: true
        });
      }

    // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
    componentDidMount() {
        this.getPerson();
    }


    /** Renders the component */
    render() {
        const { classes, expandedState, projektarten } = this.props;
        // Use the states projekt
        const { projekt, showProjektForm, dozentName } = this.state;


        return (
            <div>
                <Accordion className={classes.root} defaultExpanded={false} expanded={expandedState}
                    onChange={this.expansionPanelStateChanged}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        id={`projekt${projekt.getID()}Infopanel-header`}
                    >
                        <Grid container spacing={1} justify='flex-start' alignItems='center'>
                            <Grid item>
                                <Typography variant='body1'
                                    className={classes.heading}>{projekt.getname()} bei {dozentName} </Typography>
                                <Typography variant='body1' color={'success.main'}>
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
                            <b>Betreuer: </b>{projekt.getbetreuer()}<br />
                            <b>Raum: </b>{projekt.getraum()}<br />
                            <b>Maximale Teilnehmer: </b>{projekt.getmax_teilnehmer()}<br />
                            <b>Externe Partner: </b>{projekt.getexterner_partner()}<br />
                            <b>Wöchentlich: </b>{projekt.getwoechentlich() === "1" ? "Ja" : "Nein"}<br />
                            <b>Blocktage vor der Prüfungsphase: </b>{projekt.getanzahl_block_vor()}<br />
                            <b>Blocktage während der Prüfungsphase: </b>{projekt.getanzahl_block_in()}<br />
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
                    <AccordionDetails>
                        <Grid container justify="flex-end" alignItems="center" spacing={2}>
                            <Grid item>
                                <Button className={classes.projektAnnehmenButton} variant='contained' size="small"
                                    color='primary' startIcon={<AddIcon />} onClick={this.annehmenButtonClicked}
                                    disabled={this.state.projektAnnehmenButton}>
                                    Annehmen
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button className={classes.projektAblehnenButton} variant='contained' size="small"
                                    color='secondary' startIcon={<RemoveIcon />} onClick={this.ablehnenButtonClicked}
                                    disabled={this.state.projektAblehnenButton}>
                                    Ablehnen
                                </Button>
                            </Grid>
                        </Grid>
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
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
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