import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "../store"
import {closeBooking} from "../store/actions";
import {Booking, Client} from '@pizza-shop/common'

const randomClient: Client= {
  name: "string",
  surname: "string",
  email: "string",
  password : "string",
  loyaltyPoint:BigInt(0),
  bookings: [],
  orders:  [],
}

const initialBooking: Booking =  {
  date: new Date(Date.now()),
  peopleCount: 0,
  client:randomClient ,
}

export default function BookingDialog() {
  const [booking, setBooking] = useState(initialBooking)
  const open = useSelector<RootState,boolean>(state=>state.dialog.booking)
  const dispatch = useDispatch();
  const handleClose=()=>{
    dispatch(closeBooking())
}

  const onChange = <P extends keyof Booking>(prop: P, value: Booking[P]) => {
    setBooking({ ...booking, [prop]: value } as Booking);
  };

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
            onChange={event => onChange('peopleCount', parseInt(event.currentTarget.value))}
            inputProps={{ min: 0, max: 10 }}
            type="Number"
            fullWidth
          />
           <TextField
            autoFocus
            margin="dense"
            id="Date"
            onChange={event => onChange('date', new Date(event.currentTarget.value))}
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
