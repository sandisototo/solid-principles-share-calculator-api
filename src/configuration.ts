require('dotenv')
  .config()

import { AppConfiguration } from './models/configuration/app-configuration'

const configuration: AppConfiguration = {
  logger: {
    level: process.env.LOGGER_LEVEL,
    service: process.env.LOGGER_SERVICE
  },
  server: {
    port: process.env.PORT
  }
}

export { configuration }
