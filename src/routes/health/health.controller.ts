import * as Koa from "koa"

export async function healthCheckController(ctx: Koa.Context, next: () => void) {
  ctx.body = {
    ok: "stay classy"
  }
  await next()
}
