import "reflect-metadata"
import AppDataSource from "./db/data-source"
import express from 'express';
import AppConfig from "./envcfg/app.config";
import githubHandleWebhookEvent from "./handlers/github";
import discordHandleWebhookEvent from "./handlers/discord";
import d from "dotenv"

d.configDotenv({
    path: "/.env"
})
d.configDotenv({
    path: "/.db.env"
})

// TODO save jwts (probably not) and macrocreate uuid in redis
async function bootstrap() {
    AppDataSource.initialize()
    const app = express()

    app.post('/github', express.json(), githubHandleWebhookEvent)
    app.post('/discord', express.json(), discordHandleWebhookEvent)
    app.get('/', (_, res) => {
        res.status(200).send("Hi")
    })

    const PORT = AppConfig.PORT
    app.listen(PORT, () => {
        console.log('API listening on port', PORT)
    })
}

bootstrap()
