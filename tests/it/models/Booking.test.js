import {afterAll, afterEach, beforeAll, describe, it} from "@jest/globals";
import {closeConnection, initDatabase} from "../../../src/loaders/database";
import Booking from "../../../src/models/Booking";

describe('Booking Model tests', ()=> {
    beforeAll(async () => {
        await initDatabase({serverSelectionTimeoutMS : 5000})
        await Booking.deleteMany({})
    })

    afterEach(() => Booking.deleteMany({}))
    afterAll(closeConnection)

    it('Create a Booking', async () => {
        await new Booking({
            date: Date.now(),
            peopleCount: 7,
        }).save()

        expect(await Booking.countDocuments()).toEqual(1)
    })

    //TODO throw error id count is not an integer

    it('Ensure fetched Booking is equal', async (done)  => {
        const expected = Booking({
            date: Date.now(),
            peopleCount: 7,
        })

        await expected.save()
        const result = await Booking.findById(expected._id, null, {lean: true})

        expect(result._id).toStrictEqual(expected._id)
        expect(result.date).toEqual(expected.date)
        expect(result.peopleCount).toBe(expected.peopleCount)

        done()
    }, 6000)
})
