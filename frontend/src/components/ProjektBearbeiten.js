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

//import ProjektBearbeitenEintrag
import ProjektBearbeitenEintrag from './ProjektBearbeitenEintrag';





  
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






class ProjektBearbeiten extends Component {

    constructor(props){
        super(props);

        this.state = {
            teilnahmen:[],
            studenten:[],
            projekte:[],
            "currentProjekt": null,
            error: null,
            loadingInProgress: false,

            
        };
        this.getTeilnahmenByProjektId=this.getTeilnahmenByProjektId.bind(this)
    }
    //hole alle Projekte im richtigen Zustand vom Backend
    getProjekte = () => {
      ElectivAPI.getAPI().getProjekteByZustand("in Bewertung")
        .then(projekteBOs =>
          this.setState({								//neuer status wenn fetch komplett
            projekte: projekteBOs, 
            loadingInProgress: false,				// deaktiviere ladeindikator
            error: null,
          })).catch(e =>
            this.setState({
              projekte: [],
              loadingInProgress: false,
              error: e
            }));
      // setze laden auf wahr
      this.setState({
        loadingInProgress: true,
        error: null
      });
    }
  
    /*//um alle Projekte zu erhalten aber nicht im richtigen Zustand
    getProjekte=()=>{
      ElectivAPI.getAPI().getProjekte()
      .then(projektBOs =>
        this.setState({
            projekte: projektBOs,
            error: null,
            loadingInProgress: false,
        })).catch(e =>
            this.setState({
                projekt: [],
                error: e,
                loadingInProgress: false,
            }));
      this.setState({
          error: null,
          loadingInProgress: true,
          loadingProjekteError: null
      });
    }
  */

    getTeilnahmenByProjektId=(id)=>{
      ElectivAPI.getAPI().getTeilnahmenByProjektId(id)
      .then(teilnahmeBOs =>
        this.setState({
            
            teilnahmen: teilnahmeBOs,
            error: null,
            loadingInProgress: false,
        })
        
      ).catch(e =>
            this.setState({
                teilnahme: [],
                error: e,
                loadingInProgress: false,
            }));
      this.setState({
          error: null,
          loadingInProgress: true,
          loadingProjekteError: null
      });
    }
    getStudenten=()=>{
      ElectivAPI.getAPI().getStudenten()
      .then(studentBOs =>
        this.setState({
            studenten: studentBOs,
            error: null,
            loadingInProgress: false,
        })).catch(e =>
            this.setState({
                student: [],
                error: e,
                loadingInProgress: false,
            }));
      this.setState({
          error: null,
          loadingInProgress: true,
          loadingProjekteError: null
      });
    }

bewertungAbgeschlossenButtonClicked = event => {
  //Logik fuer bewertung abgeschlossen Button
  ElectivAPI.getAPI().setZustandAtProjekt(this.state.currentProjekt, "Bewertung abgeschlossen").then(()=>{
    this.getProjekte()
    this.getTeilnahmenByProjektId()
  }); 
}



componentDidMount() {
  this.getProjekte();
  this.getStudenten();
  
  
}
handleChange = currentProjekt => (event) => {
  this.setState({
    currentProjekt:event.target.value
  })
  this.getTeilnahmenByProjektId(event.target.value)
};




    render(){

        
        
        
        const { classes } = this.props;
        const {studenten, projekte, currentProjekt, teilnahmen, error, loadingInProgress} = this.state;
        
        return(
            <div className={classes.root}>
                <Paper>
                
                
                <Typography style={{marginTop:"2%",textAlign:"center",position: "relative",}} >Projektname:
                <FormControl style={{paddingLeft: "5px",paddingRight:"50px"}}className={classes.formControl}>
                
                                <Select   style={{display:"flex", minWidth:"5rem",paddingRight:"10px", paddingLeft:"10px",}} value={currentProjekt }  onChange={this.handleChange("currentProjekt")}>
                                  {
                                  projekte.map(projekt =>
                                  <MenuItem value={projekt.getID()}><em>{projekt.getname()}</em></MenuItem>
                                  )
                                  }
                                </Select> 
                
                                <Select   style={{display:"flex", minWidth:"5rem",paddingRight:"10px", paddingLeft:"10px",}} >
                                  {
                                  studenten.map(student =>
                                  <MenuItem value={student.getID()}><em>{student.getname()}</em></MenuItem>
                                  )
                                  }
                                </Select>                                                               

                </FormControl>
                Projekt ID: {currentProjekt}
                </Typography>
                <TableContainer component={Paper} style={{marginTop:"5%", marginBottom:"5%"}}>
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
                           
                            
                            {
                              teilnahmen.map(teilnahme =>
                                <ProjektBearbeitenEintrag key={teilnahme.getID()} teilnahme = {teilnahme} reloadteilnahmen={this.getTeilnahmenByProjektId} />
                              )
                            }

                    
                        </TableBody>
                        
                    </Table>
                    <LoadingProgress show={loadingInProgress} />
                    <ContextErrorMessage error={error} contextErrorMsg = {'Meine Projekte konnten nicht geladen werden'} onReload={this.getTeilnahmen} /> 
                </TableContainer>

                
            
            <Button style={{backgroundColor:"lightgrey", display:"flex",margin:"auto", }} variant="contained" onClick={this.bewertungAbgeschlossenButtonClicked}  >Bewertung abgeben</Button>
              
            
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