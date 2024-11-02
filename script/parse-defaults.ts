import DEFAULT_ACTIONS from "../src/utils/general/macro/default-actions";
import fs from "node:fs"
import macroParseAdditionalInfo from "../src/utils/general/macro/parse-additional-info";

function saveJson(name: string, content: string) {
    fs.writeFileSync(`resources/${name}.json`, content)
}

function parseDefaultMacroActions() {
    if (!fs.existsSync("resources")) {
        fs.mkdirSync("resources");
    }
    DEFAULT_ACTIONS.map(data => {
        saveJson(data.name, JSON.stringify(macroParseAdditionalInfo({
            content: data.info
        }).additionalInfo))
    })
}

parseDefaultMacroActions()