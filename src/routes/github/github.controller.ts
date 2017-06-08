import * as Koa from "koa"
import { pathOr } from "ramda"

import { logger } from "../../lib/logger"

const events = {
  pull_request: {
    closed: "closed",
    labeled: "label added",
    opened: "opened",
    reopened: "reopened",
    unlabeled: "label removed"
  }
}

export const webhookController = async (ctx: Koa.Context, next: () => void) => {
  const event = ctx.headers["x-github-event"]
  const action = ctx.request.body.action
  const eventLabel = pathOr(false, [event, action], events)
  logger.info(`Event: ${event}, Action: ${action}`)
  if (eventLabel) {
    logger.info(`Accepted`)
    logger.info(`Action: ${action}`)
    logger.info(`Pull request ${eventLabel}`)
  } else {
    logger.info(`Discarded`)
  }
  ctx.body = 204
}
