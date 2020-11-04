import {afterAll, beforeAll, beforeEach, describe, it} from "@jest/globals";
import {closeConnection, initDatabase} from "../../../src/loaders/database";
import Client from '../../../src/models/Client'
import Booking from "../../../src/models/Booking";
import Order from "../../../src/models/Order";

const clientObj = {
    surname: "Adrien",
    name: "Simard",
    email: "adrien.simard@etu.univ-smv.fr",
    pwd: "code",
}

describe('Client Model tests', ()=> {
    beforeAll( () => initDatabase({serverSelectionTimeoutMS : 5000}))
    beforeEach(() => Client.deleteMany({}))
    afterAll(closeConnection)

    it('Create a Client', async () => {
        await new Client(clientObj).save()

        expect(await Client.countDocuments()).toEqual(1)
    })

    it('Ensure fetched Client is equal', async (done)  => {
        const expected = new Client(clientObj)
        const booking = new Booking({
            peopleCount: 6,
            client: expected._id,
        })
        const order = new Order({
            estimation: Date.now() + 3600*1000, // + 1h
            client: expected._id,
        })

        await expected.save()
        await booking.save()
        await order.save()


        const result = await Client
            .findById(expected._id)
            .populate('bookings')
            .populate('orders')
            .lean()

        expect(result).not.toBeNull()
        expect(result._id).toStrictEqual(expected._id)
        expect(result.name).toEqual(expected.name)
        expect(result.surname).toEqual(expected.surname)
        expect(result.email).toEqual(expected.email)
        expect(result.pwd).toEqual(expected.pwd)
        expect(result.loyaltyPoint).toBe(0) // default value for loyalty points
        expect(result.orders.map(b => b._id)).toEqual([order._id])
        expect(result.bookings.map(b => b._id)).toEqual([booking._id])
        done()
    }, 6000)
})
