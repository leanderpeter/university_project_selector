import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid} from '@material-ui/core';
import {Button} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import {ElectivAPI} from '../api';

/**
 * Es wird ein Projekt angezeigt was darauffolgend in die ProjektListe eingefuegt wird.
 *
 * @see See [ProjektListe](#projektliste)
 *
 *
 */

class ProjektListeEintrag extends Component {

    //gebe einen leeren status
    constructor(props) {
        super(props);
        this.state = {
            projekt: props.projekt,
            projektarten: props.projektarten,
            personen: props.personen,
            showProjektForm: false,
            showProjektDeleteDialog: false,
            teilnahmeButtonDisabled: false,
            teilnahmeAbwaehlenButtonDisabled: true,
            teilnahmeChanged: false,
            ectsAdded: false
        };
    }

    expansionPanelStateChanged = () => {
        this.props.onExpandedStateChange(this.props.projekt);
    }

    // Bei Aufruf wird die Anzahl der Teilnehmer um 1 Person erhoeht sowie eine Teilnahme im Backend fuer den current
    // student hinterlegt. Gleichzeitig wird die ectsCountFunc aufgrufen um ects zu loggen
    teilnahmeButtonClicked = event => {
        event.stopPropagation()
        //Logik fuer Teilnahme Button
        this.setState({
            teilnahmeButtonDisabled: true,
            teilnahmeAbwaehlenButtonDisabled: false,
        });
        this.state.projekt.setAnzahlTeilnehmer(parseInt(this.state.projekt.anzahlTeilnehmer) + 1)
        let ects = this.state.projektarten[this.props.projekt.art - 1].ects
        this.props.ectsCountFunc(ects)
        ElectivAPI.getAPI().setTeilnahme(this.props.projekt.id, this.props.currentStudent.id);
    }

    // Bei Aufruf werden im Projekt die maximalen Teilnehmer um -1 reduziert sowie die teilnahme im backend fuer den current
    // student entfernt. Gleichzeitig wird der Teilnahme Button aktiviert
    teilnahmeAbwaehlenButtonClicked = event => {
        event.stopPropagation()
        //Logik fuer Teilnahme Button
        this.setState({
            teilnahmeButtonDisabled: false,
            teilnahmeAbwaehlenButtonDisabled: true,
        });
        this.state.projekt.setAnzahlTeilnehmer(parseInt(this.state.projekt.anzahlTeilnehmer) - 1)
        let ects = -this.state.projektarten[this.props.projekt.art - 1].ects
        this.props.ectsCountFunc(ects)
        ElectivAPI.getAPI().deleteTeilnahme(this.props.projekt.id, this.props.currentStudent.id);
        this.setState({teilnahmeChanged: true})
    }


    // 
    getInfosMount = () => {
        if (this.props.currentStudent != null && !this.state.teilnahmeChanged && this.props.projekt.teilnehmerListe.indexOf(this.props.currentStudent.id) > -1) {
            this.setState({
                teilnahmeButtonDisabled: true,
                teilnahmeAbwaehlenButtonDisabled: false,
            });
            if (this.props.projektarten.length > 0 && this.props.projekt) {
                let ects = this.props.projektarten[this.props.projekt.art - 1].ects
                this.props.ectsCountFunc(ects)
                this.setState({ectsAdded: true})
            }
        }
    }

    //
    getInfosUpdate = () => {
        if (this.state.ectsAdded === false) {
            this.setState({ectsAdded: true})
            if (this.props.currentStudent != null && this.props.projekt.teilnehmerListe.indexOf(this.props.currentStudent.id) > -1) {
                this.setState({
                    teilnahmeButtonDisabled: true,
                    teilnahmeAbwaehlenButtonDisabled: false,
                });
                if (this.props.projektarten.length > 0 && this.props.projekt) {
                    let ects = this.props.projektarten[this.props.projekt.art - 1].ects
                    this.props.ectsCountFunc(ects)

                }
            }
        }
    }

    // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
    componentDidMount() {
        this.getInfosMount();
    }


    componentWillUnmount() {
        this.setState({
            ectsAdded: false
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.ectsCount === 0 & prevProps.projektarten.length > 0) {
            this.getInfosUpdate()

        }
    }


    /** Renders the component */
    render() {


        const {classes, expandedState, currentStudent, projektarten, personen} = this.props;
        // Use the states projekt
        const {projekt} = this.state;

        return (
            <div>
                <Accordion className={classes.root} defaultExpanded={false} expanded={expandedState}
                           onChange={this.expansionPanelStateChanged}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        id={`projekt${projekt.getID()}Infopanel-header`}
                    >
                        <Grid container spacing={2} justify='flex-start' alignItems='center'>
                            <Grid item>
                                <Typography variant='body1'
                                            className={classes.heading}>{projekt.getname()} bei {personen[projekt.getdozent() - 1].name} </Typography>
                            </Grid>
                            <Grid item xs/>
                            <Grid item>
                                <Typography variant='body1'
                                            color={'success.main'}>{projekt.getAnzahlTeilnehmer()} / {projekt.getmax_teilnehmer()} Plätze
                                    besetzt
                                </Typography>
                            </Grid>
                            <Grid item>
                                {
                                    currentStudent ?
                                        <>

                                            {
                                                this.state.teilnahmeButtonDisabled ?
                                                    <Button className={classes.teilnahmeAbwaehlenButton}
                                                            variant='contained' size="small" color='secondary'
                                                            onClick={this.teilnahmeAbwaehlenButtonClicked}
                                                            disabled={this.state.teilnahmeAbwaehlenButtonDisabled}>
                                                        abwählen
                                                    </Button>
                                                    :

                                                    <Button className={classes.teilnahmeButton} variant='contained'
                                                            color='primary' size="small" startIcon={<AddIcon/>}
                                                            onClick={this.teilnahmeButtonClicked}
                                                            disabled={this.state.teilnahmeButtonDisabled || this.state.projekt.anzahlTeilnehmer >= this.state.projekt.max_teilnehmer}>
                                                        wählen
                                                    </Button>
                                            }
                                        </>
                                        :
                                        null
                                }
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails className={classes.details}>
                        <Typography variant='body1' color={'textSecondary'}>
                            <b>Beschreibung: </b> {projekt.getbeschreibung()} <br/>
                            <b>Betreuer: </b>{projekt.getbetreuer()}<br/>
                            <b>Raum: </b>{projekt.getraum()}<br/>
                            <b>Maximale Teilnehmer: </b>{projekt.getmax_teilnehmer()}<br/>
                            <b>Externer Partner: </b>{projekt.getexterner_partner()}<br/>
                            <b>Wöchentlich: </b>{projekt.getwoechentlich() === "1" ? "Ja" : "Nein"}<br/>
                            <b>Blocktage vor Prüfungsphase: </b>{projekt.getanzahl_block_vor()}<br/>
                            <b>Blocktage während Prüfungsphase: </b>{projekt.getanzahl_block_in()}<br/>
                            <b>Sprache: </b>{projekt.getsprache()}<br/>
                            {projektarten.length > 0 && projekt ?
                                <>
                                    <b>Projektart: </b>{projektarten[projekt.art - 1].name}<br/>
                                    <b>SWS: </b>{projektarten[projekt.art - 1].sws}<br/>
                                    <b>ECTS: </b>{projektarten[projekt.art - 1].ects}<br/>
                                </>
                                :
                                <>
                                    <b>ECTS noch nicht geladen</b><br/>
                                </>
                            }
                            <b>Präferierter Block: </b>{projekt.getpraeferierte_block()}<br/>

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
    },
});

/** PropTypes */
ProjektListeEintrag.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    expandedState: PropTypes.bool.isRequired,
    onExpandedStateChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(ProjektListeEintrag);