import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Badge, IconButton} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {openOrder,openBooking} from "../store/actions";
//import FormDialog from "./booking-dialog";



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
    const productsCount = useSelector<RootState, number>(state => state.order.length)
    const dispatch = useDispatch()
    const classes = useStyles();

    const onCartClick = () => {
        dispatch(openOrder())
    }
    const BookingOpen = () => {
      dispatch(openBooking())
    };

    return (
        <AppBar position="fixed" color="default" classes={{root:classes.root}}>
            <Toolbar>
                <Typography variant="h5" className={classes.title}>
                Mama Pizza
                </Typography>
                <Button className={classes.menuButton} onClick={BookingOpen}>
                  Reserver
                  </Button>
                <Button className={classes.menuButton} onClick={onCartClick} >Commander</Button>
                <Button className={classes.menuButton} >Notre Carte</Button>
                <IconButton className={classes.menuButton} aria-label="cart" onClick={onCartClick}>
                    <Badge badgeContent={productsCount} color="error">
                        <ShoppingCartIcon fontSize="large" />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
