import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

class MeineProjekteEintrag extends Component {

    constructor(props){
        super(props);

        this.state = {
            projekt : props.projekt
        };
    }   


    render(){

        const {classes, expandedState} = this.props;
        const { projekt } = this.state;

        return(
              <StyledTableRow key={projekt.getID()}>
                <StyledTableCell component="th" scope="row">
                {projekt.getname()}
                </StyledTableCell>
                <StyledTableCell align="center">Dozent fehlt noch</StyledTableCell> 
                <StyledTableCell align="center">Note fehlt noch</StyledTableCell> 
                <StyledTableCell align="center">
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">EDV-Nummer</InputLabel>
                            <Select>
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value={10}>335123</MenuItem>
                                <MenuItem value={20}>222134</MenuItem>
                                <MenuItem value={30}>212324</MenuItem>
                            </Select>
                    </FormControl>
                </StyledTableCell>
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
MeineProjekteEintrag.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** The CustomerBO to be rendered */
    customer: PropTypes.object.isRequired,
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
    onCustomerDeleted: PropTypes.func.isRequired
  }
  


export default withStyles(styles)(MeineProjekteEintrag);


