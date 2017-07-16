import { GraphQLClient } from "graphql-request"
import * as moment from "moment-timezone"
import { always, cond, flip, lte, T } from "ramda"

import { config } from "../lib/config"
import { logger } from "../lib/logger"
import {
  IGraphPullRequests,
  IGraphRepository,
  IGraphResponse,
  IPr,
  IPrNode,
  IPRSlackMessage,
  IRepo,
  ITaskConfig
} from "../lib/types"

const getPrQuery = (repo: IRepo, count: number): string => `
  query {
    repository(owner:"${repo.owner}" name: "${repo.repository}") {
      pullRequests(first: ${count}, states:OPEN, orderBy: {field: CREATED_AT, direction: DESC}) {
        edges {
          node {
            id
            createdAt
            author {
              avatarUrl
              login
              resourcePath
              url
            }
            labels(first: 10) {
              edges {
                node {
                  name
                }
              }
            }
            url
            title
          }
        }
      }
    }
  }
`

const getColorForMessage = cond([
  [flip(lte)(2), always("good")],
  [flip(lte)(4), always("warning")],
  [T, always("danger")]
])

export const transformPrToSlackMessage = (pr: IPr): IPRSlackMessage => {
  const created = moment(pr.createdAt).tz("America/Toronto")
  const now = moment.now()
  const days = -created.diff(now, "days")
  return {
    author_icon: pr.author.avatarUrl,
    author_link: pr.author.url,
    author_name: pr.author.login,
    callback_id: `pull_request:${pr.id}`,
    color: getColorForMessage(days),
    fallback: `**${pr.title}** by ${pr.author.login} (${pr.url})`,
    fields: [{
      short: true,
      title: "Opened",
      value: created.fromNow(false)
    }, {
      short: true,
      title: "Labels",
      value: pr.labels.edges.map((edge) => edge.node.name).join(", ")
    }],
    title: pr.title,
    title_link: pr.url
  }
}

const handleGraphResponse = (response: IGraphResponse): IPrNode[] => response.repository.pullRequests.edges
const reformPrNodes = (nodes: IPrNode[]): IPr[] => nodes.map((node) => node.node)
const createClient = (token: string) => {
  return new GraphQLClient("https://api.github.com/graphql", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const getRepositoryPullRequests = (repoConfig: ITaskConfig, count: number = 25): Promise<IPr[]> => {
  return createClient(repoConfig.github)
    .request(getPrQuery(repoConfig.repo, count))
    .then(handleGraphResponse)
    .then(reformPrNodes)
}
