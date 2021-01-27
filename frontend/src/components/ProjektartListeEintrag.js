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

/**
 * Es wird ein einzelnes Projektarten mit allen notwendigen Informationen angezeigt
 * Außerdem lassen sich Projektarteneinträge löschen und bearbeiten
 * 
 * @see See [ProjektartDelete](#projektartdelte)
 * @see See [ProjektartForm](#projektartform)
 */




class ProjektartListeEintrag extends Component {

    constructor(props){
        super(props);

        //initiiere einen leeren state
        this.state = {
            showProjektartForm: false,
            showProjektartDelete: false,
            error: null,
            loadingInProgress: false
        };
    }

    //ruft die getModule Funktion in den Props auf
    getProjektart = () => {
      this.props.getProjektart();
    }

    //Wird aufgerufen, wenn das Dialog-Fenster Projektartform geschlossen wird
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
  
    //Öffnet das Dialog-Fenster ProjekartForm, wenn der Button geklickt wurde
    bearbeitenButtonClicked = event => {
      event.stopPropagation();
      this.setState({
        showProjektartForm: true
      });
    }
    
     //Öffnet das Dialog-Fenster ProjektartDelete, wenn der Button geklickt wurde
    projektartDeleteButtonClicked =  event => {
      event.stopPropagation();
      this.setState({
        showProjektartDelete: true
      });
    }
  
    //Wird aufgerufen, wenn das Dialog-Fenster ProjektartDelete geschlossen wird
    projektartDeleteClosed = () => {
        this.setState({
          showProjektartDelete: false
        });
        this.getProjektart();
    }

    /** Rendert die Komponente */
    render(){
        const {classes, projektart} = this.props;
        const { showProjektartForm, showProjektartDelete,  error, loadingInProgress } = this.state;

        return(
          <div>
            <ListItem className={classes.root}>
                  <Grid container  alignItems="center" spacing={2}>
                    <Grid item xs={4}>
                        <Typography >{projektart.name}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography >ECTS: {projektart.ects}</Typography>
                    </Grid>
                    <Grid item xs={2}>
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
              <ContextErrorMessage error={error} contextErrorMsg = {'Diese Projektart konnte nicht geladen werden'} onReload={this.getProjektart} />
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


