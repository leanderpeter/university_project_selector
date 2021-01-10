import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, TextField, InputAdornment, IconButton, Button, Grid, Typography, Paper } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import { ElectivAPI } from '../api';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import SaveIcon from '@material-ui/icons/Save';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';

import NotenlisteEintrag from './NotenlisteEintrag';

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
    '&:nth-of-type(4n+1)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

class Notenliste extends Component {

	constructor(props) {
		super(props);

		let expandedID = null;

		if (this.props.location.expandModul){
			expandedID = this.props.location.expandModul.getID();
		}

		//gebe einen leeren status
		this.state = {
      module: [],
      semester: [],
      teilnahmen : [],
      semesterwahl: null,
			error: null,
			loadingInProgress: false,
		};
  }
    // API Anbindung um alle Module vom Backend zu bekommen 
    getModule = () => {
      ElectivAPI.getAPI().getModule()
      .then(modulBOs =>
          this.setState({
              module: modulBOs,
              error: null,
              loadingInProgress: false,
          })).catch(e =>
              this.setState({
                  module: [],
                  error: e,
                  loadingInProgress: false,
              }));
      this.setState({
          error: null,
          loadingInProgress: true,
          loadingTeilnahmeError: null
      });
  }

    // API Anbindung um alle Senester vom Backend zu bekommen 
    getSemester = () => {
      ElectivAPI.getAPI().getSemester()
      .then(semesterBOs =>
          this.setState({
              semester: semesterBOs,
              error: null,
              loadingInProgress: false,
          })).catch(e =>
              this.setState({
                  semester: [],
                  error: e,
                  loadingInProgress: false,
              }));
      this.setState({
          error: null,
          loadingInProgress: true,
          loadingTeilnahmeError: null
      });
  }

  handleSemesterChange = (semester) => {
    this.setState({
      semesterwahl: semester.target.value,
    })
    setTimeout(() => {
      console.log('Ausgewählte Semester ID:',this.state.semesterwahl)   
    if (this.state.modulwahl != null) {
      this.getTeilnahmen_by_modul_und_semester();
    }
    }, 0);
  };

  handleModulChange = (modul) => {
    this.setState({
      modulwahl: modul.target.value,
      expandedModulID: null
    })
    setTimeout(() => {
      console.log('Ausgewählte Modul ID:',this.state.modulwahl)   
    if (this.state.semesterwahl != null) {
      this.getTeilnahmen_by_modul_und_semester();
    }
    }, 0);
  };

  printNotenliste= () => {
    window.print()
  }

  handleReload= () => {
    this.getModule();
    this.getSemester();
  }

	// Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
	componentDidMount() {
    this.getModule();
    this.getSemester();
	}


    // API Anbindung um Teilnahmen des Students vom Backend zu bekommen 
    getTeilnahmen_by_modul_und_semester = () => {
      ElectivAPI.getAPI().getTeilnahmen_by_modul_und_semester(this.state.modulwahl, this.state.semesterwahl)
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
    
    const { classes } = this.props;
    const { module, semester, semesterwahl, modulwahl, teilnahmen, loadingInProgress, error } = this.state;
    return (
    <div className={classes.root}>
        <Grid className={classes.header} container spacing={1} justify='flex-start' alignItems='space-between'>
          <Grid item xs={2}>
          {
            semester ?
            <FormControl className={classes.formControl}>
              <InputLabel>Semester</InputLabel> 
                <Select value = {semester.id} onChange={this.handleSemesterChange}>
                  {
                  semester.map(semester =>
                  <MenuItem value={semester.getID()}><em>{semester.getname()}</em></MenuItem>
                  )
                  }
                </Select>                                                                
              </FormControl>                                  
            :
            <FormControl className={classes.formControl}>
              <InputLabel>Semester</InputLabel>
                <Select value="">
                  <MenuItem value=""><em>Semester noch nicht geladen</em></MenuItem>
                </Select>
            </FormControl>
          }
          </Grid>
          <Grid item xs className={classes.marginLeft}>
          { module ?
            <FormControl className={classes.formControl}>
              <InputLabel>Modul</InputLabel> 
                <Select onChange={this.handleModulChange}>
                  { module.map(modul =>
                    <MenuItem value={modul.getID()}><em>{modul.getname()} ({modul.getEdv_nr()})</em></MenuItem>
                    )
                  }
                </Select>
            </FormControl>
            :
            <FormControl className={classes.formControl}>
              <InputLabel>Modul</InputLabel>
               <Select value="">
                 <MenuItem value=""><em>Module noch nicht geladen</em></MenuItem>
                </Select>
            </FormControl>
          }
          </Grid>
        </Grid>
        <Grid item>
        { semesterwahl && modulwahl ?
          <>
            
            {teilnahmen.length > 0 ?
            <>
            <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="customized table">
                      <TableHead>
                          <StyledTableRow>
                              <StyledTableCell align="left">Student</StyledTableCell>
                              <StyledTableCell align="left">Matrikelnummer</StyledTableCell>
                              <StyledTableCell align="left">Dozent</StyledTableCell>
                              <StyledTableCell align="center">Note</StyledTableCell>
                          </StyledTableRow>
                      </TableHead>
                      <TableBody>
                        {
                                teilnahmen ?
                                <>
                                {
                                    teilnahmen.map(teilnahme => 
                                        <NotenlisteEintrag key={teilnahme.getID()} teilnahme = {teilnahme}
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
                <ContextErrorMessage error={error} contextErrorMsg={`Die Notenliste konnte nicht geladen werden`} onReload={this.getTeilnahmen_by_modul_und_semester} />
              </TableContainer>
              <Button variant="contained" color="primary" size="medium" className={classes.button} startIcon={<SaveIcon />} onClick={this.printNotenliste}>
                Notenliste
              </Button> 
              </> 
              :
              <>
              { error ?
              <>
              <LoadingProgress show={loadingInProgress} />
              <ContextErrorMessage error={error} contextErrorMsg={`Die Notenliste konnte nicht geladen werden`} onReload={this.getTeilnahmen_by_modul_und_semester} />
              </>
              :
              <Typography className={classes.warnung}> Leider gibt es für dieses Modul keine Teilnahmen oder es wurde noch keine Teilnahme benotet</Typography>
              }
              </>
              }
            </>
            :
            <>
            <Typography className={classes.warnung}> Bitte wählen Sie zunächst ein Semester und ein Modul aus</Typography>
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={error} contextErrorMsg={`Semester und Module konnten nicht geladen werden`} onReload={this.handleReload}/>
            </>
            }
        </Grid>
    </div>
    );
    }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  header: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  table: {
    minWidth: 700,
  },
  button:{
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    float: 'right'
},
  formControl: {
    minWidth: 150,
  },
  marginLeft: {
    marginLeft: theme.spacing(2)
  },
  warnung: {
    color: 'red',
    paddingTop: theme.spacing(1)
  }
});

/** PropTypes */
Notenliste.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Notenliste));
	
