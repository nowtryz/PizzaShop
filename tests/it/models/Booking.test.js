import {afterAll, afterEach, beforeAll, describe, it} from "@jest/globals";
import {closeConnection, database} from "../../../src/database";
import Booking from "../../../src/models/Booking";

describe('Booking Model tests', ()=> {
    beforeAll(async () => {
        await database({serverSelectionTimeoutMS : 5000})
        await Booking.deleteMany({})
    })

    afterEach(() => Booking.deleteMany({}))
    afterAll(closeConnection)

    describe('step 1', () => {
        it('Create a Booking', async () => {
            await new Booking({
                date: Date.now(),
                peopleCount: 7,
            }).save()

            expect(await Booking.countDocuments()).toEqual(1)
        })
    })

    //TODO throw error id count is not an integer

    describe('step 2', () => {
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
})
