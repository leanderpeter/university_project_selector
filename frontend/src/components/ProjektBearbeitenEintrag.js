import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ElectivAPI from '../api/ElectivAPI';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LoadingProgress from './dialogs/LoadingProgress';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import TableFooter from '@material-ui/core/TableFooter';
import StudentBO from '../api/StudentBO'



const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
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

class ProjektBearbeitenEintrag extends Component {

    constructor(props){
        super(props);

        this.state = {
            teilnahmen : [],
            student: new StudentBO("", ""),
            studentID: null,
            studentName: null,
            loadingInProgress: false,
            error: null
        };
    }

  

    
    getStudentById = () => {
        ElectivAPI.getAPI().getStudentById(this.props.teilnahme.getteilnehmer())
        .then(studentBO =>
            this.setState({
              student: studentBO[0],
              studentID: studentBO[0].id,
              studentName: studentBO[0].name,
              loadingInProgress: false,
              error: null,
            })).then(()=>{
              
            })
            .catch(e =>
                this.setState({
                  student: null,
                  studentID: null,
                  studentName: null,
                  loadingInProgress: false,
                  error: e,
                }));
        this.setState({
          loadingInProgress: true,
          error: null
        });
      }
    
    

    
    

    

    componentDidMount() {
      this.getStudentById();
    }

    


    render(){
        const {classes, expandedState} = this.props;
        const {  student, studentID, studentName,  loadingInProgress, error } = this.state;

        return(
              <StyledTableRow key={studentID}>
                <StyledTableCell component="th" scope="row">{studentName}</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell> 
                <StyledTableCell align="center"></StyledTableCell> 
                <StyledTableCell align="center"><Button style={{backgroundColor:"lightblue", display:"flex",margin:"auto"}} variant="contained" >entfernen</Button>
                              
                    
                </StyledTableCell>
                  <LoadingProgress show={loadingInProgress}></LoadingProgress>
                  <ContextErrorMessage error={error} contextErrorMsg = {'Dieses Projekt konnte nicht geladen werden'} onReload={this.getPerson} />
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
    content: {
        margin: theme.spacing(1),
      },
    table: {
        minWidth: 700,
      },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    button: {
        margin: theme.spacing(1),
        },
    });

/** PropTypes */
ProjektBearbeitenEintrag.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** Projekt to be rendered */
    projekt: PropTypes.object.isRequired,
    /** The state of this ProjektListeEintrag. If true the customer is shown with its accounts */
    expandedState: PropTypes.bool.isRequired,
    /** The handler responsible for handle expanded state changes (exanding/collapsing) of this ProjektListeEintrag 
     * 
     * Signature: onExpandedStateChange(CustomerBO customer)
     */
    onExpandedStateChange: PropTypes.func.isRequired,

    /** 
     *  Event Handler function which is called after a sucessfull delete of this customer.
     * 
     * Signature: onCustomerDelete(CustomerBO customer)
     */
    onCustomerDeleted: PropTypes.func.isRequired,
    /** wenn true, dozent wird geladen */
    show: PropTypes.bool.isRequired
  }
  


export default withStyles(styles)(ProjektBearbeitenEintrag);

