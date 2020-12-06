import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import {RootState} from "../store";
import {openOrder} from "../store/actions";
import {useDispatch, useSelector} from "react-redux";

const images = [
  {
    url: 'https://static.jow.fr/750x750/recipes/CScFDYGmNvC4Wg.png.webp',
    title: 'La Parma',
    width: '34%',
  },
  {
    url: 'data:image/jpeg;base64,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',
    title: 'La Vesuvio',
    width: '33%',
  },
  {
    url: 'https://static.jow.fr/750x750/recipes/CScFDYGmNvC4Wg.png.webp',
    title: 'La Bouyaa',
    width: '33%',
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
      fontFamily:'Lobster',
      justifyContent: 'center',
    },
    image: {
      position: 'relative',
      height: 200,
      [theme.breakpoints.down('xs')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
      },
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
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
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
      fontFamily:'Lobster',
      fontSize:16,
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
  }),
);

export default function ButtonBasesP() {
  const classes = useStyles();
  const productsCount = useSelector<RootState, number>(state => state.order.length)
  const dispatch = useDispatch()
    
  const onCartClick = () => {
      dispatch(openOrder())
  }

  return (
    <div className={classes.root}>
      <h1 className={classes.root}>Bienvenue sur notre super site de Pizzeria</h1>
      <p className={classes.root}>Venez Déguster nos nouveautés</p>
      {images.map((image) => (
        
        <ButtonBase
          
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width,
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.url})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {image.title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
        
      ))}
      
    </div>
  );
}