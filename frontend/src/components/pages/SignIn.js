import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper,TextField,InputLabel, FormControl,Select, MenuItem,Tab,makeStyles, Typography, Link, Grid, Card, CardMedia, CardContent, Collapse, CardHeader, Button,} from '@material-ui/core';

/** Component specific styles */
const styles = theme => ({
	root: {
		margin: theme.spacing(2)
	}
});
const useStyles = makeStyles(theme => ({
	root: {
	  width: '100%',
	  marginTop: theme.spacing(2),
	  marginBottom: theme.spacing(2),
	  padding: theme.spacing(1)
	},
	content: {
	  margin: theme.spacing(1),
	  textAlign: "center",
	},
	
  
	
  }));
  
  const rolle=[{value:"Student"},{value:"Dozent"}, {value:"Admin"},];
  
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
		<Typography className={classes.root} align='center' variant='h6'>Willkommen zur HDM Wahlfach App</Typography>
		<Typography className={classes.root} align='center'>Für die Nutzung der weiteren Funktionen müssen Sie sich authentifizieren.</Typography>
		<Card>

		<Paper elevation={0} className={classes.root} style={{display:"flex",align:'center',margin:'auto'}}>
      		<div className={classes.content}>
      		<div >
                <img style={{display:"flex",width: '80%',margin:"auto"}}
                src="https://b-u-b.de/wp-content/uploads/2014/12/1480kl_bearb..jpg"/>
               <div style={{position: 'relative',marginTop:"-40%",textAlign:"center"}}>
                    <h1 style={{color:"white",webkitTextStroke:"2px black", fontSize:"60px"}}>Login</h1>
                </div>
            </div>

            <Card style={{position: "relative",margin:"auto",width:"40%" , marginTop:"-2%"}}>
                <CardContent style={{textAlign:"center"}}>
                <Typography>
				<div className={classes.content}>
                    
                <FormControl style={{minWidth: 180}}>
                    <InputLabel  id="demo-controlled-open-select-label" required id="standard-required"  >Berechtigung</InputLabel>
                        <Select>
                            <MenuItem value={10}>Student</MenuItem>
                            <MenuItem value={20}>Dozent</MenuItem>
                            <MenuItem value={30}>Admin</MenuItem>
                        </Select>
                </FormControl>
				</div>
                </Typography>
                    
                    
                    <TextField
                        id="standard-password-input"
                        label="Passwort"
                        type="password"
						autoComplete="current-password"
						helperText="Only Admin"
                        />      
				<Grid container justify='center'>
					<Grid item>
					<Button style={{marginTop:"15%",marginBottom:"3%"}}variant='contained' color='primary' onClick={this.handleSignInButtonClicked}>
							Sign in with Google
      				</Button>
					</Grid>
				</Grid>         
                </CardContent>

            </Card>
			</div>
    		</Paper>

				
				
				</Card>
				</Paper>
			</div>

	}
}

/*** Someone should check if we need this cludde after this comment! */




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