import * as express from 'express'
import * as bodyParser from 'body-parser'

import { HealthController } from '../controllers/health-controller'
import { CalculatorController } from '../controllers/calculator-controller'

/**
 * App Factory creates and initializes and new instance of the application
 */
class AppFactory {
  /**
   * Get a configured application instance
   */
  public static getInstance(calculatorController: CalculatorController,
                            healthController: HealthController): express.Express {
    const app: express.Express = express()
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.use('/health', healthController.getRoutes())
    app.use('/calculate', calculatorController.getRoutes())

    return app
  }
}

export { AppFactory }
