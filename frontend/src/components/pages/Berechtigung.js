import React from 'react'
import {TextField,InputLabel, FormControl,Select, MenuItem,Tab,makeStyles, Paper, Typography, Link, Grid, Card, CardMedia, CardContent, Collapse, CardHeader, Button, } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';  

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  }

  
}));

const rolle=[{value:"Student"},{value:"Dozent"}, {value:"Admin"},];



function Berechtigung() {

  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root} style={{display:"flex",align:'center',margin:'auto'}}>
      <div className={classes.content}>
      <div >
                <img style={{width: '80%'}}
                src="https://b-u-b.de/wp-content/uploads/2014/12/1480kl_bearb..jpg"/>
               <div style={{position: 'relative',marginTop:"-40%"}}>
                    <h1 style={{color:"white",webkitTextStroke:"2px black", fontSize:"60px"}}>Admin Login</h1>
                </div>
            </div>

            <Card style={{position: "relative",margin:"auto",width:"40%" , marginTop:"-2%",}}>
                <CardContent style={{textAlign:"center"}}>
                <Typography>
                    
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Berechtigung</InputLabel>
                        <Select>
                            <MenuItem value={10}>Student</MenuItem>
                            <MenuItem value={20}>Dozent</MenuItem>
                            <MenuItem value={30}>Admin</MenuItem>
                        </Select>
                </FormControl>
                </Typography>
                    
                    
                    <TextField
                        id="standard-password-input"
                        label="Passwort"
                        type="password"
                        autoComplete="current-password"
                        />               
                </CardContent>
            </Card>

      
      
      
      
      </div>
    </Paper>
  )
}

export default Berechtigung;