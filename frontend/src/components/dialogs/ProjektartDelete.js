import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { ElectivAPI } from '../../api';


class ProjektartDelete extends Component {

	constructor(props) {
		super(props);

		// Status initalisieren
		this.state = {
            projektart: props.projektart,

        };

    }

    handleClose = () => {
		this.props.onClose(null);
    }

    deleteProjektart = () => {
      ElectivAPI.getAPI().deleteProjektart(this.state.projektart.id)
        .then(()=>{
          this.props.getProjektart();
          this.props.onClose(null);
        });
    }
    
    render() {

        const { show } = this.props;
        const { projektart } = this.state;
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
                    Wenn Sie die Projektart <b>"{projektart.name}"</b> löschen möchten, drücken Sie auf "JA". 
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Abbrechen
                  </Button>
                  <Button onClick={this.deleteProjektart} color="primary" autoFocus>
                    Ja
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
        );
    }

}

const styles = theme => ({
    root: {
      width: '100%',
    },
})

/** PropTypes */
ProjektartDelete.propTypes = {
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
  
  export default withStyles(styles)(ProjektartDelete);