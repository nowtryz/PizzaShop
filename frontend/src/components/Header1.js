import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundColor: theme.palette.primary.dark,
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(30),
      paddingBottom: theme.spacing(30),
    }
  },
  description: {
    color: theme.palette.background.secondary
  },
  primaryAction: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginRight: theme.spacing(0),
      marginBottom: theme.spacing(2),
    }
  },
  secondaryAction: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    }
  }
}));

export default function Header(props) {
  const classes = useStyles();

  const content = {
    'header-p1': 'Reservez et dégustez vos pizzas sur place',
    'primary-action': 'Action',
    'secondary-action': 'Action',
    'pattern': 'https://images4.alphacoders.com/988/thumb-350-988128.jpg',
    ...props.content
  };

  return (
    <section className={classes.section} style={{ backgroundImage: `url("${content['pattern']}")` }}>
      <Container maxWidth="md">
        <Box textAlign="center" >
          <Typography variant="h2" component="h2" gutterBottom={true}>
            <Typography color="primary" variant="h2" component="span">{content['header-p1']} </Typography>
            <Typography variant="h2" component="span">{content['header-p2']}</Typography>
          </Typography>
          <Container maxWidth="sm">
            <Typography variant="subtitle1" color="textSecondary" paragraph={true} className={classes.description}>{content['description']}</Typography>
          </Container>
          <Box mt={3}>
            <Button variant="contained" color="primary" className={classes.primaryAction}>{content['primary-action']}</Button>
          </Box>
        </Box>
      </Container>
    </section>
  );
}