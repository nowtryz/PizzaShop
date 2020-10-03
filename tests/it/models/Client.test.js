import {afterAll, beforeAll, beforeEach, describe, it} from "@jest/globals";
import {closeConnection, initDatabase} from "../../../src/loaders/database";
import Client from '../../../src/models/Client'

const clientObj = {
    surname: "Adrien",
    name: "Simard",
    email: "adrien.simard@etu.univ-smv.fr",
    pwd: "code"
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
        const expected = Client(clientObj)

        await expected.save()
        const result = await Client.findById(expected._id, null, {lean: true})

        expect(result._id).toStrictEqual(expected._id)
        expect(result.name).toEqual(expected.name)
        expect(result.surname).toEqual(expected.surname)
        expect(result.email).toEqual(expected.email)
        expect(result.pwd).toEqual(expected.pwd)
        expect(result.loyaltyPoint).toEqual(expected.loyaltyPoint)
        expect(...result.orders).toBe(...expected.orders)
        expect(...result.bookings).toBe(...expected.bookings)
        done()
    }, 6000)
})
