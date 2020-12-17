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

const projekt=[
    {value:10,
    name: 'Software Engineering'},
    {value:20,
    name:'Marketing'},
    {value:30,
    name: 'Organisation'},

]




class ProjektBearbeiten extends Component {

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
    getProjekte=()=>{
      ElectivAPI.getAPI().getProjekte()
    }

    
    // API Anbindung um Studenten von den Projekten vom Backend zu bekommen 
    getTeilnahmen = () => {
      ElectivAPI.getAPI().getTeilnahmen(this.props.currentProjekt.id)
      .then(teilnahmeBOs =>
          this.setState({
              teilnahmen: teilnahmeBOs,
              error: null,
              loadingInProgress: false,
          })).catch(e =>
              this.setState({
                  teilnahme: [],
                  error: e,
                  loadingInProgress: false,
              }));
      this.setState({
          error: null,
          loadingInProgress: true,
          loadingTeilnahmeError: null
      });
}
    


    



    render(){

        function createData(name, matrikelnr,note) {
            return { name, matrikelnr, note};
          }
          
          const rows = [
            createData('Raphael Müller', 23423,4.0  ),
            createData('Pascal Gienger', 23434,3.7),
            createData('Leander Peter', 43421,2.3),
            createData('Jannik Merz', 24456,5.0),
            createData('Alexander Hofstetter', 13455,1.3),
            createData('Daria Bilyk',24455,1.7),
          ];
        
        
        const { classes } = this.props;
        const { teilnahmen, currentStudentName, currentStudentmat_nr, expandedTeilnahmeID, error, loadingInProgress} = this.state;
        
        return(
            <div className={classes.root}>
                <Paper>
                
                
                <Typography>Projekte von {currentStudentName}</Typography>
                <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Projekt</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                
                                value={projekt}
                                >
                                <MenuItem value={10}>Software Engineering</MenuItem>
                                <MenuItem value={20}>Marketing</MenuItem>
                                <MenuItem value={30}>Organisation</MenuItem>
                                </Select>
                            </FormControl>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell align="center">Student</StyledTableCell>
                                <StyledTableCell align="center">Matrikelnr.</StyledTableCell>
                                <StyledTableCell align="center">Note</StyledTableCell>
                                <StyledTableCell align="center">Teilnahme</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
            <TableRow key={row.name}>
                     
              
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.matrikelnr}</TableCell>
              
              <TableCell align="center">{row.note}</TableCell>
              <TableCell>   
                  <Button style={{backgroundColor:"lightblue", display:"flex",margin:"auto"}} variant="contained" >entfernen</Button>
              </TableCell>
              
              
            </TableRow>
            
          ))}   
        
                     
            </TableBody>
                        
                    </Table>
                    <LoadingProgress show={loadingInProgress} />
                    <ContextErrorMessage error={error} contextErrorMsg = {'Meine Projekte konnten nicht geladen werden'} onReload={this.getTeilnahmen} /> 
                </TableContainer>

                <TableContainer component={Paper}>
                    <Table >
                        <TableHead>
                            <TableRow>
                            
                                <TableCell align="center"><TextField  label="Name" variant="outlined" /></TableCell>
                                <TableCell align="center"><TextField label="Matrikelnummer" variant="outlined" /></TableCell>
                                <TableCell align="center"><TextField  label="Note" variant="outlined" /></TableCell>
                                <Button style={{backgroundColor:"lightblue", display:"flex",margin:"auto",}} variant="contained" >hinzufügen</Button>
                            </TableRow>
                        </TableHead>
                    </Table>
            </TableContainer>
            
            <Button style={{backgroundColor:"lightgrey", display:"flex",margin:"auto", }} variant="contained" >speichern</Button>
              
            
            </Paper>
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
ProjektBearbeiten.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** @ignore */
    location: PropTypes.object.isRequired,
	// logged in Firebase user/person
    show: PropTypes.bool.isRequired
}



export default withRouter(withStyles(styles)(ProjektBearbeiten));