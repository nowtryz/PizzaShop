import React, {FormEvent, useState} from 'react'
import {Pizza} from '@pizza-shop/common'
import {createPizza} from "../api/pizza-service";
import {Button, createStyles, Paper, Snackbar, TextField, Typography} from "@material-ui/core";
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {makeStyles} from "@material-ui/core/styles";

const initialPizza: Pizza =  {
    name: '',
    price: 0,
    ingredients:  [],
    allergen:  [],
}

const useStyle = makeStyles(theme => createStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        margin: theme.spacing(2)
    }
}))

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PizzaForm = () => {
    const classes = useStyle()
    const [pizza, setPizza] = useState(initialPizza)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(false)

    const onUserChange = <P extends keyof Pizza>(prop: P, value: Pizza[P]) => {
        setPizza({ ...pizza, [prop]: value } as Pizza);
    };

    const savePizza = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await createPizza(pizza)
            setPizza(initialPizza)
            setSubmitted(true)
        } catch (e) {
            console.log(e)
            setError(true)
        }
    }

    return (
        <Paper>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={submitted}
                autoHideDuration={6000}
                onClose={e => setSubmitted(false)}
            >
                <Alert onClose={() => setSubmitted(false)} severity="success">
                    La pizza a été ajouté !
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={error}
                autoHideDuration={6000}
                onClose={e => setError(false)}
            >
                <Alert onClose={() => setSubmitted(false)} severity="error">
                    Une erreur est survenue !
                </Alert>
            </Snackbar>
            <form noValidate autoComplete="off" className={classes.root} onSubmit={savePizza}>
                <Typography variant="h4">Créer une pizza</Typography>
                <TextField
                    id="name"
                    label="Nom de la pizza"
                    defaultValue={pizza.name}
                    classes={{root: classes.textField}}
                    onChange={e => onUserChange('name', e.currentTarget.value)}
                    fullWidth
                />
                <TextField
                    id="price"
                    type="number"
                    label="Prix de la pizza"
                    defaultValue={pizza.price}
                    classes={{root: classes.textField}}
                    onChange={e => onUserChange('price', parseInt(e.currentTarget.value) | 0)}
                    fullWidth
                />
                <Button type="submit" color="primary">Envoyer</Button>
            </form>
        </Paper>
    )
}

export default PizzaForm
