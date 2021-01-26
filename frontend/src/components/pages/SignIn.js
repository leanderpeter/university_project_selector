import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Card, Button, Grid, Typography, withStyles, Paper, FormControl, InputLabel, Select, MenuItem, TextField} from '@material-ui/core';

/** 
 * Render eine Seite für nicht eingeloggte Nutzer.
 * Dafür wird eine existierende Google Account Sign in Komponente verwendet. 
 * Die Komponente nutzt eine Firebase für einen redirect.
 * 
 * @see See Googles [firebase authentication](https://firebase.google.com/docs/web/setup)
 * @see See Googles [firebase API reference](https://firebase.google.com/docs/reference/js)
 * 
 */

 class SignIn extends Component {

	constructor(props){
		super(props);

		this.state = {
			rolle: null,
			rolleEdited: false,
			nameValidationFailed: false,
			nameEdited: false,
			kuerzelValidationFailed: false,
			kuerzelEdited: false,
			mat_nrValidationFailed: false,
			mat_nrEdited: false
		};
	}



	// Handles the click event of the sign in button and calls the prop onSignIn handler
	handleSignInButtonClicked = () => {
		console.log("Click!")
		document.cookie = `rolle= ${this.state.rolle};path=/`
		document.cookie = `name= ${document.getElementById('name').value};path=/`
		if (this.state.rolle === 'Student'){
			document.cookie = `kuerzel= ${document.getElementById('kuerzel').value};path=/`
			document.cookie = `mat_nr= ${document.getElementById('mat_nr').value};path=/`
		}
		setTimeout(()=>{
			this.props.onSignIn();
		},0);
	}

	handleChange = (rolle) => {
		this.setState({
			rolle: rolle.target.value,
			rolleEdited: true
		})
		setTimeout(()=>{
			if (this.state.rolle === "Student"){
				this.setState({
					kuerzelEdited: false,
					mat_nrEdited: false
				})
			}
			else {
				this.setState({
					kuerzelEdited: true,
					mat_nrEdited: true
				})
			}
		},0);
		setTimeout(()=>{
			console.log(this.state)
		},500);
	};

	// Validierung der Textfeldaenderungen 
	textFieldValueChange = (event) => {
		const value = event.target.value;

		let error = false;
		if (value.trim().lenght === 0) {
			error = true;
		}
		this.setState({
			[event.target.id + 'ValidationFailed']: error,
			[event.target.id + 'Edited']: true
		});
	}

	numberValueChange = (event) => {
		const value = event.target.value;
		const re = /^[0-9]{1,6}$/;

		let error = false;
		if (value.trim().lenght === 0) {
			error = true;
		}
		if (re.test(event.target.value) === false) {
			error = true;
		}
		this.setState({
			[event.target.id + 'ValidationFailed']: error,
			[event.target.id + 'Edited']: true
		});
	}


	// rendert die  Komponente SignIn Seite
	render() {
		const {rolle, rolleEdited, nameValidationFailed, nameEdited, kuerzelValidationFailed, kuerzelEdited, mat_nrValidationFailed, mat_nrEdited} = this.state;
		const { classes } = this.props;

		return <div>
				<Paper>
				<Card>
				<Typography className={classes.root} align='center' variant='h6'>Willkommen zur HDM Wahlfach App</Typography>
				<Grid container justify='center'>
					<Grid item>
						<FormControl className={classes.formControl}>
							<InputLabel>Rolle</InputLabel>
								<Select required onChange={this.handleChange}>
									<MenuItem value='Student'>Student</MenuItem>
									<MenuItem value='Dozent'>Dozent</MenuItem>
									<MenuItem value='Admin'>Admin</MenuItem>
								</Select>
						</FormControl>
						<form className={classes.form} autoComplete="off">
  							<TextField id="name" label="Name" error={nameValidationFailed} onChange = {this.textFieldValueChange}/>
						</form>
						{ rolle === 'Student' ?
						<>
						<form className={classes.form} autoComplete="off">
							<TextField id="kuerzel" label="Kürzel" error={kuerzelValidationFailed} onChange = {this.textFieldValueChange}/>
				  		</form>
						<form className={classes.form} autoComplete="off">
						<TextField id="mat_nr" label="Matrikelnummer" error={mat_nrValidationFailed} onChange = {this.numberValueChange}/>
					 	</form>
						</>
						:
						<></>
						}
					</Grid>
				</Grid>
				<Typography className={classes.root} align='center'>Für die Nutzung der weiteren Funktionen müssen Sie sich authentifizieren.</Typography>
				<Grid container justify='center'>
					<Grid item>
						<Button style={{marginBottom:"2em"}}variant='contained' color='primary' onClick={this.handleSignInButtonClicked}
						 disabled = { !rolleEdited || nameValidationFailed || !nameEdited || kuerzelValidationFailed || !kuerzelEdited || mat_nrValidationFailed || !mat_nrEdited}>
							Anmelden
      					</Button>
					</Grid>
				</Grid>
				</Card>
				</Paper>
			</div>
	}
}


/** Component specific styles */
const styles = theme => ({
	root: {
		margin: theme.spacing(2)
	},
	formControl: {
		minWidth: 180
	},
	form: {
		marginTop: theme.spacing(1)
	}
});

/** PropTypes */
SignIn.propTypes = {
	/** @ignore */
	classes: PropTypes.object.isRequired,
	/** 
	 * Handler function, which is called if the user wants to sign in.
	 */
	onSignIn: PropTypes.func.isRequired,
}

export default withStyles(styles)(SignIn)