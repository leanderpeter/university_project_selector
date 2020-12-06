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

const handleChange = (event) => {
    /* setAge(event.target.value); */
    };

const handleClose = () => {
/*     setOpen(false); */
    };

const handleOpen = () => {
/*     setOpen(true); */
    };
  
function createData(name, dozent, note, modul) {
    return { name, dozent, note, modul };
  }
  
const rows = [
    createData('Marketing', 'Stingel', 1.0, null),
    createData('IT', 'This', 4.0, null),
    createData('BWL', 'Stingel', 1.3, null),
];
 
class MeineProjekteEintrag extends Component {

    constructor(props){
        super(props);

        this.state = {
            projekt : props.projekt,
        };
    }   


    render(){

        
        /* const {projekt} = this.state; */
        const {classes} = this.props;
      /*   const [modul, setModul] = React.useState('');
        const [open, setOpen] = React.useState(false); */

        return(
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <StyledTableRow>
                            <StyledTableCell>Projekt</StyledTableCell>
                            <StyledTableCell align="center">Dozent</StyledTableCell>
                            <StyledTableCell align="center">Note</StyledTableCell>
                            <StyledTableCell align="center">Modulzuweisung</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.dozent}</StyledTableCell>
                                <StyledTableCell align="center">{row.note}</StyledTableCell>
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
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant="contained" color="primary" size="medium" className={classes.button}startIcon={<SaveIcon />}>
                    Semesterbericht
                </Button>
            </div>
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

export default withStyles(styles)(MeineProjekteEintrag);

