import * as Logger from 'bunyan'

import { SharesToBuy} from '../models/shares/shares'
import { LoggerFactory } from '../factories/logger-factory'
import { CalculatorRepository } from '../repositories/calculator-repository'

/**
 * Calculator Service handles the manipulation share calculation results
 */
class CalculatorService {
  /**
   * The logger for the calculation service
   */
  private logger: Logger

  /**
   * @constructor
   */
  constructor(protected calculatorRepository: CalculatorRepository, loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.getNamedLogger('calculator-service')
  }

  /**
   * Get calculation results for a given amount a user have submitted
   */
  public getShares(amount: number): Promise<any> {
    /**
     * Format the retrieved raw share response data and return appropriately formatted shares to buy results
     */
    const formatResponse = (share: SharesToBuy): SharesToBuy => ({
      price: share.price,
      quantity: share.quantity
    })

    /**
     * Tap and log the response
     */
    const tapResponse = (shares: SharesToBuy): SharesToBuy => {
      this.logger.debug('Successfully retrieved number of shares a user can buy:', { shares })
      return shares
    }

    /**
     * Tap and log error and rethrow to bubble up
     */
    const tapError = (error: Error): never => {
      this.logger.error('Error occurred whilst retrieving calculated results', {
        message: error.message,
        amount
      })
      throw error
    }

    this.logger.debug('Attempting to retrieve calculated shares for amount', { amount })
    return this.calculatorRepository.getShares(amount)
      .then(formatResponse)
      .then(tapResponse)
      .catch(tapError)
  }
}

export { CalculatorService }
