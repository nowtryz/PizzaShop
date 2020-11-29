import React from 'react'
import {shallowEqual, useDispatch, useSelector} from "react-redux"
import {RootState} from "../store"
import {OrderState} from "../store/order/reducers"
import {closeOrderDialog, emptyCart} from "../store/order/actions"
import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    List,
    ListItem,
    Typography
} from "@material-ui/core"
import {Close} from "@material-ui/icons"
import {makeStyles} from "@material-ui/core/styles";


const useStyle = makeStyles(theme => createStyles({
    title: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}))

const OrderDialog = () => {
    const {dialog: open, products} = useSelector<RootState, OrderState>(state => state.order, shallowEqual)
    const dispatch = useDispatch()
    const classes = useStyle()


    const handleClose = () => {
        dispatch(closeOrderDialog())
    }

    const emptyCartAndClose = () => {
        dispatch(closeOrderDialog())
        dispatch(emptyCart())
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" classes={{root:classes.title}}>
                <Typography variant="h6">Votre commande</Typography>
                <IconButton aria-label="close" onClick={handleClose} classes={{root:classes.closeButton}}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container>
                    <Grid item xs={3}>
                        <List>
                            {products.map(value => (
                                <ListItem>
                                    {value.name}
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography gutterBottom>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                        </Typography>
                        <Typography gutterBottom>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                            lacus vel augue laoreet rutrum faucibus dolor auctor.
                        </Typography>
                        <Typography gutterBottom>
                            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                            auctor fringilla.
                        </Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={emptyCartAndClose} color="primary">
                    Vider le panier
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default OrderDialog
