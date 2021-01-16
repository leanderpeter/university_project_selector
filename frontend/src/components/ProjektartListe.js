import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, InputAdornment, Typography, TextField,  Paper , Grid} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { withRouter } from 'react-router-dom';
import { ElectivAPI } from '../api';
import ClearIcon from '@material-ui/icons/Clear';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

// import ModulListeEintrag from './ModulListeEintrag';
import ProjektartForm from './dialogs/ProjektartForm';

import ProjektartListeEintrag from './ProjektartListeEintrag';




class ProjektartListe extends Component {

  constructor(props) {
    super(props);

    //gebe einen leeren status
    this.state = {
        projektarten: [],
        filteredProjektarten: [],
        projektartFilter: '',
        showProjektartenForm: false,
        showDeleteForm: false,
        error: null,
        loadingInProgress: false,
    };
  }

  addButtonClicked = event => {
    event.stopPropagation();
    this.setState({
      showProjektartenForm: true
    });
  }

  filterFieldValueChange= event => {
    const value = event.target.value.toLowerCase();
    this.setState({
        filteredProjektarten: this.state.projektarten.filter(projektart => {
            let nameContainsValue = projektart.getname().toLowerCase().includes(value);
            let edv_nrContainsValue = projektart.getEdv_nr().toString().includes(value);
            return nameContainsValue || edv_nrContainsValue;
        }),
        projektartFilter: value
    });
}

clearFilterFieldButtonClicked = () => {
    this.setState({
        filteredProjektarten: [...this.state.projektarten],
        projektartFilter: ''
    });
}

projektartFormClosed = projektart => {
    if (projektart) {
      const newProjektartList = [...this.state.projektarten, projektart];
      this.setState({
        projektarten: newProjektartList,
        filteredProjektarten: [...newProjektartList],
        showProjektartForm: false
      });
    } else {
      this.setState({
        showProjektartForm: false
      });
    }
  }

  // API Anbindung um alle Projektarten vom Backend zu bekommen 
  getProjektarten = () => {
    ElectivAPI.getAPI().getProjektart()
    .then(projektartBOs =>
        this.setState({
            projektarten: projektartBOs,
            filteredProjektarten: [...projektartBOs],
            error: null,
            loadingInProgress: false,
        })).catch(e =>
            this.setState({
                projektarten: [],
                filteredProjektarten: [],
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
      this.getProjektarten();
  }



  /** Renders the component */
  render() {
    const { classes } = this.props;
    const {  loadingInProgress, error, projektartFilter, filteredProjektarten, showDeleteForm, showProjektartForm} = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={2} alignItems="center">
            <Grid item >
            <TextField
                className={classes.filter}
                type='text'
                label='Projektart suchen'
                value={projektartFilter}
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
                <Tooltip title='Projektart anlegen' placement="left">
                    <Fab size="medium"  className={classes.addButton} color="primary" aria-label="add" onClick={this.addButtonClicked}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </Grid>
        </Grid>
        <Paper>
            <List className={classes.root} dense>
                {
                filteredProjektarten.map(projektart => 
                    <ProjektartListeEintrag key={projektart.getID()} projektart = {projektart} show={this.props.show} getProjektarten={this.getProjektarten}/>)
                }
                <ListItem>
                <LoadingProgress show={loadingInProgress} />
                <ContextErrorMessage error={error} contextErrorMsg={`Projektartliste konnte nicht geladen werden.`} onReload={null} />
                </ListItem>
            </List>
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`Die Seite konnte nicht geladen werden.`}  />
        </Paper>
        <ProjektartForm show={showProjektartForm} onClose={this.projektartFormClosed} getProjektarten = {this.getProjektarten}/>
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
ProjektartListe.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ProjektartListe));
