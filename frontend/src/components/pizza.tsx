import React from 'react'
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles({
    media: {
        height: 300,
    },
    actions: {
        justifyContent: 'center'
    }
})



const defaultImage = "https://img.cuisineaz.com/610x610/2016-04-28/i96018-pizza-reine.jpg"

const Pizza = ({img = defaultImage, name, ingredients} : PizzaProps) => {
    const classes = useStyles();

    return (
        <div>
            <Card>
                <CardMedia className={classes.media} image={img} title={name}/>
                <CardContent>
                    <Typography gutterBottom variant="h4" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        ingrédients
                    </Typography>
                    <Typography variant="body1" component="p">
                        {ingredients.join(', ')}
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions}>
                    <Button variant="contained" color="primary">
                        Commander
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

export type PizzaProps = {
    img?: string
    name: string
    ingredients: string[]
}

export default Pizza

