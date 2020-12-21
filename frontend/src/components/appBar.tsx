import React, {MouseEventHandler, RefObject} from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {Badge, IconButton, useScrollTrigger} from "@material-ui/core"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "../store"
import {openBooking, openOrder} from "../store/actions"
import cx from 'classnames'


const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        background: 'none',
        color: "white",
        boxShadow: 'none',
        fontSize:18,
        transition: 'color 1s, background 1s'
    },
    scrolled: {
        color: 'rgba(0, 0, 0, 0.87)',
        backgroundColor: '#f5f5f5af',
    },
    menuButton: {
        marginRight: theme.spacing(1),
        fontSize:18,
        color: 'inherit'
    },
    titleLink: {
        color: 'inherit',
        textDecoration: 'none',
    },
    title: {
        marginLeft: theme.spacing(1),
        fontFamily: 'Lobster',
        flexGrow: 1,
        textAlign:'left',
        transition: 'font-size 1s',
    },
    titleScrolled: {
        fontSize: '2rem',
    }
}))

export type ButtonAppBarProps = {
    orderRef: RefObject<HTMLDivElement>
}

const ButtonAppBar = ({orderRef}: ButtonAppBarProps) =>  {
    const productsCount = useSelector<RootState, number>(state => state.order.length)
    const dispatch = useDispatch()
    const classes = useStyles();
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: window.innerHeight - 30,
    });

    const openCart = () => dispatch(openOrder())
    const BookingOpen = () => dispatch(openBooking())
    const gotToMenu = () => orderRef.current?.scrollIntoView()
    const onTitleClick: MouseEventHandler<HTMLAnchorElement> = event => {
        event.preventDefault()
        window.scrollTo(0,0)
    }

    return (
        <AppBar position="fixed" color="default" classes={{root:cx(classes.root, {[classes.scrolled]: trigger})}}>
            <Toolbar>
                <Typography variant="h5" className={cx(classes.title, {[classes.titleScrolled]: !trigger})}>
                    <a href="/" onClick={onTitleClick} className={classes.titleLink}>Mama Pizza</a>
                </Typography>
                <Button className={classes.menuButton} onClick={BookingOpen}>Réserver</Button>
                <Button className={classes.menuButton} onClick={openCart}>Commander</Button>
                <Button className={classes.menuButton} onClick={gotToMenu}>Notre Carte</Button>
                <IconButton className={classes.menuButton} aria-label="cart" onClick={openCart}>
                    <Badge badgeContent={productsCount} color="error">
                        <ShoppingCartIcon fontSize="large" />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default ButtonAppBar
