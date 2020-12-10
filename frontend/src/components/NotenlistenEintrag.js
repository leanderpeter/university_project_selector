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
			showModulForm: false
		};
	}

	// Handles events wenn sich der status der oeffnung aendert
	expansionPanelStateChanged = () => {
		this.props.onExpandedStateChange(this.props.modul);

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

	/** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states projekt
    const { modul, showModulForm } = this.state;

    // console.log(this.state);
    return (
    <div>
        <Accordion className={classes.accordion} defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
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
                        <StyledTableRow>
                                <StyledTableCell align="left">Jannik Merz</StyledTableCell>
                                <StyledTableCell align="left">38631</StyledTableCell>
                                <StyledTableCell align="center">2.0</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell align="left">Jannik Merz</StyledTableCell>
                                <StyledTableCell align="left">38631</StyledTableCell>
                                <StyledTableCell align="center">2.0</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell align="left">Jannik Merz</StyledTableCell>
                                <StyledTableCell align="left">38631</StyledTableCell>
                                <StyledTableCell align="center">2.0</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
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