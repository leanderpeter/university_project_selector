import React from 'react'
import {makeStyles, Paper, Typography, Grid, Card, CardContent, Button, } from '@material-ui/core';
import pascal from '../images/pascal.jpg';

/**
 * About Page und Impressum
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
    marginTop:"0%",
    paddingTop:"4%",
    width:"68%", 
  },
  button:{
    display: "flex",
    margin:"auto",
    marginBottom:"5%",
    backgroundColor: theme.palette.secondary.main,
  },
  hyperlink:{
    color:"#026466",
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
                      <img alt="Bild Raphael Müller" className={classes.img} src="https://www.imago-images.de/bild/sp/0047040892/s.jpg" title="Raphael Müller"/>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Raphael Müller
                        </Typography>
                      </CardContent>
                      <Button className={classes.button} variant="contained" > <a className={classes.hyperlink} href="https://www.xing.com/profile/Raphael_Mueller104/cv ">Xing Profile</a></Button>
                    </Card>
                  </Paper>
                </Grid>

                <Grid item xs={4}>
                  <Paper className={classes.paper}>
                    <Card className={classes.root1}>
                      <img alt="Bild Jannik Merz" className={classes.img} src="https://profile-images.xing.com/images/15a25d6e24511f62164df882d9ecb497-1/jannik-merz.1024x1024.jpg" title="Jannik Merz"/>
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
                      <img alt="Bild Leander Peter" className={classes.img} src="https://pbs.twimg.com/profile_images/1321033014906966022/FfIl7cGE.jpg" title="Leander Peter"/>
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


          <Grid container item xs={12} spacing={3} style={{marginBottom:"5%"}}>
            <React.Fragment>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}>
                    <Card className={classes.root1}>
                      <img alt="Bild Daria Bilyk" className={classes.img} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIeqgZiptkRGerhe8HeYd6LDMWfSsaohvs5g&usqp=CAU" title="Daria Bilyk"/>
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
                      <img alt="Bild Alexander Hofstetter" className={classes.img} src="https://cdn.pixabay.com/photo/2016/10/02/03/15/smiley-1708870_960_720.png" title="Alexander Hofstetter"/>
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
                      <img alt="Bild Pascal Gienger" className={classes.img} src={pascal} title="Pascal Gienger"/>
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