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
    '&:nth-of-type(4n+1)': {
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
            semester: null,
            module: null,
            dozentName: null,
            note: null,
            loadingInProgress: false,
            error: null
        };
    }

    getProjekt = () => {
      ElectivAPI.getAPI().getProjekt(this.props.teilnahme.lehrangebot)
      .then(projektBO =>
          this.setState({
            projekt: projektBO,
            projektID: projektBO.id,
            projektName: projektBO.name,
            loadingInProgress: false,
            error: null,
          })).then(()=>{
            this.getPerson()
            this.getBewertung()
            this.getModule_by_projekt_id()
            this.getSemester_by_id()
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

    getSemester_by_id = () => {
      ElectivAPI.getAPI().getSemester_by_id(this.state.projekt.getHalbjahr())
      .then(semesterBO =>
          this.setState({
              semester: semesterBO.name,
              error: null,
              loadingInProgress: false,
          }))
          .catch(e =>
              this.setState({
                  semester: null,
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

    handleChange = async (edv) => {
      this.props.teilnahme.setAnrechnung(edv.target.value);
      console.log(`Option selected:`, edv.target.value);
      await ElectivAPI.getAPI().updateTeilnahme(this.props.teilnahme);
      this.props.getTeilnahmen();
    };

    componentDidMount() {
      this.getProjekt();
    }

    componentDidUpdate(prevProps){
      if((this.props.show) && (this.props.show !== prevProps.show)) {
        this.getProjekt();
      }
    }


    render(){
        const {classes, expandedState, teilnahme} = this.props;
        const {  projektID, projektName, semester, module, dozentName, note, loadingInProgress, error } = this.state;

        return(
          <>
                <StyledTableRow key={projektID}>
                  <StyledTableCell align="left">{projektName}</StyledTableCell>
                  <StyledTableCell align="center">{semester}</StyledTableCell>
                  <StyledTableCell align="center">{dozentName}</StyledTableCell> 
                  <StyledTableCell align="center">{note}</StyledTableCell> 
                  <StyledTableCell align="right" className={classes.breite}>               
                                  { module && note ?
                                    <FormControl className={classes.formControl}>
                                      <InputLabel>Modul</InputLabel> 
                                        <Select value = {teilnahme.anrechnung} onChange={this.handleChange}>
                                          {
                                          module.map(modul =>
                                          <MenuItem value={modul.getID()}><em>{modul.getname()}</em></MenuItem>
                                          )
                                          }
                                        </Select>                                                                
                                    </FormControl>                                  
                                    :
                                    <FormControl className={classes.formControl}>
                                      <InputLabel>EDV-Nummer</InputLabel>
                                        <Select value="">
                                          <MenuItem value=""><em>Noch nicht benotet</em></MenuItem>
                                        </Select>
                                    </FormControl>
                                  }
                  </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow> 
                    <StyledTableCell colspan="10" className={classes.laden}>
                      <LoadingProgress show={loadingInProgress}></LoadingProgress>
                      <ContextErrorMessage error={error} contextErrorMsg = {'Diese Teilnahme konnte nicht geladen werden'} onReload={this.getProjekt} />
                    </StyledTableCell>
                  </StyledTableRow>
          </>                        
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
        minWidth: 200,
        textAlign: "left"
    },
    button: {
        margin: theme.spacing(1),
        },
    laden: {
      padding: 0
    },
    breite: {
      width: 220
    }
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
    /** wenn true, dozent wird geladen */
    show: PropTypes.bool.isRequired
  }
  


export default withStyles(styles)(MeineProjekteEintrag);


