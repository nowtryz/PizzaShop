import {beforeEach, describe, it} from "@jest/globals";
import DailyMenu from "../../../src/models/DailyMenu";
import SimpleProduct from "../../../src/models/SimpleProduct";
import Pizza from "../../../src/models/Pizza";

const starterObj = {
    name: 'Salad',
    price: 2.70,
    type: 'starter'
}

const dessertObj = {
    name: 'Ice Cream',
    price: 3.10,
    type: 'dessert'
}

const pizzaObj = {
    ingredients: ["Mozzarella", "Tomatoes", "Ham", "Mushroom", "Olives", "Cheese"],
    allergen: ["Milk"],
    name: "Royal",
    price: 7.50
}

const createProducts = async () => {
    const starter = new SimpleProduct(starterObj)
    const dessert = new SimpleProduct(dessertObj)
    const pizza = new Pizza(pizzaObj)
    const menu = new DailyMenu({
        name: "12th October's special",
        price: 9.20,
        starter: starter._id,
        dessert: dessert._id,
        pizza: pizza._id,
    })

    await Promise.all([
        starter.save(),
        dessert.save(),
        pizza.save(),
        menu.save()
    ])

    return [menu, starter, dessert, pizza]
}

export default () => describe('DailyMenu Model tests', ()=> {
    beforeEach(async () => {
        await Promise.all([
            Pizza.deleteMany({}),
            DailyMenu.deleteMany({}),
            SimpleProduct.deleteMany({})
        ])
    })

    it('Create a DailyMenu', async () => {
        await createProducts()
        expect(await DailyMenu.countDocuments()).toEqual(1)
    })

    // TODO test starter is not a started ans dessert is not a dessert

    it('Ensure fetched DailyMenu is equal', async (done)  => {
        const [expected] = await createProducts()
        const result = await DailyMenu
            .findById(expected._id)
            .lean(true)
            .populate('starter')
            .populate('dessert')
            .populate('pizza')

        expect(result._id).toStrictEqual(expected._id)
        expect(result.name).toBe(expected.name)
        expect(result.price).toBe(expected.price)
        expect(result.starter).toMatchObject(starterObj)
        expect(result.dessert).toMatchObject(dessertObj)
        expect(result.pizza).toMatchObject(pizzaObj)

        done!()
    }, 6000)
})
