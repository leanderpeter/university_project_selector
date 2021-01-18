import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ListItem from '@material-ui/core/ListItem';
import { Typography, IconButton, Grid, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
//import {ElectivAPI} from '../api';

import ModulForm from './dialogs/ModulForm';
import ModulDelete from './dialogs/ModulDelete';




class ModulListeEintrag extends Component {

    constructor(props){
        super(props);

        this.state = {
            showModulForm: false,
            showModulDelete: false,
            error: null,
            loadingInProgress: false
        };
    }

    getModule = () => {
      this.props.getModule();
    }

    modulFormClosed = (modul) => {
      if (modul){
        this.setState({
          modul: modul,
          showModulForm: false
        });
      }else {
        this.setState({
          showModulForm: false
        });
      }
    }
  
    bearbeitenButtonClicked = event => {
      event.stopPropagation();
      this.setState({
        showModulForm: true
      });
    }
    
    modulDeleteButtonClicked =  event => {
      event.stopPropagation();
      this.setState({
        showModulDelete: true
      });
    }
  
    modulDeleteClosed = () => {
        this.setState({
          showModulDelete: false
        });
        this.getModule();
    }


    render(){
        const {classes, modul} = this.props;
        const { showModulForm, showModulDelete,  error, loadingInProgress } = this.state;

        return(
          <div>
            <ListItem className={classes.root}>
                  <Grid container  alignItems="center" spacing={2}>
                    <Grid item>
                        <Typography >{modul.edv_nr}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography >{modul.name}</Typography>
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
                        <IconButton className={classes.projektDeleteButton}  variant="contained"  onClick={this.modulDeleteButtonClicked}><DeleteIcon /></IconButton>
                    </Tooltip>
                    </Grid>
                    </Grid>
            </ListItem>
            <ListItem>
              <LoadingProgress show={loadingInProgress}/>
              <ContextErrorMessage error={error} contextErrorMsg = {'Diese Teilnahme konnte nicht geladen werden'} onReload={this.getModule} />
            </ListItem>
            <Divider/>
            <ModulForm show={showModulForm} modul={modul} onClose={this.modulFormClosed} getModule= {this.getModule}/>
            <ModulDelete show={showModulDelete} modul={modul} onClose={this.modulDeleteClosed} getModule= {this.getModule} />       
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
ModulListeEintrag.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired
  }
  


export default withStyles(styles)(ModulListeEintrag);


