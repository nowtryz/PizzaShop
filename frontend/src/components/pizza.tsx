import React, {MouseEventHandler} from 'react'
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {Skeleton} from "@material-ui/lab";


const useStyles = makeStyles(createStyles({
    media: {
        height: 300,
    },
    actions: {
        justifyContent: 'center'
    },
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    description: {
        flex: "auto"
    }
}))



const defaultImage = "https://img.cuisineaz.com/610x610/2016-04-28/i96018-pizza-reine.jpg"

export type PizzaSkeletonProps = {
    classes?: {
        media?: string
        actions?: string
        root?: string
    }
}

export const PizzaSkeleton = (props: PizzaSkeletonProps) => {
    const classes = {
        ...useStyles(),
        ...props.classes
    }

    return (
        <Card classes={{root:classes.root + ' ' + classes.container}}>
            <Skeleton animation="wave" variant="rect" className={classes.media} />
            <CardContent classes={{root: classes.description}}>
                <Typography gutterBottom variant="h4" component="h2">
                    <Skeleton animation="wave" />
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <Skeleton animation="wave" />
                </Typography>
                <Typography variant="body1" component="p">
                    <Skeleton animation="wave" />
                </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                <Button variant="contained" color="primary">
                    Commander
                </Button>
            </CardActions>
        </Card>
    )
}

export type PizzaProps = {
    img?: string
    name: string
    price: number
    ingredients: string[]
    classes?: {
        media?: string
        actions?: string
        root?: string
    }
    onOrder?: MouseEventHandler<HTMLButtonElement>
}

const Pizza = ({img = defaultImage, name, ingredients, price, onOrder, classes:override} : PizzaProps) => {
    const classes = {
        ...useStyles(),
        ...override
    }

    return (
        <Card classes={{root:classes.root + ' ' + classes.container}}>
            <CardMedia className={classes.media} image={img} title={name}/>
            <CardContent classes={{root: classes.description}}>
                <Typography gutterBottom variant="h4" component="h2">
                    {name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    ingrédients
                </Typography>
                <Typography variant="body1" component="p">
                    {ingredients.length > 0 ? ingredients.join(', ') : 'aucun'}
                </Typography>
                <Typography variant="body1" component="p">
                    Prix: {price} €
                </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                <Button variant="contained" color="primary" onClick={onOrder}>
                    Commander
                </Button>
            </CardActions>
        </Card>
    )
}

export default Pizza

