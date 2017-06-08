import * as KoaRouter from "koa-router"

import { validateGithubPayload } from "../../middleware/github"
import { webhookController } from "./github.controller"

export const githubRouter = new KoaRouter()

/**
 * 1) Validate webhook message (HMAC)
 * 2) Convert webhook to slack message (opened, label change)
 * 3) Post slack message
 */
githubRouter.post("/", validateGithubPayload, webhookController)
