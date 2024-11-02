import DISCORD_ACTION_TO_URL_MAP from "../../../const/discord/action-url-map";
import { DISCORD_AUTH_HEADERS, DISCORD_V10_API_ROOT } from "../../../const/discord/api";
import GITHUB_ACTION_TO_URL_MAP from "../../../const/github/action-url-map";
import { GITHUB_API_ROOT } from "../../../const/github/api";
import MacroActionEntity, { TargetBasedOn } from "../../../db/entity/macro-action.entity";
import DiscordActions from "../../../enum/macro/discord-action";
import GithubActions from "../../../enum/macro/github-action";
import MacroTarget from "../../../enum/macro/macro-target";
import githubGetInstallationAccessToken from "../../github/api/get-installation-access-token";
import githubGetRepositoryInstallation from "../../github/api/get-repo-installation";
import githubWithJwtRenewal from "../../github/api/with-jwt-renewal-wrapper";
import githubGetAuthHeaders from "../../github/get-auth-headers";
import makeRequest from "../request";
import macroPayloadFromParsedInfo from "./payload-from-parsed-info";

export default async function macroExecuteEventActions<Origin extends MacroTarget, Target extends TargetBasedOn<Origin>>(eventActions: MacroActionEntity<Origin, Target>[], eventPayload: Record<string, any>, githubInstallId?: number) {
    let githubToken = null
    let repoInstallId = githubInstallId
    for(let a = 0; a < eventActions.length; a++) {
        const action = eventActions[a]
        for(let t = 0; t < action.tracker_macro_actions.length; t++) {
            const tracker = action.tracker_macro_actions[t].tracker
            const [owner, repo] = [tracker.github_repository.owner, tracker.github_repository.name]
        // TODO should be a function somehow
        if(githubToken == null) {
            if(repoInstallId === undefined) {
                const repoInstallRes = await githubWithJwtRenewal(jwt => githubGetRepositoryInstallation(jwt, owner, repo))
                if(repoInstallRes.err !== null || !repoInstallRes.data.ok) continue
                repoInstallId = repoInstallRes.data.data.id
            }
            const tokenRes = await githubWithJwtRenewal(jwt => githubGetInstallationAccessToken(jwt, String(repoInstallId)))
            if(tokenRes.err !== null || !tokenRes.data.ok) continue
                githubToken = tokenRes.data.data.token
            }        
            const { match1, match2, ...actionPayload } = await macroPayloadFromParsedInfo(eventPayload, action.parseAdditionalInfo()!, action.info_requires_fetching ? DISCORD_AUTH_HEADERS : undefined)
            if(match1 && match1 !== match2) {
                return
            }
            let actionRes
            const { id, ...payload } = actionPayload
            switch(action.target) {
                case MacroTarget.DISCORD: {
                    if(action.action == DiscordActions.MessageCreate && tracker.role_to_ping) {
                        payload.content = `<@&${tracker.role_to_ping}> ${payload.content}`
                        payload.allowed_mentions = {
                            roles: [tracker.role_to_ping]
                        }
                    }
                    actionRes = await makeRequest(DISCORD_V10_API_ROOT + DISCORD_ACTION_TO_URL_MAP[action.action as DiscordActions](tracker.discord_channel_id), {
                        headers: DISCORD_AUTH_HEADERS,
                        method: "POST",
                        body: payload
                    })
                    console.dir(actionRes, {
                        depth: Infinity
                    })
                }
                continue
                case MacroTarget.GITHUB: {
                    if(githubToken == null) {
                        if(repoInstallId === undefined) {
                            const repoInstallRes = await githubWithJwtRenewal(jwt => githubGetRepositoryInstallation(jwt, owner, repo))
                            if(repoInstallRes.err !== null || !repoInstallRes.data.ok) continue
                            repoInstallId = repoInstallRes.data.data.id
                        }
                        const tokenRes = await githubWithJwtRenewal(jwt => githubGetInstallationAccessToken(jwt, String(repoInstallId)))
                        if(tokenRes.err !== null || !tokenRes.data.ok) continue
                        githubToken = tokenRes.data.data.token
                    }
                    actionRes = await makeRequest(GITHUB_API_ROOT + GITHUB_ACTION_TO_URL_MAP[action.action as GithubActions](owner, repo, id), {
                        headers: githubGetAuthHeaders(githubToken as string),
                        method: "POST",
                        body: payload
                    })
                    console.dir(actionRes, {
                        depth: Infinity
                    })
                }
                continue
            }
        }
    }
}