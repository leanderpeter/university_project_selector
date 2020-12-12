import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import { ElectivAPI } from '../api';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';

import EdvListeEintrag from './EdvListeEintrag';



const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.darkgrey,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


class NotenlistenEintrag extends Component {

	constructor(props) {
		super(props);

		// Status initalisieren
		this.state = {
      modul: props.modul,
      teilnahmen : [],
      showModulForm: false,
      error: null,
      loadingInProgress: false
		};
	}

	// Handles events wenn sich der status der oeffnung aendert
	expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.modul);
    this.getTeilnahmen_by_modul_und_semester();
    console.log(this.props.modul.getID(),'Modul', this.props.semesterwahl, 'SEM')
	}

	// Kummert sich um das close event vom ProjektForm
	modulFormClosed = (modul) => {
		if ( modul ) {
			this.setState({
				modul: modul,
				showModulForm: false
			});
		}else {
			this.setState({
				showModulForm: false
			});
		}
  }

  // API Anbindung um Teilnahmen des Students vom Backend zu bekommen 
  getTeilnahmen_by_modul_und_semester = () => {
    ElectivAPI.getAPI().getTeilnahmen_by_modul_und_semester(this.props.modul.getID(), this.props.semesterwahl)
    .then(teilnahmeBOs =>
        this.setState({
            teilnahmen: teilnahmeBOs,
            error: null,
            loadingInProgress: false,
        })).catch(e =>
            this.setState({
                teilnahmen: [],
                error: e,
                loadingInProgress: false,
            }));
    this.setState({
        error: null,
        loadingInProgress: true,
        loadingTeilnahmeError: null
    });
  }



	/** Renders the component */
  render() {
    const { classes, expandedState, semesterwahl } = this.props;
    // Use the states projekt
    const { modul, teilnahmen, showModulForm } = this.state;

    // console.log(this.state);
    return (
    <div>
        <Accordion className={classes.accordion} defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}> 
        {/* evtl. nur beim Öffnen ausführen implementieren Problem jetzt: auch beim schließen wird Backend anfrage erstellt */}
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id={`modul${modul.id}Infopanel-header`} >
                <Grid container spacing={1} justify='flex-start' alignItems='center'>
                    <Grid item>
                        <Typography variant='body1' className={classes.heading}>EDV-Nummer: {modul.edv_nr} </Typography> 
                    </Grid>
                    <Grid item xs/>
                    <Grid item>
                        <Typography variant='body2' color={'textSecondary'}>Alle Teilnahmen</Typography>
                    </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails className={classes.nopadding}>
            { semesterwahl ?
            <TableContainer>
                  <Table className={classes.table} aria-label="customized table">
                      <TableHead>
                          <StyledTableRow>
                              <StyledTableCell align="left">Student</StyledTableCell>
                              <StyledTableCell align="left">Matrikelnummer</StyledTableCell>
                              <StyledTableCell align="center">Note</StyledTableCell>
                          </StyledTableRow>
                      </TableHead>
                      <TableBody>
                        {
                                teilnahmen ?
                                <>
                                {
                                    teilnahmen.map(teilnahme => 
                                        <EdvListeEintrag key={teilnahme.getID()} teilnahme = {teilnahme}
                                        onExpandedStateChange={this.onExpandedStateChange}
                                        show={this.props.show}
                                    />) 
                                }
                                </>
                                :
                                <></>
                            }
                      </TableBody>
                    </Table>
              </TableContainer>
            :
            <Grid container justify-content='center 'alignItems='center'>
              <Grid item xs><Typography variant='body1' className={classes.warnung}> Bitte wählen Sie zunächst ein Semester aus</Typography></Grid>
            </Grid>
            }
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
  accordion: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  nopadding: {
    padding: theme.spacing(0),
  },
  warnung: {
    marginLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    color: 'red'
  }
});

/** PropTypes */
NotenlistenEintrag.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  expandedState: PropTypes.bool.isRequired,
  onExpandedStateChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(NotenlistenEintrag);