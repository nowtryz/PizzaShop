import {afterAll, afterEach, beforeAll, describe, it} from "@jest/globals";
import {closeConnection, initDatabase} from "../../../src/loaders/database";
import Order from "../../../src/models/Order";
import Pizza from "../../../src/models/Pizza";
import {Types} from "mongoose";

describe('Order Model tests', ()=> {
    beforeAll(async () => {
        await initDatabase({serverSelectionTimeoutMS : 5000})
        await Order.deleteMany({})
    })

    afterEach(() => Order.deleteMany({}))
    afterAll(closeConnection)

    it('Create a Order', async () => {
        await new Order({
            products: [
                new Pizza({
                    name: "Simple pizza",
                    price: 5.50,
                    ingredients: ["tomatoes", "cheese"],
                    allergen: ["milk"]
                })
            ],
            taken: Date.now(),
            estimation: Date.now() + 2*60*60*1000, // in 2 hours
            client: new Types.ObjectId()
        }).save()

        expect(await Order.countDocuments()).toEqual(1)
    })

    //TODO throw error id count is not an integer

    it('Ensure fetched Order is equal', async (done)  => {
        const expected = Order({
            date: Date.now(),
            estimation: Date.now() + 2*60*60*1000,
            peopleCount: 7,
            client: Types.ObjectId()
        })

        await expected.save()
        const result = await Order.findById(expected._id, null, {lean: true})

        expect(result._id).toStrictEqual(expected._id)
        expect(result.date).toEqual(expected.date)
        expect(result.peopleCount).toBe(expected.peopleCount)

        done()
    }, 6000)
})
