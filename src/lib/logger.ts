import * as winston from "winston"
import { config } from "../lib/config"

class StreamWriter {
  private logger: winston.LoggerInstance

  constructor(loggerInstance: winston.LoggerInstance) {
    this.logger = loggerInstance
  }

  public write(message: string) {
    this.logger.info(message.trim())
  }
}

const transports = [
  new winston.transports.Console({
    colorize: true,
    handleExceptions: true,
    json: false,
    level: config.$("app.log.console_level")
  })
]

export const logger = new winston.Logger({
  exitOnError: false,
  transports
})

export const streamWriter = new StreamWriter(logger)
