import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import { ElectivAPI } from '../../api';

/**
 * Es wird ein Dialog dargestellt, mit welchem man ein bestimmtes Semester löschen kann 
 * 
 * @see See Material-UIs [Dialog](https://material-ui.com/components/dialogs)
 * 
 */

class SemesterDelete extends Component {

	constructor(props) {
		super(props);

		// Status initalisieren
		this.state = {
          semester: props.semester,

        };

    }

    //wird aufgerufen, wenn das Dialog geschlossen wird
    handleClose = () => {
		this.props.onClose(null);
    }

    // API Anbindung um das Semester über das Backend aus der Datenbank löschen
    deleteSemester= () => {
      ElectivAPI.getAPI().deleteSemester(this.state.semester.id)
        .then(()=>{
			    this.props.getSemester();
          this.props.onClose(null);
        });
    }
    
    /** Renders the component */
    render() {
        const {classes, show} = this.props;
        const { semester } = this.state;
        return (
            <div>
              <Dialog
                open={show}
                onClose={this.handleClose}
                maxWidth='xs'
              >
                <DialogTitle>{"Sind Sie sich sicher?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Wenn Sie das Semester <b>"{semester.name}"</b> löschen möchten, klicken Sie auf "JA". 
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Abbrechen
                  </Button>
                  <Button onClick={this.deleteSemester} color="primary" autoFocus>
                    Ja
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
        );
    }

}

/** Component specific styles */
const styles = theme => ({
    root: {
      width: '100%',
    },
})

/** PropTypes */
SemesterDelete.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  }
  
  export default withStyles(styles)(SemesterDelete);