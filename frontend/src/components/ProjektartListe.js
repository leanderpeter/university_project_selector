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

// import ModulListeEintrag from './ModulListeEintrag';
import ProjektartenForm from './dialogs/ProjektartenForm';

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
            return nameContainsValue;
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
    this.getProjektart();
    if (projektart) {
      const newProjektartList = [...this.state.projektarten, projektart];
      this.setState({
        projektarten: newProjektartList,
        filteredProjektarten: [...newProjektartList],
        showProjektartenForm: false
      });
    } else {
      this.setState({
        showProjektartenForm: false
      });
    }
  }

  // API Anbindung um alle Projektarten vom Backend zu bekommen 
  getProjektart = () => {
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
      this.getProjektart();
  }



  /** Renders the component */
  render() {
    const { classes } = this.props;
    const {  loadingInProgress, error, projektartFilter, filteredProjektarten, showProjektartenForm} = this.state;

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
                    <ProjektartListeEintrag key={projektart.getID()} projektart = {projektart} show={this.props.show} getProjektart={this.getProjektart}/>)
                }
            </List>
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`Projektartliste konnte nicht geladen werden.`} onReload={this.getProjektart} />
        </Paper>
        <ProjektartenForm show={showProjektartenForm} onClose={this.projektartFormClosed} getProjektart = {this.getProjektart}/>
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

