import React from "react"
import {CircularProgress, createStyles, Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {UserState} from "../../store/user/reducers";
import GoogleLogin from "../login/google";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles(theme => createStyles({
    user: {
        color: theme.palette.text.primary,
    },
}))

const User = () => {
    const user = useSelector<RootState, UserState>(state => state.user)
    const classes = useStyle()

    if (!user.logged) {
        return user.loading ? <CircularProgress /> : <GoogleLogin />
    } else {
        const {surname, name} = user
        return (
            <Typography color="textSecondary">
                <span>Cliquez sur suivant pour continuer en tant que </span>
                <span className={classes.user}>{surname} {name}</span>
            </Typography>
        )
    }
}

export default User
