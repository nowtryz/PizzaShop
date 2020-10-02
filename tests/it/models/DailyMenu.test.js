import {afterAll, afterEach, beforeAll, beforeEach, describe, it} from "@jest/globals";
import {closeConnection, database} from "../../../src/database";
import DailyMenu from "../../../src/models/DailyMenu";
import SimpleProduct from "../../../src/models/SimpleProduct";
import Pizza from "../../../src/models/Pizza";

const createProducts = async () => {
    const starter = new SimpleProduct({
        name: 'Salad',
        price: 2.70,
        type: 'starter'
    })
    const dessert = new SimpleProduct({
        name: 'Ice Cream',
        price: 3.10,
        type: 'dessert'
    })
    const pizza = Pizza({
        ingredients: ["Mozzarella, Tomatoes, Ham, Mushroom, Olives, Cheese"],
        allergen: ["Milk"],
        name: "Royal",
        price: 7.50
    })
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

describe('DailyMenu Model tests', ()=> {
    beforeAll(() => database({serverSelectionTimeoutMS : 5000}))
    afterAll(closeConnection)
    beforeEach(async () => {
        await Promise.all([
            Pizza.deleteMany({}),
            DailyMenu.deleteMany({}),
            SimpleProduct.deleteMany({})
        ])
    })

    describe('step 1', () => {
        it('Create a DailyMenu', async () => {
            await createProducts()
            expect(await DailyMenu.countDocuments()).toEqual(1)
        })
    })

    // TODO test starter is not a started ans dessert is not a dessert

    describe('step 2', () => {
        it('Ensure fetched DailyMenu is equal', async (done)  => {
            const [expected, starter, dessert, pizza] = await createProducts()
            const result = await DailyMenu
                .findById(expected._id)
                .lean(true)
                .populate('starter')
                .populate('dessert')
                .populate('pizza')

            expect(result._id).toStrictEqual(expected._id)
            expect(result.name).toBe(expected.name)
            expect(result.price).toBe(expected.price)
            expect(result.starter).toMatchObject(starter)
            expect(result.dessert).toMatchObject(dessert)
            expect(result.pizza).toMatchObject(pizza)

            done()
        }, 6000)
    })
})
