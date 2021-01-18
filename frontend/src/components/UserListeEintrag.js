import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles,} from '@material-ui/core/styles';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {ListItemSecondaryAction, Typography, IconButton, Grid, Tooltip, Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import {ElectivAPI} from '../api';

import UserDelete from './dialogs/UserDelete';




class UserListeEintrag extends Component {

    constructor(props){
        super(props);

        this.state = {
            showUserDelete: false,
            error: null,
            loadingInProgress: false
        };
    }

    getUser = () => {
      this.props.getUser();
    }


    userDeleteButtonClicked =  event => {
      event.stopPropagation();
      this.setState({
        showUserDelete: true
      });
    }
  
    userDeleteClosed = () => {
        this.setState({
          showUserDelete: false
        });
        this.getUser();
    }


    render(){
        const {classes, user} = this.props;
        const {showUserDelete,  error, loadingInProgress } = this.state;

        return(
          <div>
            <ListItem className={classes.root}>
                  <Grid container  alignItems="center" spacing={2}>
                    <Grid item>
                        <Typography >{user.name}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography >- {user.mat_nr}</Typography>
                    </Grid>
                    <Grid item xs/>
                    <Grid item>
                    </Grid>
                    <Grid item>
                    <Tooltip title='Löschen' placement="bottom">
                        <IconButton className={classes.userDeleteButton}  variant="contained"  onClick={this.userDeleteButtonClicked}><DeleteIcon /></IconButton>
                    </Tooltip>
                    </Grid>
                    </Grid>
            </ListItem>
            <ListItem>
              <LoadingProgress show={loadingInProgress}/>
              <ContextErrorMessage error={error} contextErrorMsg = {'Der User konnte nicht geladen werden'} onReload={this.getUser} />
            </ListItem>
            <Divider/>
            <UserDelete show={showUserDelete} user={user} onClose={this.userDeleteClosed} />
          </div>                        
        );
    }
}
const styles = theme => ({
      root: {
        width: '100%',
        marginTop: '16px'
      },
    });

/** PropTypes */
UserListeEintrag.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired
  }
  


export default withStyles(styles)(UserListeEintrag);


