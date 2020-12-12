import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ElectivAPI from '../api/ElectivAPI';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import LoadingProgress from './dialogs/LoadingProgress';
import ContextErrorMessage from './dialogs/ContextErrorMessage';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.darkgrey,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

class EdvListeEintrag extends Component {

    constructor(props){
        super(props);

        this.state = {
            student: null,
            mat_nr: null,
            loadingInProgress: false,
            error: null
        };
    }

    getStudent(){

    }

    getBewertung(){

    }


    componentDidMount() {
        this.getStudent();
    }

    render(){
        const {classes, expandedState, teilnahme} = this.props;
        const { student, mat_nr, loadingInProgress, error } = this.state;
        
        return(
              <StyledTableRow key={this.props.teilnahme.id}>
                <StyledTableCell component="th" scope="row"></StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell> 
                <StyledTableCell align="center">{teilnahme.resultat}</StyledTableCell> 
                  <LoadingProgress show={loadingInProgress}></LoadingProgress>
                  <ContextErrorMessage error={error} contextErrorMsg = {'Diese Teilnahme konnte nicht geladen werden'} onReload={this.getStudent} />
              </StyledTableRow>
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(1),
    },
    table: {
        minWidth: 700,
      },
    });

/** PropTypes */
EdvListeEintrag.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** Projekt to be rendered */
    teilnahme: PropTypes.object.isRequired,
    /** The state of this ProjektListeEintrag. If true the customer is shown with its accounts */
    expandedState: PropTypes.bool.isRequired,
    /** The handler responsible for handle expanded state changes (exanding/collapsing) of this ProjektListeEintrag 
     * 
     * Signature: onExpandedStateChange(CustomerBO customer)
     */
    onExpandedStateChange: PropTypes.func.isRequired,

    /** wenn true, dozent wird geladen */
    show: PropTypes.bool.isRequired
  }
  
  export default withStyles(styles)(EdvListeEintrag);