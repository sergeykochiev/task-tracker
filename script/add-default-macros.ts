import "reflect-metadata"
import AppDataSource from "../src/db/data-source";
import macroSaveFromFile from "../src/utils/general/macro/save-from-file";
import fs from "node:fs"

async function initDefaultMacros() {
    await AppDataSource.initialize()
    await macroSaveFromFile(JSON.parse(fs.readFileSync("resources/default-actions.json").toString()))
}

initDefaultMacros()

