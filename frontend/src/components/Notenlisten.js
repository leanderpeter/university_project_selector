import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, TextField, InputAdornment, IconButton, Grid, Typography, MobileStepper } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import { ElectivAPI } from '../api';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import NotenlistenEintrag from './NotenlistenEintrag';
import ModulBO from '../api/ModulBO';


class Notenlisten extends Component {

	constructor(props) {
		super(props);

		let expandedID = null;

		if (this.props.location.expandModul){
			expandedID = this.props.location.expandModul.getID();
		}

		//gebe einen leeren status
		this.state = {
			module: [],
			filteredModule: [],
			edvFilter: '',
			error: null,
			loadingInProgress: false,
			expandedModulID: expandedID,
			showModulform: false
		};
	}

	// Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
	componentDidMount() {
        
	}

  onExpandedStateChange = modul => {
    let newID = null;
    
    if (modul.getID() !== this.state.expandedModulID) {
      newID = modul.getID()
    }
    this.setState({
      expandedModulID: newID,
    });
  }
    

	/** Renders the component */
	render() {

    function createData (id, name, edv_nr){
      var a = new ModulBO();
      a.setID(id);
      a.setname(name);
      a.setEdv_nr(edv_nr);
      return a;
    }

    const module = [
      createData(131, 'Transdisziplinäres Projekt', 33466),
      createData(231, 'Transdisziplinäres Projekt 2', 55367),
      createData(313, 'Projekt', 43654)
    ];
    
    const { classes } = this.props;
    const { filteredModule, edvFilter,  expandedModulID, loadingInProgress, error } = this.state;
    return (
    <div className={classes.root}>
        <Grid className={classes.header} container spacing={1} justify='flex-start' alignItems='space-between'>
          <Grid item xs={2}>
            <FormControl className={classes.formControl}>
              <InputLabel>Semester</InputLabel>
                <Select value="">
                  <MenuItem value=""><em>Noch nicht benotet</em></MenuItem>
                </Select>
            </FormControl>
          </Grid>
          <Grid item xs></Grid>
          <Grid item className={classes.test}>
              <Typography>
              Filter Notenlisten nach EDV-Nummer:
              </Typography>
          </Grid>
          <Grid item xs={2} className={classes.test}>
              <TextField
              autoFocus
              fullWidth
              id='edvFilter'
              type='text'
              value={edvFilter}
              onChange={this.filterFieldValueChange}
              InputProps={{
                  endAdornment: <InputAdornment position='end'>
                  <IconButton onClick={this.clearFilterFieldButtonClicked}>
                      <ClearIcon />
                  </IconButton>
                  </InputAdornment>,
              }}
              />
          </Grid>
        </Grid>
        {
          module.map(modul =>
          <NotenlistenEintrag key={modul.id} modul = {modul} expandedState={expandedModulID === modul.getID()} onExpandedStateChange={this.onExpandedStateChange}/>
          )
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of Projects could not be loaded.`} onReload={this.getProjekte} />
        
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
  formControl: {
    minWidth: 150,
  },
  test: {
    marginTop: theme.spacing(2)
  }
});

/** PropTypes */
Notenlisten.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Notenlisten));
	
