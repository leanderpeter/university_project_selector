import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import { ElectivAPI } from '../../api';


class SemesterDelete extends Component {

	constructor(props) {
		super(props);

		// Status initalisieren
		this.state = {
          semester: props.semester,

        };

    }

    handleClose = () => {
		this.props.onClose(null);
    }

    deleteSemester= () => {
      ElectivAPI.getAPI().deleteSemester(this.state.semester.id)
        .then(()=>{
			    this.props.getSemester();
          this.props.onClose(null);
        });
    }
    
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