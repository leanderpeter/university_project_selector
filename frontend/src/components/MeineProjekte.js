import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MeineProjekteEintrag from './MeineProjekteEintrag';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(1)
    },
    content: {
      margin: theme.spacing(1),
    }
  }));

  

class MeineProjekte extends Component {

    constructor(props){
        super(props);

        this.state = {
            projekte : [],
            error: null,
            loadingInProgress: false, //benutzen wir das? 
        };
    }   


    // API Anbindung um Projekte vom Backend zu bekommen 
    getProjekte = () => {
        pass
    }


    componentDidMount() {
        this.getProjekte();
    }

    render(){
        

        return(
            <div className={classes.root}>
            {
                projekte.map(projekt => 
                    <MeineProjekteEintrag key={projekt.getID()} projekt = {projekt} //getID() schreiben in /api/BO.js
                />) 
            } 
            </div>
        )
    }



}


