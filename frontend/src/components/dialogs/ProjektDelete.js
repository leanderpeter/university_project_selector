import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { ElectivAPI } from '../../api';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

/**
 * Es wird ein Dialog dargestellt, mit welchem man ein bestimmtes Projekt löschen kann
 * 
 * @see See Matieral-UIs [Dialog] (https://material-ui.com/components/dialogs)
 * 
 */

class ProjektDelete extends Component {

	constructor(props) {
		super(props);

		//initiiere den state
		this.state = {
            projekt: props.projekt,
            showSnackbar: false,
        };

    }

    closeSnackbar = (event, reason) => {
      if (reason === 'clockaway') {
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

    // API Anbindung um das Projekt über das Backend in der Datenbank zu löschen
    deleteProjekt= () => {
        ElectivAPI.getAPI().deleteProjekt(this.state.projekt.id)
        .then(()=>{
			    this.props.getProjekte();
          this.props.onClose(null);
        }).catch(e=>{
          this.setState({
            showSnackbar: true
          })
        })
    }
    
    /** Rendert die Komponente */
    render() {
        const { show } = this.props;
        const { projekt, showSnackbar } = this.state;

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
                    Wenn Sie das Projekt <b>"{projekt.name}"</b> löschen möchten, drücken Sie auf "JA". 
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Abbrechen
                  </Button>
                  <Button onClick={this.deleteProjekt} color="primary" autoFocus>
                    Ja
                  </Button>
                </DialogActions>
              </Dialog>
              <Snackbar open={showSnackbar} autoHideDuration={6000}  onClose={this.closeSnackbar}>
                <Alert onClose={this.closeSnackbar} severity="error">
                  Diese Projektart kann nicht gelöscht werden
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
ProjektDelete.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** The ProjektBO's to be edited */
    projekt: PropTypes.object,
    /** If true, the form is rendered */
    show: PropTypes.bool.isRequired,
    /**  
     * Handler function which is called, when the dialog is closed.
     * Sends the edited or created projektBO's as parameter or null, if cancel was pressed.
     *  
     * Signature: onClose(ProjektBO's projekt);
     */
    onClose: PropTypes.func.isRequired,
  }
  
  export default withStyles(styles)(ProjektDelete);