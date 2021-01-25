import React from 'react'
import {makeStyles, Paper, Typography, Grid, Card, CardContent, Button, } from '@material-ui/core';
import Pascal from '../images/Pascal.jpg';
import Alex from '../images/Alex.jpg';
import Daria from '../images/Daria.jpg';
import Jannik from '../images/Jannik.jpg';
import Raphael from '../images/Raphael.jpg';
import Leander from '../images/Leander.jpg';

/**
 * About Page 
 * Link zu Xing Profil der Gruppenmitglieder
 * und Impressum
 * 
 * @author [Pascal Gienger](https://github.com/PascalGienger)
 */

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1)
  },
  content: {
    margin: theme.spacing(1),
    textAlign: "center",
  },  
  header:{
    textAlign: "center",
    marginBottom:"3%",
    marginTop:"5%"
  },
  container:{
    marginBottom:"2%",
  },
  img:{
    margin:"auto",
    display: "flex",
    marginTop:"5%",
    paddingTop:"4%",
    width:"68%", 
  },
  button:{
    display: "flex",
    margin:"auto",
    marginTop: "-3%",
    marginBottom:"5%",
  },
  hyperlink:{
    textDecoration: "none",
    color: theme.palette.primary.main,
  }
}));



function About() {

  const classes = useStyles();

  return (
    <div className={classes.content}>
      
        <Typography variant='h4' className={classes.header}>
          Unser Team
        </Typography>

          <Grid container item xs={12} spacing={3} className={classes.container} >
            <React.Fragment>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}>
                    <Card className={classes.root1}>
                      <img alt="Bild Raphael Müller" className={classes.img} src={Raphael} title="Raphael Müller"/>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Raphael Müller
                        </Typography>
                      </CardContent>
                      <Button className={classes.button} variant="contained" > <a className={classes.hyperlink}  href="https://www.xing.com/profile/Raphael_Mueller104/cv ">Xing Profile</a></Button>
                    </Card>
                  </Paper>
                </Grid>

                <Grid item xs={4}>
                  <Paper className={classes.paper}>
                    <Card className={classes.root1}>
                      <img alt="Bild Jannik Merz" className={classes.img} src={Jannik}title="Jannik Merz"/>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Jannik Merz
                        </Typography>
                      </CardContent>
                      <Button className={classes.button} variant="contained" > <a className={classes.hyperlink} href="https://www.xing.com/profile/Jannik_Merz/cv">Xing Profile</a></Button>
                    </Card>
                  </Paper>
                </Grid>
                
                <Grid item xs={4}>
                  <Paper className={classes.paper}>
                    <Card className={classes.root1}>
                      <img alt="Bild Leander Peter" className={classes.img} src={Leander} title="Leander Peter"/>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Leander Peter
                        </Typography>
                      </CardContent>
                      <Button className={classes.button} variant="contained" > <a className={classes.hyperlink} href="https://www.xing.com/profile/Leander_Peter/cv">Xing Profile</a></Button>
                    </Card>
                  </Paper>
                </Grid>
            </React.Fragment>
          </Grid>


          <Grid container item xs={12} spacing={3} className={classes.container}>
            <React.Fragment>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}>
                    <Card className={classes.root1}>
                      <img alt="Bild Daria Bilyk" className={classes.img} src={Daria} title="Daria Bilyk"/>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Daria Bilyk
                        </Typography>
                      </CardContent>
                      <Button className={classes.button}  variant="contained" > <a className={classes.hyperlink} href="https://www.xing.com/profile/Daria_Bilyk/cv">Xing Profile</a></Button>
                    </Card>
                  </Paper>
                </Grid>

                <Grid item xs={4}>
                  <Paper className={classes.paper}>
                    <Card className={classes.root1}>
                      <img alt="Bild Alexander Hofstetter" className={classes.img} src={Alex} title="Alexander Hofstetter"/>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Alexander Hofstetter
                        </Typography>
                      </CardContent>
                      <Button className={classes.button}  variant="contained" > <a className={classes.hyperlink} href="https://www.hdm-stuttgart.de/">Xing Profile</a></Button>
                    </Card>
                  </Paper>
                </Grid>

                <Grid item xs={4}>
                  <Paper className={classes.paper}>
                    <Card className={classes.root1}>
                      <img alt="Bild Pascal Gienger" className={classes.img} src={Pascal} title="Pascal Gienger"/>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Pascal Gienger
                        </Typography>
                      </CardContent>
                      <Button className={classes.button} variant="contained" > <a className={classes.hyperlink} href="https://www.xing.com/profile/Pascal_Gienger2/cv">Xing Profile</a></Button>
                    </Card>
                  </Paper>
                </Grid> 
            </React.Fragment>
          </Grid>

         
        <Typography variant='body2'>
          © Hochschule der Medien 2020, all rights reserved.
        </Typography>
      </div>
  )
}
export default About;