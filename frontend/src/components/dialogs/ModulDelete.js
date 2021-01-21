import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { ElectivAPI } from '../../api';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

/**
 * Es wird ein Dialog dargestellt, mit welchem man ein bestimmtes Modul löschen kann
 * 
 * @see See Matieral-UIs [Dialog] (https://material-ui.com/components/dialogs)
 * 
 */

class ModulDelete extends Component {

	constructor(props) {
		super(props);

		//initiiere den state
		this.state = {
            modul: props.modul,
            showSnackbar: false,
        };
    }

    closeSnackbar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({
        showSnackbar: false
      });
    };

    //Wenn das Dialog geschlossen wird
    handleClose = () => {
		  this.props.onClose(null);
    }

    // API Anbindung um das Modul über das Backend in der Datenbank zu löschen
    deleteModul= () => {
      ElectivAPI.getAPI().deleteModul(this.state.modul.id)
        .then(()=>{
			    this.props.getModule();
          this.props.onClose(null);
        }).catch(e=>{
          this.setState({
            showSnackbar: true
          })
        })
    }
    
    /** Rendert die Komponente */
    render() {
        const { show} = this.props;
        const { modul, showSnackbar } = this.state;
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
                    Wenn Sie das Modul <b>"{modul.name}"</b> löschen möchten, drücken Sie auf "JA". 
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Abbrechen
                  </Button>
                  <Button onClick={this.deleteModul} color="primary" autoFocus>
                    Ja
                  </Button>
                </DialogActions>
              </Dialog>
              <Snackbar open={showSnackbar} autoHideDuration={6000}  onClose={this.closeSnackbar}>
                <Alert onClose={this.closeSnackbar} severity="error">
                  Dieses Modul kann nicht gelöscht werden
                </Alert>
              </Snackbar>
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
ModulDelete.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  }
  
  export default withStyles(styles)(ModulDelete);