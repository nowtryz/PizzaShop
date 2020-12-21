import {StatusCodes} from "http-status-codes/build/cjs";
import {RequestHandler} from "express";
import {Booking as IBooking} from '@pizza-shop/common';
import Booking from '../models/Booking'

export const createBooking : RequestHandler<{}, IBooking, IBooking> = async (req,res) =>
{
    // Il faut peut etre modifier les params
    const booking = new Booking(req.body)
    try{
        await booking.validate()
    }
    catch(error){
        res.status(StatusCodes.BAD_REQUEST).json(error);
        return
    }

    await booking.save()
    res.status(StatusCodes.CREATED).json(booking)
}
export const readBookings : RequestHandler<{}, Array<IBooking>, null> = async (req,res) =>{
    const bookings = await Booking.find({})
    res.status(StatusCodes.OK).json(bookings)
}

export const readBooking : RequestHandler<{date: Date}, IBooking | null, null> = async (req,res) =>{
    const booking = await Booking.findById(req.params.date)
    res.status(StatusCodes.OK).json(booking)
}

export const editBooking : RequestHandler<{id: string}, IBooking, IBooking> = async (req,res) =>{
    const _id = req.params.id
    const booking = new Booking({...req.body, _id,})
    try {
        await booking.validate()

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error)
        return
    }
    await Booking.replaceOne({_id},booking)
    res.status(StatusCodes.OK).json(booking)
}

export const deleteBooking : RequestHandler<{id: string}, null, null>= async (req,res) =>{
    Booking.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).end()
}
