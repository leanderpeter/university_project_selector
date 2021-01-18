import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, InputAdornment, Typography, TextField,  Paper , Grid} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { withRouter } from 'react-router-dom';
import { ElectivAPI } from '../api';
import ClearIcon from '@material-ui/icons/Clear';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import SemesterListeEintrag from './SemesterListeEintrag';
import SemesterForm from './dialogs/SemesterForm';




class SemesterListe extends Component {

  constructor(props) {
    super(props);

    //gebe einen leeren status
    this.state = {
        semester: [],
        filteredSemester: [],
        semesterFilter: '',
        showSemesterForm: false,
        showDeleteForm: false,
        error: null,
        loadingInProgress: false,
    };
  }

  addButtonClicked = event => {
    event.stopPropagation();
    this.setState({
      showSemesterForm: true
    });
  }

  filterFieldValueChange= event => {
    const value = event.target.value.toLowerCase();
    this.setState({
        filteredSemester: this.state.semester.filter(semester => {
            let nameContainsValue = semester.getname().toLowerCase().includes(value);
            return nameContainsValue;
        }),
        semesterFilter: value
    });
}

clearFilterFieldButtonClicked = () => {
    this.setState({
        filteredSemester: [...this.state.semester],
        semesterFilter: ''
    });
}

semesterFormClosed = semester => {
    if (semester) {
      const newSemesterList = [...this.state.semester, semester];
      this.setState({
        semester: newSemesterList,
        filteredSemester: [...newSemesterList],
        showSemesterForm: false
      });
    } else {
      this.setState({
        showSemesterForm: false
      });
    }
  }

  // API Anbindung um alle Module vom Backend zu bekommen 
  getSemester = () => {
    ElectivAPI.getAPI().getSemester()
    .then(semesterBOs =>
        this.setState({
            semester: semesterBOs,
            filteredSemester: [...semesterBOs],
            error: null,
            loadingInProgress: false,
        })).catch(e =>
            this.setState({
                semester: [],
                filteredSemester: [],
                error: e,
                loadingInProgress: false,
            }));
    this.setState({
        error: null,
        loadingInProgress: true,
    });
}



  // Lifecycle methode, wird aufgerufen wenn componente in den DOM eingesetzt wird
  componentDidMount() {
      this.getSemester();
  }



  /** Renders the component */
  render() {
    const { classes } = this.props;
    const {  loadingInProgress, error, semesterFilter, filteredSemester, showDeleteForm, showSemesterForm} = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={2} alignItems="center">
            <Grid item >
            <TextField
                className={classes.filter}
                type='text'
                label='Semester suchen'
                value={semesterFilter}
                onChange={this.filterFieldValueChange}
                InputProps={{
                    endAdornment: <InputAdornment position='end'>
                    <IconButton onClick={this.clearFilterFieldButtonClicked}>
                        <ClearIcon fontSize="small"/>
                    </IconButton>
                    </InputAdornment>,
                }}
            />
            </Grid>
            <Grid item xs/>
            <Grid item>
                <Tooltip title='Semester anlegen' placement="left">
                    <Fab size="medium"  className={classes.addButton} color="primary" aria-label="add" onClick={this.addButtonClicked}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </Grid>
        </Grid>
        <Paper>
            <List className={classes.root} dense>
                {
                filteredSemester.map(semester => 
                    <SemesterListeEintrag key={semester.getID()} semester = {semester} show={this.props.show} getSemester={this.getSemester}/>)
                }
            </List>
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`Semester konnte nicht geladen werden.`} onReload={this.getSemester} />
        </Paper>
        <SemesterForm show={showSemesterForm} onClose={this.semesterFormClosed} getSemester= {this.getSemester}/>
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
      width: '100%',
      marginTop: theme.spacing(2),
      paddingTop: '4px'
  },
  addButton: {
      marginRight: theme.spacing(2)
  },
  filter: {
      marginLeft: theme.spacing(2)
  }
});

/** PropTypes */
SemesterListe.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(SemesterListe));

