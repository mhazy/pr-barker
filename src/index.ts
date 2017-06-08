import * as Koa from "koa"
import * as bodyParser from "koa-bodyparser"
import * as helmet from "koa-helmet"
import * as morgan from "koa-morgan"

import { config } from "./lib/config"
import { logger, streamWriter } from "./lib/logger"
import { scheduleTasks } from "./lib/scheduler"
import { ITaskConfig } from "./lib/types"
import { apiRouter } from "./routes"

const app = new Koa()
app
  .use(bodyParser())
  .use(apiRouter.routes())
  .use(morgan("combined", { stream: streamWriter }))
const server = app.listen(3001)

// Schedule task
const tasks = config.$("tasks") as ITaskConfig[]
scheduleTasks(tasks)

// Process cleanup
process.on("uncaughtException", (err: Error) => {
  logger.error(err.message)
  server.close(() => {
    logger.silly("Server closed")
    process.exit(1)
  })
})

// Listen for SIGUSR2, used by nodemon to restart the application
if (process.env.NODE_ENV === "development") {
  logger.silly("Attaching SIGUSR2")
  const cleanShutdown = () => {
    logger.silly("Shutting down")
    server.close(() => {
      logger.silly("Server closed")
      process.kill(process.pid, "SIGKILL")
    })
  }

  process.once("SIGUSR2", cleanShutdown)
}
