import { configuration } from './configuration'
import { AppFactory } from './factories/app-factory'
import { ExpressServer } from './services/express-server'
import { LoggerFactory } from './factories/logger-factory'
import { CalculatorService } from './services/calculator-service'
import { HealthController } from './controllers/health-controller'
import { CalculatorController } from './controllers/calculator-controller'
import { CalculatorRepository } from './repositories/calculator-repository'

/**
 * Start the HTTP service
 */
const startService = async () => {
  // Logging
  const loggerFactory = new LoggerFactory(configuration.logger)
  const processLogger = loggerFactory.getNamedLogger('share-calculator')

  // Repositories
  const calculatorRepository = new CalculatorRepository(loggerFactory)

  // Services
  const calculatorService = new CalculatorService(calculatorRepository, loggerFactory)

  // Controllers
  const healthController = new HealthController(loggerFactory)
  const calculatorController = new CalculatorController(calculatorService, loggerFactory)

  // Application
  const app = AppFactory.getInstance(calculatorController, healthController)
  const expressServer = new ExpressServer(app, loggerFactory, configuration.server)

  expressServer.run()
    .catch((error: Error) => processLogger.error('Process error', { message: error.message }))
}

Promise.resolve()
  .then(startService)
  .catch(console.error)
