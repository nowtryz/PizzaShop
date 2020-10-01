import initDatabase from '../../../src/init-database'
import Pizza from "../../../src/models/Pizza";
import logger from "../../../src/logger";
import {it} from "@jest/globals";

it('test Mongo\'s Pizza Schema', async (done)  => {
    await initDatabase({serverSelectionTimeoutMS : 5000})

    const name = "Royal"
    const pizza = Pizza({
        ingredients: ["Mozzarella, Tomatoes, Ham, Mushroom, Olives, Cheese"],
        allergen: ["Milk"],
        name,
        price: 7.50
    })

    await pizza.save()
    const royal = await Pizza.find({name})

    logger.log(royal)
    console.log(royal)

    expect(royal).toMatchObject(pizza)
    done()
}, 6000)


