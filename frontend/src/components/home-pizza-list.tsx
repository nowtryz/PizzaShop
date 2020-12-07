import React, {forwardRef} from 'react'
import useAxios from "axios-hooks"
import {ApiPizza} from "pizza-shop-commons/api"
import Pizza, {PizzaSkeleton} from "./pizza"
import {Container, createStyles, Grid} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {useDispatch} from "react-redux"
import {addProduct, openOrder} from "../store/actions"

const useStyle = makeStyles(theme => createStyles({
    container: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    pizza: {
        height: '100%'
    }
}))

const PizzaList = forwardRef<HTMLDivElement>((props, ref) => {
    const [{ data, loading, error }] = useAxios<(ApiPizza)[]>('/pizze')
    const classes = useStyle()
    const dispatch = useDispatch()
    const order = (pizza: ApiPizza) => () => {
        dispatch(addProduct(pizza))
        dispatch(openOrder())
    }

    return (
        <Container classes={{root: classes.container}} maxWidth="md" ref={ref}>
            <Grid container justify="center" spacing={3}>
                {loading || error ? [1,2,3].map(i => (
                    <Grid item md={4} sm={6} xs={12}  key={i}>
                        <PizzaSkeleton />
                    </Grid>
                )) : data.map((pizza) => (
                    <Grid item md={4} sm={6} xs={12} key={pizza._id}>
                        <Pizza
                            name={pizza.name}
                            ingredients={pizza.ingredients}
                            price={pizza.price}
                            classes={{root: classes.pizza}}
                            onOrder={order(pizza)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
})

export default PizzaList
