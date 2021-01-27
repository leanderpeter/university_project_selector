import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { ElectivAPI } from '../../api';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

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
      showSnackbar: false
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

  //wird aufgerufen, wenn das Dialog geschlossen wird
  handleClose = () => {
    this.props.onClose(null);
  }

  // API Anbindung um das Semester über das Backend aus der Datenbank löschen
  deleteSemester = () => {
    ElectivAPI.getAPI().deleteSemester(this.state.semester.id)
      .then(() => {
        this.props.getSemester();
        this.props.onClose(null);
      }).catch(e => {
        this.setState({
          showSnackbar: true
        })
      })
  }

  /** Renders the component */
  render() {
    const { show } = this.props;
    const { semester, showSnackbar } = this.state;
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
        <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={this.closeSnackbar}>
          <Alert onClose={this.closeSnackbar} severity="error">
            Dieses Semester kann nicht gelöscht werden
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
SemesterDelete.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(SemesterDelete);