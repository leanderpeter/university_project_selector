import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography, withStyles } from '@material-ui/core';

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
				<Typography className={classes.root} align='center' variant='h6'>Welcome to the official Hdm ElectivApp</Typography>
				<Typography className={classes.root} align='center'>It appears, that you are not signed in.</Typography>
				<Typography className={classes.root} align='center'>To use the services of the HdM electivApp</Typography>
				<Grid container justify='center'>
					<Grid item>
						<Button variant='contained' color='primary' onClick={this.handleSignInButtonClicked}>
							Sign in with Go00ogle
      			</Button>
					</Grid>
				</Grid>
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