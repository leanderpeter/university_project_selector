import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {ListItemSecondaryAction, Typography, IconButton} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import {ElectivAPI} from '../../api';




class AddStudentEintrag extends Component {

    constructor(props){
        super(props);

        this.state = {
            student: props.student,
            addButtonDisabled: false,
            error: null,
            loadingInProgress: false
        };
    }

    addTeilnahme =  () => {
      //Logik fuer Teilnahme Button
      this.setState({addButtonDisabled:true});
      ElectivAPI.getAPI().setTeilnahme(this.props.currentProjekt, this.state.student.id);
  }

    render(){
        const {classes, expandedState, student} = this.props;
        const {  error, loadingInProgress } = this.state;

        return(
          <div>
            <ListItem className={classes.root}>
              <Typography >{student.mat_nr}</Typography>
              <Typography className={classes.marginLeft}>{student.name}</Typography>
              <ListItemSecondaryAction>
                <IconButton disabled={this.state.addButtonDisabled}><AddIcon onClick={this.addTeilnahme} /></IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <LoadingProgress show={loadingInProgress}></LoadingProgress>
              <ContextErrorMessage error={error} contextErrorMsg = {'Diese Teilnahme konnte nicht geladen werden'} onReload={this.getProjekt} />
            </ListItem>
            <Divider />          
          </div>                        
        );
    }
}
const styles = theme => ({
      root: {
        width: '100%',
        marginTop: '16px'
      },
      marginLeft: {
        marginLeft: theme.spacing(2)
      }
    });

/** PropTypes */
AddStudentEintrag.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** Projekt to be rendered */
    student: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired
  }
  


export default withStyles(styles)(AddStudentEintrag);


