import React from 'react'
import {makeStyles, Paper, Typography, Grid, Card, CardContent, Button, } from '@material-ui/core';
import pascal from '../images/pascal.jpg';

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
  button: {
    backgroundColor: theme.palette.secondary.main,
  }
}));



function About() {

  const classes = useStyles();

  return (
      <div className={classes.content}>

      <Typography variant='h4' style={{textAlign: "center", marginBottom:"3%", marginTop:"5%"}}>Unser Team
      </Typography>
      
      <Grid container item xs={12} spacing={3} style={{marginBottom:"2%"}}>
      <React.Fragment>
        <Grid item xs={4}><Paper className={classes.paper1}>
          <Card className={classes.root1}>
     
        <img alt="Bild Raphael Müller" style={{margin:"auto",display: "flex",marginTop:"0%",width:"68%" }} src="https://www.imago-images.de/bild/sp/0047040892/s.jpg"
          title="Raphael Müller"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Raphael Müller
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          I am a student at the HdM, I do Business Informatics.
          </Typography>
        </CardContent>
        <Button className={classes.button} style={{display: "flex", margin:"auto",marginBottom:"5%"}} variant="contained" > <a style={{color:"#026466"}}href="https://www.xing.com/profile/Raphael_Mueller104/cv ">Xing Profile</a></Button>
      
      </Card>
      </Paper>

        </Grid>
        <Grid item xs={4}><Paper className={classes.paper}>
          
          <Card className={classes.root1}>
     
        <img alt="Bild Jannik Merz" style={{margin:"auto",display: "flex",marginTop:"0%",width:"50%" }}src="https://profile-images.xing.com/images/15a25d6e24511f62164df882d9ecb497-1/jannik-merz.1024x1024.jpg"
          title="Jannik Merz"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Jannik Merz
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          I am a student at the HdM, I do Business Informatics.
          </Typography>
        </CardContent>
        <Button className={classes.button} style={{display: "flex", margin:"auto",marginBottom:"5%"}} variant="contained" > <a style={{color:"#026466"}}href="https://www.xing.com/profile/Jannik_Merz/cv">Xing Profile</a></Button>
      
      </Card>
      </Paper>
        </Grid>

    
        <Grid item xs={4}><Paper className={classes.paper}>
          <Card className={classes.root1}>
     
        <img alt="Bild Leander Peter" style={{margin:"auto",display: "flex",marginTop:"0%",width:"50%" }}src="https://pbs.twimg.com/profile_images/1321033014906966022/FfIl7cGE.jpg"
          title="Leander Peter"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Leander Peter
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          I am a student at the HdM, I do Business Informatics.
          </Typography>
        </CardContent>
        <Button className={classes.button} style={{display: "flex", margin:"auto",marginBottom:"5%"}} variant="contained" > <a style={{color:"#026466"}}href="https://www.xing.com/profile/Leander_Peter/cv">Xing Profile</a></Button>
      
      </Card>
      </Paper>
      </Grid>
      
      </React.Fragment>
      </Grid>


      <Grid container item xs={12} spacing={3} style={{marginBottom:"5%"}}>
      <React.Fragment>
        <Grid item xs={4}><Paper className={classes.paper1}>
          <Card className={classes.root1}>
     
        <img alt="Bild Daria Bilyk" style={{margin:"auto",display: "flex",marginTop:"0%",width:"50%" }}src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIeqgZiptkRGerhe8HeYd6LDMWfSsaohvs5g&usqp=CAU"
          title="Daria Bilyk"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Daria Bilyk
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          I am a student at the HdM, I do Business Informatics.
          </Typography>
        </CardContent>
        <Button className={classes.button} style={{display: "flex", margin:"auto",marginBottom:"5%"}} variant="contained" > <a style={{color:"#026466"}}href="https://www.xing.com/profile/Daria_Bilyk/cv">Xing Profile</a></Button>
      
      </Card>
      </Paper>

        </Grid>
        <Grid item xs={4}><Paper className={classes.paper}>
          
          <Card className={classes.root1}>
     
        <img alt="Bild Alexander Hofstetter" style={{margin:"auto",display: "flex",marginTop:"0%",width:"50%" }}src="https://cdn.pixabay.com/photo/2016/10/02/03/15/smiley-1708870_960_720.png"
          title="Alexander Hofstetter"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Alexander Hofstetter
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          I am a student at the HdM, I do Business Informatics.
          </Typography>
        </CardContent>
        <Button className={classes.button} style={{display: "flex", margin:"auto",marginBottom:"5%"}} variant="contained" > <a style={{color:"#026466"}}href="https://www.hdm-stuttgart.de/">Xing Profile</a></Button>
      
      </Card>
      </Paper>
        </Grid>

    
        <Grid item xs={4}><Paper className={classes.paper}>
          <Card className={classes.root1}>
     
        <img alt="Bild Pascal Gienger" style={{margin:"auto",display: "flex",marginTop:"0%",width:"50%" }}src={pascal}
          title="Pascal Gienger"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Pascal Gienger
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          I am a student at the HdM, I do Business Informatics.
          </Typography>
        </CardContent>
        <Button className={classes.button} style={{display: "flex", margin:"auto",marginBottom:"5%"}} variant="contained" > <a style={{color:"#026466"}}href="https://www.xing.com/profile/Pascal_Gienger2/cv">Xing Profile</a></Button>
      
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