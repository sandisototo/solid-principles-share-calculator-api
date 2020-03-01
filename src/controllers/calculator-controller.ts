import { Request, Response } from 'express'

import { Controller } from '../types/controller'
import { LoggerFactory } from '../factories/logger-factory'
import { CalculatorService } from '../services/calculator-service'

/**
 * Calculator controller handles requests relating to the share amount calculation
 */
class CalculatorController extends Controller {
  /**
   * @constructor
   */
  constructor(protected calculatorService: CalculatorService, loggerFactory: LoggerFactory) {
    super(loggerFactory.getNamedLogger('calculator-controller'))
  }

  /**
   * @inheritDoc
   */
  public setRoutes(): void {
    this.logger.info('Setting up routes for controller')
    this.router.post('/', this.getShares.bind(this))
  }


  /**
   * Get calculation results for a given amount a user have submitted
   */
  public getShares(request: Request, response: Response): Promise<Response> {
    const amount = parseInt(request.body.amount)

    /**
     * Send the response back to the client
     */
    const sendResponse = (shares: object) => response.json(shares)
      .status(200)

    this.logger.debug('Getting number of share for R', { amount })
    return this.calculatorService.getShares(amount)
      .then(sendResponse)
      .catch((error: Error) => { 
        return response.json(error.message).status(400)
      })
  }
}

export { CalculatorController }
