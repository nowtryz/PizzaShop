import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "../store"
import {closeBooking} from "../store/actions";
import {Booking, Client} from 'pizza-shop-commons/models'

const randomClient: Client= {
  name: "string",
  surname: "string",
  email: "string",
  pwd: "string",
  loyaltyPoint:BigInt(0),
  bookings: [],
  orders:  [],
};

const initialBooking: Booking =  {
  date: new Date(Date.now()),
  peopleCount: 0,
  client:randomClient ,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      fontFamily: 'Lobster',
      background: 'none',
      color: "white",
      boxShadow: 'none',
      fontSize:18,
    },
    menuButton: {
      marginRight: theme.spacing(1),
      fontFamily: 'Lobster',
      color: "white",
      fontSize:18,
    },
    title: {
      marginLeft: theme.spacing(1),
      fontFamily: 'Lobster',
      flexGrow:1,
      textAlign:'left',

    },
  }),
)


export default function BookingDialog() {
  const open = useSelector<RootState,boolean>(state=>state.dialog.booking)
  const dispatch = useDispatch();
  const handleClose=()=>{
    dispatch(closeBooking())
}

  return (
    <div>

      <Dialog open={open}  onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Reserver une table</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Si vous voulez déguster une pizza nous vous proposons de réserver une table
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="peopleCount"
            label="Nombre de Personnes "
            inputProps={{ min: 0, max: 10 }}
            type="Number"
            fullWidth
          />
           <TextField
            autoFocus
            margin="dense"
            id="Date"
            type="datetime-local"
            fullWidth
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleClose} color="primary">
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
