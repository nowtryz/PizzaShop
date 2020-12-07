import React, {useRef} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "../../store"
import {closeOrder, emptyCart} from "../../store/actions"
import {
    Accordion as MuiAccordion,
    AccordionDetails as MuiAccordionDetails,
    AccordionSummary as MuiAccordionSummary,
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Typography,
    withStyles
} from "@material-ui/core"
import {Close, ExpandMore} from "@material-ui/icons"
import {makeStyles} from "@material-ui/core/styles"
import Sidebar from "./siderbar"
import PizzaList from "./pizza-list"
import {ApiProduct} from "pizza-shop-commons/api"
import Scrollbar from 'react-perfect-scrollbar'


const Accordion = withStyles({
    root: {
        border: 'none',
        borderTop: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion)

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary)

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails)

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
    sidebar: {
        borderRight: `${theme.palette.divider} solid 1px`,
    },
    container: {
        padding: 0,
    },
    orderPane: {
        maxHeight: '600px',
    }
}))

const OrderDialog = () => {
    const open = useSelector<RootState,boolean>(state=>state.dialog.order)
    const products = useSelector<RootState,ApiProduct[]>(state => state.order)
    const dispatch = useDispatch()
    const classes = useStyle()

    const isCartEmpty = products.length === 0

    const handleClose = () => {
        dispatch(closeOrder())
    }

    const emptyCartAndClose = () => {
        dispatch(closeOrder())
        dispatch(emptyCart())
    }

    // @ts-ignore
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
                <Grid container>
                    <Grid item xs={4} classes={{item: classes.sidebar}}>
                        <Sidebar/>
                    </Grid>
                    <Grid item xs={8} classes={{root: classes.orderPane}}>
                        <Scrollbar>
                            <Accordion square defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Pizzas</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <PizzaList/>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion square>
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography>Accordion 2</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                        sit amet blandit leo lobortis eget.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Scrollbar>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={emptyCartAndClose} disabled={isCartEmpty} color="primary">
                    Vider le panier
                </Button>
                <Button autoFocus disabled={isCartEmpty} color="primary">
                    Suivant
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default OrderDialog
