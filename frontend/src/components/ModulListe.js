import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, IconButton, InputAdornment, TextField,  Paper , Grid} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { withRouter } from 'react-router-dom';
import { ElectivAPI } from '../api';
import ClearIcon from '@material-ui/icons/Clear';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import List from '@material-ui/core/List';
import ModulListeEintrag from './ModulListeEintrag';
import ModulForm from './dialogs/ModulForm';




class ModulListe extends Component {

  constructor(props) {
    super(props);

    //gebe einen leeren status
    this.state = {
        module: [],
        filteredModule: [],
        modulFilter: '',
        showModulForm: false,
        showDeleteForm: false,
        error: null,
        loadingInProgress: false,
    };
  }

  addButtonClicked = event => {
    event.stopPropagation();
    this.setState({
      showModulForm: true
    });
  }

  filterFieldValueChange= event => {
    const value = event.target.value.toLowerCase();
    this.setState({
        filteredModule: this.state.module.filter(modul => {
            let nameContainsValue = modul.getname().toLowerCase().includes(value);
            let edv_nrContainsValue = modul.getEdv_nr().toString().includes(value);
            return nameContainsValue || edv_nrContainsValue;
        }),
        modulFilter: value
    });
}

clearFilterFieldButtonClicked = () => {
    this.setState({
        filteredModule: [...this.state.module],
        modulFilter: ''
    });
}

modulFormClosed = modul => {
    this.getModule();
    if (modul) {
      const newModulList = [...this.state.module, modul];
      this.setState({
        module: newModulList,
        filteredModule: [...newModulList],
        showModulForm: false
      });
    } else {
      this.setState({
        showModulForm: false
      });
    }
  }

  // API Anbindung um alle Module vom Backend zu bekommen 
  getModule = () => {
    ElectivAPI.getAPI().getModule()
    .then(modulBOs =>
        this.setState({
            module: modulBOs,
            filteredModule: [...modulBOs],
            error: null,
            loadingInProgress: false,
        })).catch(e =>
            this.setState({
                module: [],
                filteredModule: [],
                error: e,
                loadingInProgress: false,
            }));
    this.setState({
        error: null,
        loadingInProgress: true,
    });
}



  // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
  componentDidMount() {
      this.getModule();
  }



  /** Renders the component */
  render() {
    const { classes } = this.props;
    const {  loadingInProgress, error, modulFilter, filteredModule, showModulForm} = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={2} alignItems="center">
            <Grid item >
            <TextField
                className={classes.filter}
                type='text'
                label='Module suchen'
                value={modulFilter}
                onChange={this.filterFieldValueChange}
                InputProps={{
                    endAdornment: <InputAdornment position='end'>
                    <IconButton onClick={this.clearFilterFieldButtonClicked}>
                        <ClearIcon fontSize="small"/>
                    </IconButton>
                    </InputAdornment>,
                }}
            />
            </Grid>
            <Grid item xs/>
            <Grid item>
                <Tooltip title='Modul anlegen' placement="left">
                    <Fab size="medium"  className={classes.addButton} color="primary" aria-label="add" onClick={this.addButtonClicked}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </Grid>
        </Grid>
        <Paper>
            <List className={classes.root} dense>
                {
                filteredModule.map(modul => 
                    <ModulListeEintrag key={modul.getID()} modul = {modul} show={this.props.show} getModule={this.getModule}/>)
                }
            </List>
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`Die Module konnten nicht geladen werden.`} onReload={this.getModule}/>
        </Paper>
        <ModulForm show={showModulForm} onClose={this.modulFormClosed} getModule= {this.getModule}/>
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
      width: '100%',
      marginTop: theme.spacing(2),
      paddingTop: '4px'
  },
  addButton: {
      marginRight: theme.spacing(2)
  },
  filter: {
      marginLeft: theme.spacing(2)
  }
});

/** PropTypes */
ModulListe.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ModulListe));

