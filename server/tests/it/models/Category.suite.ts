import {beforeEach, describe, it} from "@jest/globals";
import Category from "../../../src/models/Category";
import {Types} from "mongoose";
import Pizza from "../../../src/models/Pizza";
import {Pizza as IPizza} from '@pizza-shop/common'

export default () => describe('Pizza Model tests', ()=> {
    beforeEach(() => Promise.all([
        Pizza.deleteMany({}),
        Category.deleteMany({}),
    ]))

    it('Create a Category', async () => {
        await new Category({
            name: "Tomato base"
        }).save()

        expect(await Category.countDocuments()).toEqual(1)
    })

    it('Avoid to save unknown pizza in a category', async () => {
        const category = new Category({
            name: "Tomato base",
            pizzas: [Types.ObjectId()]
        })

        expect(category.save).toThrow()
    })

    it('Ensure fetched Category is equal', async (done)  => {
        const pizza1 = new Pizza({
            ingredients: ["Mozzarella, Tomatoes, Ham, Mushroom, Olives, Cheese"],
            allergen: ["Milk"],
            name: "Royal",
            price: 7.50
        })

        const pizza2 = new Pizza({
            ingredients: ["Mozzarella, Tomatoes, Ham, Mushroom, Olives, Cheese"],
            allergen: ["Milk"],
            name: "Royal",
            price: 7.50
        })

        await Pizza.deleteMany({})
        await Promise.all([
            pizza1.save(),
            pizza2.save(),
        ])

        const expected = new Category({
            name: "Tomato base",
            pizzas: [pizza1._id, pizza2._id]
        })

        await expected.save()
        const result = await Category.findById(expected._id, null, {lean: true}).populate("pizzas")

        expect(result._id).toStrictEqual(expected._id)
        expect(result.name).toBe(expected.name)
        expect(result.pizzas.map((p:IPizza) => p.name)).toEqual([pizza1, pizza2].map(p => p.name))

        done!()
    }, 6000)
})
