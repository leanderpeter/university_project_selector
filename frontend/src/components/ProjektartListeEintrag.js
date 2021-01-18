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


import ProjektartenForm from './dialogs/ProjektartenForm';
import ProjektartDelete from './dialogs/ProjektartDelete';




class ProjektartListeEintrag extends Component {

    constructor(props){
        super(props);

        this.state = {
            showProjektartForm: false,
            showProjektartDelete: false,
            error: null,
            loadingInProgress: false
        };
    }

    getProjektart = () => {
      this.props.getProjektart();
    }

    projektartFormClosed = (projektart) => {
      if (projektart){
        this.setState({
          projektart: projektart,
          showProjektartForm: false
        });
      }else {
        this.setState({
          showProjektartForm: false
        });
      }
    }
  
    bearbeitenButtonClicked = event => {
      event.stopPropagation();
      this.setState({
        showProjektartForm: true
      });
    }
    
    projektartDeleteButtonClicked =  event => {
      event.stopPropagation();
      this.setState({
        showProjektartDelete: true
      });
    }
  
    projektartDeleteClosed = () => {
        this.setState({
          showProjektartDelete: false
        });
        this.getProjektart();
    }


    render(){
        const {classes, projektart} = this.props;
        const { showProjektartForm, showProjektartDelete,  error, loadingInProgress } = this.state;

        return(
          <div>
            <ListItem className={classes.root}>
                  <Grid container  alignItems="center" spacing={2}>
                    <Grid item>
                        <Typography >{projektart.name}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography >ECTS: {projektart.ects}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography >SWS: {projektart.sws}</Typography>
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
                        <IconButton className={classes.projektDeleteButton}  variant="contained"  onClick={this.projektartDeleteButtonClicked}><DeleteIcon /></IconButton>
                    </Tooltip>
                    </Grid>
                    </Grid>
            </ListItem>
            <ListItem>
              <LoadingProgress show={loadingInProgress}/>
              <ContextErrorMessage error={error} contextErrorMsg = {'Diese Teilnahme konnte nicht geladen werden'} onReload={this.getProjektart} />
            </ListItem>
            <Divider/>
            <ProjektartenForm show={showProjektartForm} projektart={projektart} onClose={this.projektartFormClosed} getProjektart= {this.getProjektart}/>
            <ProjektartDelete show={showProjektartDelete} projektart={projektart} onClose={this.projektartDeleteClosed} getProjektart= {this.getProjektart}/>       
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
ProjektartListeEintrag.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired
  }
  


export default withStyles(styles)(ProjektartListeEintrag);


