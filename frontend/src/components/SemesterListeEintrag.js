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

import SemesterForm from './dialogs/SemesterForm';
import SemesterDelete from './dialogs/SemesterDelete';


/**
 * Es wird ein einzelnes Semester angezeigt
 * 
 * @see See [SemesterForm](#semesterform)
 * @see See [SemesterDelete](#semesterdelete)
 * 
 * Außerdem lassen sich Semestereinträge löschen und bearbeiten
 * 
 */

class SemesterListeEintrag extends Component {

    constructor(props){
        super(props);

        //gebe einen leeren status
        this.state = {
            showSemesterForm: false,
            showSemesterDelete: false,
            error: null,
            loadingInProgress: false
        };
    }

    // API Anbindung um Semester vom Backend zu bekommen 
    getSemester = () => {
      this.props.getSemester();
    }

    // wird aufgerufen, wenn Dialog Fenster geschloßen werden soll
    semesterFormClosed = (semester) => {
      if (semester){
        this.setState({
          semester: semester,
          showSemesterForm: false
        });
      }else {
        this.setState({
          showSemesterForm: false
        });
      }
    }
  
    // wird aufgerufen, wenn ein Semester bearbeitet werden soll
    bearbeitenButtonClicked = event => {
      event.stopPropagation();
      this.setState({
        showSemesterForm: true
      });
    }
    
    // wird aufgerufen, wenn ein Semester gelöscht werden soll
    semesterDeleteButtonClicked =  event => {
      event.stopPropagation();
      this.setState({
        showSemesterDelete: true
      });
    }
  
    // wird aufgerufen, wenn DELETE Dialog Fenster geschloßen werden soll
    semesterDeleteClosed = () => {
        this.setState({
          showSemesterDelete: false
        });
        this.getSemester();
    }

    /** Renders the component */
    render(){
        const {classes, semester} = this.props;
        const { showSemesterForm, showSemesterDelete,  error, loadingInProgress } = this.state;

        return(
          <div>
            <ListItem className={classes.root}>
                  <Grid container  alignItems="center" spacing={2}>
                    <Grid item>
                        <Typography >{semester.name}</Typography>
                    </Grid>
                    <Grid item xs/>
                    <Grid item>
                    <Tooltip title='Bearbeiten' placement="bottom">
                    <IconButton  className={classes.bearbeitenButton} variant='contained' onClick={this.bearbeitenButtonClicked}>
                        <EditIcon />
                    </IconButton>
                    </Tooltip>
                    </Grid>
                    <Grid item>
                    <Tooltip title='Löschen' placement="bottom">
                        <IconButton variant="contained"  onClick={this.semesterDeleteButtonClicked}><DeleteIcon /></IconButton>
                    </Tooltip>
                    </Grid>
                    </Grid>
            </ListItem>
            <ListItem>
              <LoadingProgress show={loadingInProgress}/>
              <ContextErrorMessage error={error} contextErrorMsg = {'Dieses Semester konnte nicht geladen werden'} onReload={this.getSemester} />
            </ListItem>
            <Divider/>
            <SemesterForm show={showSemesterForm} semester={semester} onClose={this.semesterFormClosed} getSemester= {this.getSemester}/>
            <SemesterDelete show={showSemesterDelete} semester={semester} onClose={this.semesterDeleteClosed} getSemester= {this.getSemester}/>       
          </div>                        
        );
    }
}

/** Component specific styles */
const styles = theme => ({
      root: {
        width: '100%',
        marginTop: '16px'
      },
    });

/** PropTypes */
SemesterListeEintrag.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired
  }
  

export default withStyles(styles)(SemesterListeEintrag);


