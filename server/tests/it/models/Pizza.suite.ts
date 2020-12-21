import {afterEach, beforeAll, describe, it} from "@jest/globals"
import Pizza from "../../../src/models/Pizza";

export default () => describe('Pizza Model tests', ()=> {
    beforeAll(() => Pizza.deleteMany({}))
    afterEach(() => Pizza.deleteMany({}))

    it('Create a Pizza', async () => {
        await new Pizza({
            ingredients: ["Mozzarella", "Tomatoes", "Ham", "Mushroom", "Olives", "Cheese"],
            allergen: ["Milk"],
            name: "Royal",
            price: 7.50
        }).save()

        expect(await Pizza.countDocuments()).toEqual(1) // todo ensure sequentially
    })

    it('Ensure fetched Pizza is equal', async (done) => {
        const expected = new Pizza({
            ingredients: ["Mozzarella", "Tomatoes", "Ham", "Mushroom", "Olives", "Cheese"],
            allergen: ["Milk"],
            name: "Royal",
            price: 7.50
        })

        await expected.save()
        const result = await Pizza.findById(expected._id, null, {lean: true})

        expect(result._id).toStrictEqual(expected._id)
        expect(result.ingredients).toStrictEqual([...expected.ingredients])
        expect(result.allergen).toStrictEqual([...expected.allergen])
        expect(result.name).toBe(expected.name)
        expect(result.price).toBe(expected.price)
        done!()
    }, 6000)
})


