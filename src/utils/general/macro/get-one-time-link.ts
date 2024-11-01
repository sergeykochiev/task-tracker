import AppConfig from "../../../envcfg/app.config";

export default function macroGetOneTimeLink(uuid: string) {
    return `${AppConfig.HOST}:${AppConfig.PORT}/macro/${uuid}`
}