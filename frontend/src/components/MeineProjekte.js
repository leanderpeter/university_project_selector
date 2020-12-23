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
      '&:nth-of-type(4n+1)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);


class MeineProjekte extends Component {

    constructor(props){
        super(props);

        let expandedID = null;

        if (this.props.location.expandTeilnahme){
            expandedID = this.props.location.expandTeilnahme.getID();
        }


        this.state = {
            teilnahmen : [],
            currentStudentName: null,
            currentStudentmat_nr: null,
            error: null,
            loadingInProgress: false, 
            expandedTeilnahmeID: expandedID,
        };
    }



    // API Anbindung um Teilnahmen des Students vom Backend zu bekommen 
    getTeilnahmen = () => {
            ElectivAPI.getAPI().getTeilnahmen(this.props.currentStudent.id)
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

    printSemesterbericht= () => {
      window.print()
    }

    componentDidMount() {
        this.getTeilnahmen();
        this.setState({
            currentStudentName: this.props.currentStudent.getname(),
            currentStudentmat_nr: this.props.currentStudent.getmat_nr(),
        })
    }

    onExpandedStateChange = teilnahme => {
        //  Zum anfang Teilnahme Eintrag = null
        let newID = null;
    
        // Falls ein Objekt geclicket wird, collapse
        if (teilnahme.getID() !== this.state.expandedTeilnahmeID) {
          // Oeffnen mit neuer Teilnahme ID
          newID = teilnahme.getID()
        }
        this.setState({
          expandedTeilnahmeID: newID,
        });
    
      }

    render(){

        const { classes } = this.props;
        const { teilnahmen, currentStudentName, currentStudentmat_nr, expandedTeilnahmeID, error, loadingInProgress} = this.state;
        
        return(
            <div className={classes.root}>
                <Typography>Projekte von {currentStudentName}, Matrikelnummer: {currentStudentmat_nr}</Typography>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Projekte</StyledTableCell>
                                <StyledTableCell align="center">Semester</StyledTableCell>
                                <StyledTableCell align="center">Dozent</StyledTableCell>
                                <StyledTableCell align="center">Note</StyledTableCell>
                                <StyledTableCell align="center">Modulzuweisung</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {
                                teilnahmen ?
                                <>
                                {
                                    teilnahmen.map(teilnahme => 
                                        <MeineProjekteEintrag key={teilnahme.getID()} teilnahme = {teilnahme} 
                                        getTeilnahmen = {this.getTeilnahmen}
                                        expandedState={expandedTeilnahmeID === teilnahme.getID()}
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
                    <LoadingProgress show={loadingInProgress} />
                    <ContextErrorMessage error={error} contextErrorMsg = {'Deine Projekte konnten nicht geladen werden'} onReload={this.getTeilnahmen} /> 
                </TableContainer>
                <Button variant="contained" color="primary" size="medium" className={classes.button} startIcon={<SaveIcon />} onClick={this.printSemesterbericht}>
                Notenspiegel
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
      },
      table: {
        minWidth: 700,
      },
      button:{
          marginTop: theme.spacing(2),
          marginBottom: theme.spacing(3),
          float: 'right'
      },
      page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
      },
      section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
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



