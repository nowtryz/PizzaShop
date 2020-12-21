import React from "react"
import {
    Accordion as MuiAccordion,
    AccordionDetails as MuiAccordionDetails,
    AccordionSummary as MuiAccordionSummary,
    createStyles,
    Grid,
    Typography, withStyles
} from "@material-ui/core"
import Sidebar from "./siderbar"
import Scrollbar from "react-perfect-scrollbar"
import {ExpandMore} from "@material-ui/icons"
import PizzaList from "./pizza-list"
import {makeStyles} from "@material-ui/core/styles"


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
    sidebar: {
        borderRight: `${theme.palette.divider} solid 1px`,
    },
    orderPane: {
        maxHeight: '600px',
    }
}))


const Cart = () => {
    const classes = useStyle()

    return (
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
    )
}

export default Cart
