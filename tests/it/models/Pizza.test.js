import {describe} from "@jest/globals"
import pizzaSuite from './Pizza.suite'
import categorySuite from './Category.suite'
import dailyMenuSuite from './DailyMenu.suite'

describe('sequentially run Pizza related tests', () => {
    pizzaSuite()
    categorySuite()
    dailyMenuSuite()
})
