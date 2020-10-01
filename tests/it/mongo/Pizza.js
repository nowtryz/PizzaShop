import initDatabase from '../../../src/init-database'
import Pizza from "../../../src/models/Pizza";
import logger from "../../../src/logger";

await initDatabase()

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


