import React from 'react'
import { makeStyles, Paper, Typography, Link } from '@material-ui/core';

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