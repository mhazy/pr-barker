import * as scheduler from "node-schedule"

import { getRepositoryPullRequests, transformPrToSlackMessage } from "../adapter/github"
import { postAttachmentsToSlack } from "../adapter/slack"
import { config } from "./config"
import { logger } from "./logger"
import { IPr, IRepo, ITaskConfig } from "./types"

const handleScheduledTask = (repoConfig: ITaskConfig) =>
  getRepositoryPullRequests(repoConfig)
    .then((prs) => prs.map(transformPrToSlackMessage))
    .then(postAttachmentsToSlack(repoConfig))

const createScheduledTask = (repoConfig: ITaskConfig) => () =>
  handleScheduledTask(repoConfig)
    .then(() => logger.info(
      `Completed task for ${repoConfig.repo.owner}/${repoConfig.repo.repository}`
    ))
    .catch((err) => logger.error(
      `Failed posting messages for ${repoConfig.repo.owner}/${repoConfig.repo.repository} - ${err.message}`
    ))

const scheduleTask = (taskConfig: ITaskConfig) => {
  scheduler.scheduleJob(taskConfig.schedule, createScheduledTask(taskConfig))
}

export const scheduleTasks = (tasks: ITaskConfig[]) => {
  tasks.forEach(scheduleTask)
}
