import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles,  Paper , Grid} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { ElectivAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import UserListeEintrag from './UserListeEintrag';





class UserListe extends Component {

  constructor(props) {
    super(props);

    //gebe einen leeren status
    this.state = {
        user: [],
        filteredUser: [],
        modulFilter: '',
        showDeleteForm: false,
        error: null,
        loadingInProgress: false,
    };
  }


  // API Anbindung um alle Module vom Backend zu bekommen 
  getUser = () => {
    ElectivAPI.getAPI().getStudenten()
    .then(userBOs =>
        this.setState({
            user: userBOs,
            filteredUser: [...userBOs],
            error: null,
            loadingInProgress: false,
        })).catch(e =>
            this.setState({
                user: [],
                filteredUser: [],
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
      this.getUser();
  }



  /** Renders the component */
  render() {
    const { classes } = this.props;
    const {  loadingInProgress, error, filteredUser } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={2} alignItems="center">

            <Grid item xs/>
            <Grid item>
            </Grid>
        </Grid>
        <Paper>
            <List className={classes.root} dense>
                {
                filteredUser.map(user =>
                    <UserListeEintrag key={user.getID()} user = {user} show={this.props.show} getUser={this.getUser}/>)
                }
                <ListItem>
                <LoadingProgress show={loadingInProgress} />
                <ContextErrorMessage error={error} contextErrorMsg={`Modulliste konnte nicht geladen werden.`} onReload={null} />
                </ListItem>
            </List>
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
UserListe.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(UserListe));

