import { Repository } from "@octokit/webhooks-types"

type OverallRepository = Partial<Repository> & Pick<Repository, "full_name">

export interface GithubRepositoryEvent {
    repository: OverallRepository
}

export interface GithubRepositoriesEvent {
    repositories?: OverallRepository[] | undefined
}