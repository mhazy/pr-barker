export interface IRepo {
  owner: string
  repository: string
}

export interface ITaskConfig {
  name: string
  repo: IRepo
  schedule: string
  github: string
  slack: string
}

export interface ILabel {
  name: string
}

export interface ILabelNode {
  node: ILabel
}

export interface IGraphLabels {
  edges: ILabelNode[]
}

export interface IPrAuthor {
  avatarUrl: string
  login: string
  url: string
}

export interface IPrNode {
  node: IPr
}

export interface IPr {
  author: IPrAuthor
  id: string
  createdAt: string
  title: string
  labels: IGraphLabels
  url: string
}

export interface IGraphPullRequests {
  edges: IPrNode[]
}

export interface IGraphRepository {
  pullRequests: IGraphPullRequests
}

export interface IGraphResponse {
  repository: IGraphRepository
}

export interface IPRSlackMessageField {
  short: boolean
  title: string
  value: string
}

export interface IPRSlackMessage {
  author_icon: string
  author_link: string
  author_name: string
  callback_id: string
  color: string
  fallback: string
  fields: IPRSlackMessageField[]
  title: string
  title_link: string
}

export interface IGithubWebhookUser {
  login: string
  avatar_url: string
  url: string
}

export interface IGithubWebhookPullRequest {
  url: string
  state: string
  created_at: string
  user: IGithubWebhookUser
}

export interface IGithubWebhookRepositoryOwner {
  login: string
  avatar_url: string
  url: string
  type: string
}

export interface IGithubWebhookRepository {
  name: string
  owner: IGithubWebhookRepositoryOwner
}

export interface IWebbook {
  action: string
  pull_request: IGithubWebhookPullRequest
  repository: IGithubWebhookRepository
}
