import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Tabs, Tab, Paper } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';


/**
 * Stellt einen Sub-Header für administrative Verwaltungsmöglichkeiten der einzelnen BOs dar
 * 
 * @see See [SemesterListe](#semesterliste)
 * @see See [ModulListe](#modulliste)
 * @see See [ProjektartListe](#projektartliste)
 * @see See [UserListe](#userliste)
 * 
 */

class Administration extends Component {

  constructor(props) {
    super(props);

    //initiiere einen leeren state
    this.state = {
        tabindex: 0,
        error: null,
        loadingInProgress: false,
    };
  }

  //Funktion, wenn ein Tab gewächselt wurde: setzt den state tabindex auf den aktuellen index 
  handleTabChange = (e, newIndex) => {
    this.setState({
        tabindex: newIndex
    })
};


  // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
  componentDidMount() {
  }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const {  loadingInProgress, error} = this.state;

    return (
      <div className={classes.root}>
        <Paper>
          <Tabs className={classes.tabs} indicatorColor='primary' textColor='primary'  centered value={this.state.tabindex} onChange={this.handleTabChange}  >
              <Tab label='Semester' component={RouterLink} to={`/administration/semester`} />
              <Tab label="Module" component={RouterLink} to={'/administration/module'}/>
              <Tab label='Projektarten' component={RouterLink} to={`/administration/projektarten`} />
              <Tab label='Studenten' component={RouterLink} to={`/administration/student`} />
              <Tab label='User' component={RouterLink} to={`/administration/user`} />
          </Tabs>
          <LoadingProgress show={loadingInProgress} />
          <ContextErrorMessage error={error} contextErrorMsg={`Die Seite konnte nicht geladen werden.`}  />
        </Paper>
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
});

/** PropTypes */
Administration.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Administration));

