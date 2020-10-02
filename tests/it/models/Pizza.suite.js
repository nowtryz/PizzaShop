import {closeConnection, initDatabase} from '../../../src/initDatabase'
import {afterAll, afterEach, beforeAll, describe, it} from "@jest/globals"
import logger from "../../../src/logger"
import Pizza from "../../../src/models/Pizza";

export default () => describe('Pizza Model tests', ()=> {
    beforeAll(async () => {
        await initDatabase({serverSelectionTimeoutMS: 5000})
        await Pizza.deleteMany({})
    })

    afterEach(() => Pizza.deleteMany({}))
    afterAll(closeConnection)

    it('Create a Pizza', async () => {
        await new Pizza({
            ingredients: ["Mozzarella, Tomatoes, Ham, Mushroom, Olives, Cheese"],
            allergen: ["Milk"],
            name: "Royal",
            price: 7.50
        }).save()

        expect(await Pizza.countDocuments()).toEqual(1) // todo ensure sequentially
    })

    it('Ensure fetched Pizza is equal', async (done) => {
        const expected = Pizza({
            ingredients: ["Mozzarella, Tomatoes, Ham, Mushroom, Olives, Cheese"],
            allergen: ["Milk"],
            name: "Royal",
            price: 7.50
        })

        await expected.save()
        const result = await Pizza.findById(expected._id, null, {lean: true})

        expect(result._id).toStrictEqual(expected._id)
        expect(...result.ingredients).toBe(...expected.ingredients)
        expect(...result.allergen).toBe(...expected.allergen)
        expect(result.name).toBe(expected.name)
        expect(result.price).toBe(expected.price)
        done()
    }, 6000)
})

describe('Category Model tests', ()=> {

})


