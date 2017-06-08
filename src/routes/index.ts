import * as KoaRouter from "koa-router"

import { githubRouter } from "./github/github.router"
import { healthCheckRouter } from "./health/health.router"

export const apiRouter = new KoaRouter()

apiRouter.use("/", healthCheckRouter.routes())
apiRouter.use("/github", githubRouter.routes())
