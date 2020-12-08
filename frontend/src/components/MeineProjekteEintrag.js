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

//import Component
import ModulEintrag from './ModulEintrag';

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
            projekt: null,
            projektID: null,
            projektName: null,
            module: null,
            dozentName: null,
            edv: null,
            note: null,
            loadingInProgress: false,
            error: null
        };
    }

    //Noch zu tun:  projektBO soll kein Array sein. Die 2 Funktionen sollen nacheinander aufgerufen werden
    
    getProjekt = () => {
      ElectivAPI.getAPI().getProjekt(this.props.teilnahme.lehrangebot)
      .then(projektBO =>
          this.setState({
            projekt: projektBO[0],
            projektID: projektBO[0].id,
            projektName: projektBO[0].name,
            loadingInProgress: false,
            error: null,
          })).then(()=>{
            this.getPerson()
            this.getBewertung()
            this.getModule_by_projekt_id()
          })
          .catch(e =>
              this.setState({
                projekt: null,
                projektID: null,
                projektName: null,
                loadingInProgress: false,
                error: e,
              }));
      this.setState({
        loadingInProgress: true,
        error: null
      });
    }

    getBewertung = () => {
      ElectivAPI.getAPI().getBewertung(this.props.teilnahme.resultat)
      .then(bewertungBO =>
          this.setState({
              note: bewertungBO.getnote(),
              error: null,
              loadingInProgress: false,
          }))
          .catch(e =>
              this.setState({
                  note: null,
                  error: null,
                  loadingInProgress: false,
              }));
      this.setState({
          error: null,
          loadingInProgress: true
      });
    }

    getModule_by_projekt_id = () => {
      ElectivAPI.getAPI().getModule_by_projekt_id(this.state.projektID)
      .then(modulBOs =>
          this.setState({
              module: modulBOs,
              error: null,
              loadingInProgress: false,
          }))
          .catch(e =>
              this.setState({
                  module: null,
                  error: null,
                  loadingInProgress: false,
              }));
      this.setState({
          error: null,
          loadingInProgress: true
      });
    }


    getPerson = () => {
      ElectivAPI.getAPI().getPerson(this.state.projekt.dozent)
      .then(personBO =>
          this.setState({
              dozentName: personBO.getname(),
              error: null,
              loadingInProgress: false,
          }))
          .catch(e =>
              this.setState({
                  dozentName: null,
                  error: e,
                  loadingInProgress: false,
              }));
      this.setState({
          error: null,
          loadingInProgress: true
      });
    }

    componentDidMount() {
      this.getProjekt();
    }

    componentDidUpdate(prevProps){
      if((this.props.show) && (this.props.show !== prevProps.show)) {
        this.getProjekt();
      }
    }


    render(){
        const {classes, expandedState} = this.props;
        const {  projekt, projektID, projektName, module, dozentName, note, loadingInProgress, error } = this.state;

        return(
              <StyledTableRow key={projektID}>
                <StyledTableCell component="th" scope="row">{projektName}</StyledTableCell>
                <StyledTableCell align="center">{dozentName}</StyledTableCell> 
                <StyledTableCell align="center">{note}</StyledTableCell> 
                <StyledTableCell align="center">
                    <FormControl className={classes.formControl}>
                        <InputLabel id="edv_nr">EDV-Nummer</InputLabel>
                            <Select>
                                <MenuItem value=""><em>-</em></MenuItem>
                                {
                                  module ?
                                  <>
                                    {
                                    module.map(modul =>
                                    <ModulEintrag key={modul.getID()} modul = {modul}
                                    onExpandedStateChange={this.onExpandedStateChange}
                                    show={this.props.show}/>
                                    )
                                    }
                                  </>
                                  :
                                  <></>
                                }
                            </Select>
                    </FormControl>
                </StyledTableCell>
                  <LoadingProgress show={loadingInProgress}></LoadingProgress>
                  <ContextErrorMessage error={error} contextErrorMsg = {'Dieses Projekt konnte nicht geladen werden'} onReload={this.getProjekt} />
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
  


export default withStyles(styles)(MeineProjekteEintrag);


