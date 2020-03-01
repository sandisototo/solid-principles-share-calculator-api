import * as Logger from 'bunyan'

import { LoggerFactory } from '../factories/logger-factory'
import { Share, SharesToBuy } from '../models/shares/shares'

/**
 * Calculator Repository handles the retrieval and setting of calculated shares based on given amount
 */
class CalculatorRepository {
  /**
   * The child logger used in this repository
   */
  private logger: Logger

  /**
   * The current share price source: https://www.moneyweb.co.za/tools-and-data/click-a-company/CPI/
   */
  private readonly currentShare: Share = {
    bid: 0.0,
    bidVolume: 0,
    offer: 0.0,
    offerVolume: 0,
    open: 1299.99,
    prevClose: 1331.72,
    range: '1,264.46 - R1,325.49',
    volume: 467700

  }
  private readonly currentSharePrice: number

  /**
   * @constructor
   */
  constructor(loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.getNamedLogger('calculator-repository');
    this.currentSharePrice = this.currentShare.open
  }

  /**
   * Retrieve calculation results for a given amount a user have submitted
   */
  public getShares(amount: number): Promise<SharesToBuy> {
    
    const calculate = (amont: number): number => {
      if (amont <= 0) throw new Error('The amount to buy shares cannot be less or = to 0')
      if (amont < this.currentSharePrice) throw new Error(`The amount you entered is insufficient to buy any shares at the moment, current share price is R ${this.currentSharePrice}`)
      
      return parseFloat((amount / this.currentSharePrice).toFixed(2))
    }
    /**
     * Tap and log the response and return the calculation results
     */
    const tapResponse = (quantity: number): SharesToBuy => {
      this.logger.debug('Successfully calculated the number of shares this user can buy:', {quantity})
      return {
        price: this.currentSharePrice,
        quantity
      }
    }

    /**
     * Tap and log the error and rethrow to let it bubble up
     */
    const tapError = (error: Error): never => {
      this.logger.error('Error occurred whilst calculating shares a user can get', { message: error.message })
      throw error
    }

    this.logger.debug('Attempting to retrieve calculated shares for amount: ', { amount })
    return Promise.resolve(amount)
      .then(calculate)
      .then(tapResponse)
      .catch(tapError)
  }
}

export { CalculatorRepository }
