import React from 'react';
import { createStyles, makeStyles, responsiveFontSizes, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';





const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      fontFamily: 'Lobster',
      background: 'none',
      color: "white",
      boxShadow: 'none',
      fontSize:18,

    },
    menuButton: {
      marginRight: theme.spacing(1),
      fontFamily: 'Lobster',
      color: "white",
      fontSize:18,
      
      
    },
    title: {
      marginLeft: theme.spacing(1),
      fontFamily: 'Lobster',
      flexGrow:1,
      textAlign:'left',
      
    },
  }),
);

export default function ButtonAppBar() {
  const classes = useStyles();
  
  return (
    
    <AppBar position="fixed" color="default" classes={{root:classes.root}}>
        <Toolbar>
            <Typography variant="h5" className={classes.title}>
            Mama Pizza
            </Typography>
            <Button className={classes.menuButton} >Commander</Button>
            <Button className={classes.menuButton} >Notre Carte</Button>
        </Toolbar>
    </AppBar>
    
  );
}