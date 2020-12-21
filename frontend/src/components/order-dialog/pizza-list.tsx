import React from 'react'
import {Grid} from "@material-ui/core"
import Pizza, {PizzaSkeleton} from "../pizza"
import useAxios from "axios-hooks"
import {addProduct} from "../../store/actions"
import {ApiPizza} from "@pizza-shop/common"
import {useDispatch} from "react-redux"
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles({
    pizza: {
        height: '100%',
    },
})

const PizzaList = () => {
    const [{ data, loading, error }] = useAxios<(ApiPizza)[]>('/pizze')
    const dispatch = useDispatch()
    const classes = useStyle()
    const order = (pizza: ApiPizza) => () => {
        dispatch(addProduct(pizza))
    }

    return (
        <Grid container justify="center" spacing={3}>
            {data === undefined || loading || error ? [1,2,3].map(i => (
                <Grid item xl={3} xs={12} key={i}>
                    <PizzaSkeleton />
                </Grid>
            )) : data.map((pizza) => (
                <Grid item md={4} sm={6} xs={12} key={pizza._id}>
                    <Pizza
                        name={pizza.name}
                        ingredients={pizza.ingredients}
                        price={pizza.price}
                        onOrder={order(pizza)}
                        img={pizza.image}
                        buttonText="Ajouter au panier"
                        classes={{root: classes.pizza}}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default PizzaList
