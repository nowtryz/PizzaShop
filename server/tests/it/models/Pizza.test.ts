import {afterAll, beforeAll, describe} from "@jest/globals"
import pizzaSuite from './Pizza.suite'
import categorySuite from './Category.suite'
import dailyMenuSuite from './DailyMenu.suite'
import {closeConnection, initDatabase} from "../../../src/loaders/database";

describe('sequentially run Pizza related tests', () => {
    beforeAll(() => initDatabase({serverSelectionTimeoutMS: 5000}))
    afterAll(closeConnection)

    pizzaSuite()
    categorySuite()
    dailyMenuSuite()
})
