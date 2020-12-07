import React from 'react'
import { Parallax } from "react-parallax"
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import {useDispatch} from "react-redux"
import {openBooking} from "../store/actions"


const image = '/pizza.jpg'

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        minWidth: 300,
        width: '100%',
    },
    image: {
        position: 'relative',
        height: '100vh',
        width: '100%',
        '&:hover, &$focusVisible': {
            zIndex: 1,
                '& $imageBackdrop': {
                    opacity: 0.15,
            },
                '& $imageMarked': {
                    opacity: 0,
            },
                '& $imageTitle': {
                    border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
        fontSize: 24,
        fontFamily:'Lobster'
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
}))

export default function ImageBases() {
    const classes = useStyles();
    const dispatch = useDispatch()

    const BookingOpen = () => {
        dispatch(openBooking())
    };

    return (
        <div className={classes.root}>
            <Parallax
                bgImage={image}
                strength={400}
                blur={{min:-5,max:5}}
            >
                <ButtonBase
                    onClick={BookingOpen}
                    focusRipple
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                >
                    <span className={classes.imageBackdrop} />
                    <span className={classes.imageButton}>
                        <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                        >
                            Réservez et déguster sur place
                            <span className={classes.imageMarked} />
                        </Typography>
                    </span>
                </ButtonBase>
            </Parallax>
        </div>
      );
    }
