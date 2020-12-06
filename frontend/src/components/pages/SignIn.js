import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Card, Button, Grid, Typography, withStyles, Paper} from '@material-ui/core';

class SignIn extends Component {

	// Handles the click event of the sign in button and calls the prop onSignIn handler
	handleSignInButtonClicked = () => {
		this.props.onSignIn();
		console.log("Click!")
	}
	// renders the component/signIn page
	render() {
		const { classes } = this.props;
		console.log("Render!")
		return <div>
				<Paper>
					<Card>

				<img style={{margin:"auto",display: "flex",width:"80%",marginTop:"6%" }} src="https://www.hdm-stuttgart.de/news/news20200414121003/thumbstart"/>
				<Typography className={classes.root} align='center' variant='h6'>Willkommen zur HDM Wahlfach App</Typography>
				<Typography className={classes.root} align='center'>Für die Nutzung der weiteren Funktionen müssen Sie sich authentifizieren!</Typography>
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