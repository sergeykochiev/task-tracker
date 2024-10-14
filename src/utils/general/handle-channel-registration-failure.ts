import RegisterStatus from "../../db/enum/register-status";
import { dbUpdateTrackerStatusById } from "../db/tracker";

export default async function handleChannelRegistrationFailure(channelId: string) {
    await dbUpdateTrackerStatusById(channelId, RegisterStatus.Failed)
}