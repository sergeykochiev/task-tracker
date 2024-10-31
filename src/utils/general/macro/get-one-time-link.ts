import AppConfig from "../../../config/env/app.config";

export default function macroGetOneTimeLink(uuid: string) {
    return `${AppConfig.HOST}:${AppConfig.PORT}/macro/${uuid}`
}