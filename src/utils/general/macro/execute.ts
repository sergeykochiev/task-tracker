import DISCORD_ACTION_TO_URL_MAP from "../../../const/discord/action-url-map";
import { DISCORD_AUTH_HEADERS, DISCORD_V10_API_ROOT } from "../../../const/discord/api";
import GITHUB_ACTION_TO_URL_MAP from "../../../const/github/action-url-map";
import { GITHUB_API_ROOT } from "../../../const/github/api";
import MacroEntity from "../../../db/entity/macro.entity";
import DiscordActions from "../../../enum/macro/discord-action";
import GithubActions from "../../../enum/macro/github-action";
import MacroTarget from "../../../enum/macro/macro-target";
import githubGetInstallationAccessToken from "../../github/api/get-installation-access-token";
import githubGetRepositoryInstallation from "../../github/api/get-repo-installation";
import githubWithJwtRenewal from "../../github/api/with-jwt-renewal-wrapper";
import githubGetAuthHeaders from "../../github/get-auth-headers";
import macroMatch from "./match";
import { macroGetMatches, macroGetPayloadFromFields } from "./value-construction-utils";

export default async function macroExecute(macros: MacroEntity[], eventPayload: Record<string, any>, githubInstallId?: number) {
    let githubToken = null
    let repoInstallId = githubInstallId
    if(!macros) return
    for(let m = 0; m < macros.length; m++) {
        const macro = macros[m]
        if(!macro.trackers) continue
        for(let t = 0; t < macro.trackers.length; t++) {
            console.log("MACRO executing", macro.action.action)
            const tracker = macro.trackers[t]
            const [owner, repo] = [tracker.github_repository.owner, tracker.github_repository.name]
            // TODO should be a function somehow
            if(githubToken === null) {
                if(repoInstallId === undefined) {
                    const repoInstallRes = await githubWithJwtRenewal(jwt => githubGetRepositoryInstallation(jwt, owner, repo))
                    if(!repoInstallRes.ok) continue
                    repoInstallId = (await repoInstallRes.json()).id
                }
                const tokenRes = await githubWithJwtRenewal(jwt => githubGetInstallationAccessToken(jwt, String(repoInstallId)))
                if(!tokenRes.ok) continue
                githubToken = (await tokenRes.json()).token
            }
            const fetchHeaders = macro.info_requires_fetching ? macro.event.origin == MacroTarget.DISCORD ? DISCORD_AUTH_HEADERS : githubGetAuthHeaders(githubToken) : undefined
            const { match1, match2, matchType, ...infoToParse } = macro.parseAdditionalInfo()!
            const actionPayload = await macroGetPayloadFromFields(eventPayload, infoToParse, fetchHeaders)
            if(match1 !== undefined && match2 !== undefined && matchType !== undefined && !macroMatch(matchType, ...(await macroGetMatches(eventPayload, match1, match2, fetchHeaders)))) {
                return
            } 
            let actionRes;
            const { id, ...payload } = actionPayload
            switch(macro.action.target) {
                case MacroTarget.DISCORD: {
                    if(macro.action.action == DiscordActions.MessageCreate && tracker.role_to_ping) {
                        payload.content = `<@&${tracker.role_to_ping}> ${payload.content}`
                        payload.allowed_mentions = {
                            roles: [tracker.role_to_ping]
                        }
                    }
                    const api = DISCORD_ACTION_TO_URL_MAP[macro.action.action as DiscordActions]
                    const url = DISCORD_V10_API_ROOT + api.url(tracker.discord_channel_id)
                    console.log("\nMACRO making", api.method, "request to", url, "with payload", payload, "\n")
                    actionRes = await fetch(url, {
                        headers: DISCORD_AUTH_HEADERS,
                        method: api.method,
                        body: JSON.stringify(payload)
                    })
                    break
                }
                case MacroTarget.GITHUB: {
                    if(githubToken === null) {
                        if(repoInstallId === undefined) {
                            const repoInstallRes = await githubWithJwtRenewal(jwt => githubGetRepositoryInstallation(jwt, owner, repo))
                            if(!repoInstallRes.ok) continue
                            repoInstallId = (await repoInstallRes.json()).id
                        }
                        const tokenRes = await githubWithJwtRenewal(jwt => githubGetInstallationAccessToken(jwt, String(repoInstallId)))
                        if(!tokenRes.ok) continue
                        githubToken = (await tokenRes.json()).token
                    }
                    const api = GITHUB_ACTION_TO_URL_MAP[macro.action.action as GithubActions]
                    const url = GITHUB_API_ROOT + api.url(owner, repo, id)
                    console.log("\nMACRO making", api.method, "request to", url, "with payload", payload, "\n")
                    console.log(githubToken)
                    actionRes = await fetch(url, {
                        headers: githubGetAuthHeaders(githubToken as string),
                        method: api.method,
                        body: JSON.stringify(payload)
                    })
                    break
                }
            }
            console.log("RESPONSE execute macro status", actionRes.status, "payload", await actionRes.json())
        }
    }
}