import React, {MouseEventHandler, useState} from 'react'
import {
    Checkbox,
    createStyles,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {ApiProduct} from "../../../../common/src/api";
import {removeProduct} from "../../store/order/actions";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles(createStyles({
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
    },
}))

const Sidebar = () => {
    const products = useSelector<RootState, ApiProduct[]>(state => state.order, shallowEqual)
    const [selected, setSelected] = useState<string[]>([])
    const dispatch = useDispatch()
    const classes = useStyle()

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

    if (products.length > 0) return (
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
    )
    else return (
        <div className={classes.emptyCart}>
            <Typography variant="h5" component="p" color="textSecondary">Votre panier est vide</Typography>
        </div>
    )
}

export default Sidebar
