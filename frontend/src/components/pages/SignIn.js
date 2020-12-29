import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Card, Button, Grid, Typography, withStyles, Paper, FormControl, InputLabel, Select, MenuItem, TextField} from '@material-ui/core';

class SignIn extends Component {

	constructor(props){
		super(props);

		this.state = {
			rolle: null,
		};
	}

	// Handles the click event of the sign in button and calls the prop onSignIn handler
	handleSignInButtonClicked = () => {
		this.props.onSignIn();
		console.log("Click!")
		document.cookie = `rolle= ${this.state.rolle};path=/`
		document.cookie = `name= ${document.getElementById('name').value};path=/`
		if (this.state.rolle === 0){
			document.cookie = `kuerzel= ${document.getElementById('kuerzel').value};path=/`
			document.cookie = `mat_nr= ${document.getElementById('mat_nr').value};path=/`
		}
	}

	handleChange = (rolle) => {
		this.setState({
			rolle: rolle.target.value
		})
		setTimeout(()=>{
			console.log('Gewählte Rolle:', this.state.rolle)
		},500);
	};


	// renders the component/signIn page
	render() {
		const {rolle} = this.state;
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
									<MenuItem value={0}>Student</MenuItem>
									<MenuItem value={1}>Dozent</MenuItem>
									<MenuItem value={2}>Admin</MenuItem>
								</Select>
						</FormControl>
						<form className={classes.form} noValidate autoComplete="off">
  							<TextField id="name" label="Name"/>
						</form>
						{ rolle === 0 ?
						<>
						<form className={classes.form} noValidate autoComplete="off">
							<TextField id="kuerzel" label="Kürzel" />
				  		</form>
						<form className={classes.form} noValidate autoComplete="off">
						<TextField id="mat_nr" label="Matrikelnummer" />
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
						<Button style={{marginBottom:"5%"}}variant='contained' color='primary' onClick={this.handleSignInButtonClicked}>
							Sign in with Google
      					</Button>
					</Grid>
				</Grid>
				</Card>
				</Paper>
			</div>

	}
}

/*** Someone should check if we need this cludde after this comment! */


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