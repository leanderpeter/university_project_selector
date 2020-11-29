import React from 'react'
import { makeStyles, Paper, Typography, Link, Grid, Card, CardMedia, CardContent, Collapse, CardHeader, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1)
  },
  content: {
    margin: theme.spacing(1),
  }
}));


/*

 @author Leander Peter github.com/leander_peter
 */
function About() {

  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      <div className={classes.content}>

      
      <Typography variant='h4' style={{textAlign: "center"}}>Hochschule der Medien
      </Typography>
    <Card className={classes.root}>
      
      <img style={{margin:"auto",display: "flex",marginTop:"0%",width:"80%" }}src="https://www.hdm-stuttgart.de/news/news20200414121003/thumbstart" />
    
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        Die Hochschule der Medien (HdM) ist eine staatliche Fachhochschule mit Sitz in Stuttgart. Fast 30 akkreditierte Bachelor- und Masterstudiengänge stehen zur Auswahl: vom Druck über audiovisuelle Medien, Informationsmanagement und Informatik, Werbung oder Medienproduktion bis hin zur Medienwirtschaft und Verpackungstechnik.
        </Typography>
      </CardContent>
      <Button style={{marginLeft:"43%",backgroundColor:"red"}} variant="contained" color="secondary"> <a style={{color:"white"}}href="https://www.hdm-stuttgart.de/">Visit Website</a></Button>
      </Card>

      <React.Fragment>
        <Grid item xs={4}><Paper className={classes.paper}>
          <Card className={classes.root}>
     
        <img style={{margin:"auto",display: "flex",marginTop:"0%",width:"50%" }}src="https://www.leichtathletik.de/fileadmin/_processed_/3/7/csm_mueller_r_hdm15_foto_chai_a70ce64a19.jpg"
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
      </Card>
      </Paper>

        </Grid>
        <Grid item xs={4}><Paper className={classes.paper}>
          
          <Card className={classes.root}>
     
        <img style={{margin:"auto",display: "flex",marginTop:"0%",width:"50%" }}src="https://profile-images.xing.com/images/15a25d6e24511f62164df882d9ecb497-1/jannik-merz.1024x1024.jpg"
          title="Raphael Müller"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Jannik Merz
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          I am a student at the HdM, I do Business Informatics.
          </Typography>
        </CardContent>
      </Card>
      </Paper>
        </Grid>
      
      </React.Fragment>

      
      
          
          
        <Typography variant='h6'>
          HdM ElectivApp
        </Typography>
        <br />
        <Typography>
          Written by <Link href=''>Pascal</Link>
        </Typography>
        <Typography>
          Written by <Link href=''>Alex</Link>
        </Typography>
        <Typography>
          Written by <Link href=''>Daria</Link>
        </Typography>
        <Typography>
          Written by <Link href=''>Jannik</Link>
        </Typography>
        <Typography>
          Written by <Link href=''>Raphael</Link>
        </Typography>
        <Typography>
          Written by <Link href=''>Leander</Link>
        </Typography>
        <br />
        <Typography variant='body2'>
          © Hochschule der Medien 2020, all rights reserved.
        </Typography>
      </div>
    </Paper>
  )
}

export default About;