import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {
    Button, CircularProgress,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fade,
    IconButton,
    Step,
    StepLabel,
    Stepper,
    Typography
} from "@material-ui/core"
import {Close} from "@material-ui/icons"
import {makeStyles} from "@material-ui/core/styles"
import {ApiProduct} from "@pizza-shop/common"
import {RootState} from "../../store"
import {closeOrder, emptyCart} from "../../store/actions"
import Cart from './cart'
import User from "./user";
import axios from "../../api/axios";


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
    container: {
        padding: 0,
    },
}))

const steps = [
    'Valider le panier',
    'Authentification',
    'Envoyer',
]

const OrderDialog = () => {
    const open = useSelector<RootState,boolean>(state => state.dialog.order)
    const isUserLogged = useSelector<RootState, boolean>(state => state.user.logged)
    const products = useSelector<RootState,ApiProduct[]>(state => state.order)
    const [step, setStep] = useState(0)
    const dispatch = useDispatch()
    const classes = useStyle()

    const isCartEmpty = products.length === 0

    const handleClose = () => {
        dispatch(closeOrder())
        setStep(0)
    }

    const emptyCartAndClose = () => {
        dispatch(closeOrder())
        dispatch(emptyCart())
        setStep(0)
    }

    const sendOrder = async (products: ApiProduct[]) => {
        try {
            await axios.post('orders/create', products)
            // TODO use result
        } catch (err) {
            console.error(err)
        }

        emptyCartAndClose()
    }

    const handleNext = () => {
        if (step === 2) sendOrder(products).then()
        setStep(step + 1)
    }

    const isNextDisabled = (step: number) => {
        if (step === 0) return isCartEmpty
        if (step === 1) return !isUserLogged
        return step === 3;

    }

    // @ts-ignore
    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="md">
            <DialogTitle id="customized-dialog-title" classes={{root:classes.title}}>
                <Typography variant="h6" component="span">Votre commande</Typography>
                <IconButton aria-label="close" onClick={handleClose} classes={{root:classes.closeButton}}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers classes={{root: classes.container}}>
                <Stepper activeStep={step}>
                    {steps.map((v,i) => (
                        <Step completed={i < step}>
                            <StepLabel>{v}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Fade in={step === 0} timeout={{appear: 200, enter: 0, exit: 200}} mountOnEnter unmountOnExit>
                    <Cart />
                </Fade>
                <Fade in={step === 1} timeout={{appear: 200, enter: 200, exit: 200}} mountOnEnter unmountOnExit>
                    <User />
                </Fade>
                <Fade in={step === 2} timeout={{appear: 200, enter: 200, exit: 200}} mountOnEnter unmountOnExit>
                    <Typography>Validez votre commande</Typography>
                </Fade>
                <Fade in={step === 3} timeout={{appear: 200, enter: 200, exit: 200}} mountOnEnter unmountOnExit>
                    <CircularProgress />
                </Fade>
            </DialogContent>
            <DialogActions>
                <Button onClick={emptyCartAndClose} disabled={isCartEmpty} color="primary">
                    Vider le panier
                </Button>
                <Button autoFocus disabled={isNextDisabled(step)} color="primary" onClick={handleNext}>
                    {step < 2 ? 'Continuer' : 'Valider'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default OrderDialog
