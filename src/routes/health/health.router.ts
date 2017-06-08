import * as KoaRouter from "koa-router"
import { healthCheckController } from "./health.controller"

export const healthCheckRouter = new KoaRouter()

healthCheckRouter.get("/", healthCheckController)
