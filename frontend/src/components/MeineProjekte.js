import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ElectivAPI from '../api/ElectivAPI';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import SaveIcon from '@material-ui/icons/Save';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TableFooter from '@material-ui/core/TableFooter';

//import MeineProjekteEintrag
import MeineProjekteEintrag from './MeineProjekteEintrag';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.primary.main,
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


class MeineProjekte extends Component {

    constructor(props){
        super(props);

        let expandedID = null;

        if (this.props.location.expandProjekt){
            expandedID = this.props.location.expandProjekt.getID();
        }


        this.state = {
            projekte : [],
            currentStudentName: null,
            currentStudentmat_nr: null,
            error: null,
            loadingInProgress: false, 
            expandedProjektID: expandedID,
        };
    }


    // API Anbindung um Projekte vom Backend zu bekommen 
    getMeineProjekte = () => {
            ElectivAPI.getAPI().getMeineProjekte(this.props.currentStudent.id)
            .then(projekteBOs =>
                this.setState({
                    projekte: projekteBOs,
                    error: null,
                    loadingInProgress: false,
                })).catch(e =>
                    this.setState({
                        projekte: [],
                        error: e,
                        loadingInProgress: false,
                    }));
            this.setState({
                error: null,
                loadingInProgress: true,
                loadingProjektError: null
            });
    }

    componentDidMount() {
        this.getMeineProjekte();
        this.setState({
            currentStudentName: this.props.currentStudent.getname(),
            currentStudentmat_nr: this.props.currentStudent.getmat_nr(),
        })
    }

    onExpandedStateChange = projekt => {
        //  Zum anfang Projekt Eintrag = null
        let newID = null;
    
        // Falls ein Objekt geclicket wird, collapse
        if (projekt.getID() !== this.state.expandedProjektID) {
          // Oeffnen mit neuer Projekt ID
          newID = projekt.getID()
        }
        this.setState({
          expandedProjektID: newID,
        });
    
      }

    render(){

        const { classes } = this.props;
        const { projekte, currentStudentName, currentStudentmat_nr, expandedProjektID, error, loadingInProgress} = this.state;
        
        return(
            <div className={classes.root}>
                <Typography>Projekte von {currentStudentName}, Matrikelnummer: {currentStudentmat_nr}</Typography>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Projekte</StyledTableCell>
                                <StyledTableCell align="center">Dozent</StyledTableCell>
                                <StyledTableCell align="center">Note</StyledTableCell>
                                <StyledTableCell align="center">Modulzuweisung</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {
                                projekte.map(projekt => 
                                    <MeineProjekteEintrag key={projekt.getID()} projekt = {projekt} expandedState={expandedProjektID === projekt.getID()}
                                    onExpandedStateChange={this.onExpandedStateChange}
                                    onCustomerDeleted={this.onCustomerDeleted}
                                    show={this.props.show}
                                />) 
                            }
                        </TableBody>
                    </Table>
                    <LoadingProgress show={loadingInProgress} />
                    <ContextErrorMessage error={error} contextErrorMsg = {'Meine Projekte konnten nicht geladen werden'} onReload={this.getProjekte} /> 
                </TableContainer>
                <Button variant="contained" color="primary" size="medium" className={classes.button}startIcon={<SaveIcon />}>
                    Semesterbericht
                </Button>
            </div>
        )
    }
}

/** Component specific styles */
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1)
      },
      content: {
        margin: theme.spacing(1),
      }
  });

/** PropTypes */
MeineProjekte.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** @ignore */
    location: PropTypes.object.isRequired,
	// logged in Firebase user/person
    show: PropTypes.bool.isRequired
}



export default withRouter(withStyles(styles)(MeineProjekte));



