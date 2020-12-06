import React, {MouseEventHandler, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "../store"
import {closeOrder, emptyCart, removeProduct} from "../store/actions"
import {
    Accordion as MuiAccordion, AccordionDetails as MuiAccordionDetails, AccordionSummary as MuiAccordionSummary,
    Button,
    Checkbox,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Typography, withStyles
} from "@material-ui/core"
import {Close, Delete, ExpandMore} from "@material-ui/icons"
import {makeStyles} from "@material-ui/core/styles"
import {ApiProduct} from "pizza-shop-commons/api"


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
    content: {
        padding: '16px 24px',
    },
    emptyCart: {
        height: '100%',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '& > *': {
            textAlign: 'center',
        },
    }
}))

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
})(MuiAccordion);

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
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

const OrderDialog = () => {
    const open = useSelector<RootState,boolean>(state=>state.dialog.order)
    const products = useSelector<RootState,ApiProduct[]>(state=>state.order)
    const [selected, setSelected] = useState<string[]>([])
    const dispatch = useDispatch()
    const classes = useStyle()


    const handleClose = () => {
        dispatch(closeOrder())
    }

    const emptyCartAndClose = () => {
        dispatch(closeOrder())
        dispatch(emptyCart())
    }

    const handleToggle = (product: ApiProduct): MouseEventHandler<HTMLDivElement> => () => {
        if (selected.indexOf(product._id) !== -1) setSelected(selected.filter(value => value !== product._id))
        else setSelected([
            ...selected,
            product._id,
        ])
    }

    const handleDelete = (product: ApiProduct): MouseEventHandler<HTMLButtonElement> => () => {
        setSelected(selected.filter(value => value !== product._id))
        dispatch(removeProduct(product))
    }

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
                        {products.length > 0 ? (
                            <div className={classes.content}>
                                <List>
                                    {products.map(value => (
                                        <ListItem key={value._id} dense button onClick={handleToggle(value)}>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={selected.indexOf(value._id) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': value._id }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={value._id} primary={value.name} />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="comments" onClick={handleDelete(value)}>
                                                    <Delete />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                </List>
                            </div>
                        ) : (
                            <div className={classes.emptyCart}>
                                <Typography variant="h5" component="p" color="textSecondary">Votre panier est vide</Typography>
                            </div>
                        )}
                    </Grid>
                    <Grid item xs={8}>
                        <Accordion square defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Accordion 1</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
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
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={emptyCartAndClose} disabled={products.length === 0} color="primary">
                    Vider le panier
                </Button>
                <Button autoFocus disabled={products.length === 0} color="primary">
                    Suivant
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default OrderDialog
