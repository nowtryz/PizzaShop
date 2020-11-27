import React from 'react'
import useAxios from "axios-hooks"
import {Pizza as IPizza} from "pizza-shop-commons/models"
import {ApiDocument} from "pizza-shop-commons/api"
import Pizza, {PizzaSkeleton} from "./pizza"
import {Container, createStyles, Grid} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles(theme => createStyles({
    container: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    }
}))

const PizzaList = () => {
    const [{ data, loading, error }] = useAxios<(IPizza & ApiDocument)[]>('/pizze')
    const classes = useStyle()

    return (
        <Container classes={{root: classes.container}} maxWidth="lg">
            <Grid container justify="center" spacing={3}>
                {loading || error ? [1,2,3].map(i => (
                    <Grid item xl={3} xs={12} key={i}>
                        <PizzaSkeleton />
                    </Grid>
                )) : data.map(({_id, name, ingredients, price}) => (
                    <Grid item lg={3} md={4} sm={6} xs={12} key={_id}>
                        <Pizza name={name} ingredients={ingredients} price={price}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default PizzaList
