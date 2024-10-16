import RegisterStatus from "../../db/enum/register-status";
import { dbUpdateTrackerStatus } from "../db/tracker";

export default async function handleChannelRegistrationFailure(channelId: string) {
    await dbUpdateTrackerStatus(channelId, RegisterStatus.Failed)
}