import * as request from "request-promise"
import { logger } from "../lib/logger"
import { IPRSlackMessage, ITaskConfig } from "../lib/types"

export const postAttachment = (taskConfig: ITaskConfig) => (attachment: IPRSlackMessage) => {
  const message = JSON.stringify({
    attachments: [attachment]
  })
  return request({
    body: `payload=${message}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    json: true,
    method: "post",
    uri: taskConfig.slack
  })
}

export const postAttachmentsToSlack = (taskConfig: ITaskConfig) => (attachments: IPRSlackMessage[]) => {
  const postAttachmentForConfig = postAttachment(taskConfig)
  const requests = attachments.map(postAttachmentForConfig)
  return Promise.all(requests)
}
