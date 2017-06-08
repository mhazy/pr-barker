import * as Koa from "koa"

import { config } from "../lib/config"
import { validate } from "../lib/hmac"

export const validateGithubPayload = async (ctx: Koa.Context, next: () => void) => {
  const message = JSON.stringify(ctx.request.body)
  const valid = validate(config.$("secret"), message, ctx.headers["x-hub-signature"])
  if (!valid) {
    ctx.throw(503)
  }
  await next()
}
