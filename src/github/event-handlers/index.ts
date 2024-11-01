import GithubEventType from "../../enum/github-event-type";
import GithubEvents from "../../enum/macro/github-event";
import MacroTarget from "../../enum/macro/macro-target";
import GithubWebhookEventHandlerArgs from "../../types/handle-github-webhook-event-args";
import macroExecuteEventActions from "../../utils/general/macro/execute-actions";
import macroGetActionsByEvent from "../../utils/general/macro/get-actions-by-event";
import githubHandleInstallationEvent from "./installation";
import githubHandlePingEvent from "./ping";

export default async function githubHandleWebhookEvent(args: GithubWebhookEventHandlerArgs) {
    console.log("Received github webhook event:", args.eventType)
    // @ts-ignore
    const event = `${args.eventType}${args.data.hasOwnProperty("action") ? `/${args.data.action}` : ""}`
    switch(args.eventType) {
        case GithubEventType.Installation: githubHandleInstallationEvent(args.data); break
        case GithubEventType.Ping: githubHandlePingEvent(args.data); break
    }
    // @ts-ignore
    if(args.data.hasOwnProperty("sender") && args.data.sender.id === GithubAppConfig.USER_ID) {
        return
    }
    if(!(Object).values<string>(GithubEvents).includes(event)) return
    const eventActions = await macroGetActionsByEvent(MacroTarget.GITHUB, event as unknown as GithubEvents)
    if(eventActions.err !== null) return
    await macroExecuteEventActions(eventActions.data, args.data)
    return
}