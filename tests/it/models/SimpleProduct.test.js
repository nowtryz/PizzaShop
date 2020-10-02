import {afterAll, afterEach, beforeAll, describe, it} from "@jest/globals";
import {closeConnection, initDatabase} from "../../../src/initDatabase";
import SimpleProduct from "../../../src/models/SimpleProduct";

describe('SimpleProduct Model tests', ()=> {
    beforeAll(async () => {
        await initDatabase({serverSelectionTimeoutMS : 5000})
        await SimpleProduct.deleteMany({})
    })

    afterEach(() => SimpleProduct.deleteMany({}))
    afterAll(closeConnection)

    describe('step 1', () => {
        it('Create a SimpleProduct', async () => {
            await new SimpleProduct({
                name: "Coca-Cola",
                price: 1.20,
                type: "drink"
            }).save()

            expect(await SimpleProduct.countDocuments()).toEqual(1)
        })
    })

    describe('step 2', () => {
        it('Ensure fetched SimpleProduct is equal', async (done)  => {
            const expected = SimpleProduct({
                name: "Coca-Cola",
                price: 1.20,
                type: "drink"
            })

            await expected.save()
            const result = await SimpleProduct.findById(expected._id, null, {lean: true})

            expect(result._id).toStrictEqual(expected._id)
            expect(result.name).toBe(expected.name)
            expect(result.price).toBe(expected.price)
            expect(result.type).toBe(expected.type)
            done()
        }, 6000)
    })
})
