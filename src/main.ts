import {CONFIGURATION, load} from "./Utils/Configuration";
import express, {Express} from "express";
import {connect} from "mongoose";
import helmet from "helmet";
import cors from "cors";
import path from "path";
const pino = require("pino")

load();
export const logger = pino(pino.transport({
    targets: [
    {target: "pino/file", options:{destination: path.join(path.dirname(require.main!.filename), "../logs/info.log"), mkdir:true, level: 'info'}},
    {target: "pino/file", options:{destination: path.join(path.dirname(require.main!.filename), "../logs/error.log"), mkdir:true, level: 'error'}},
        ...(CONFIGURATION.DEBUG || CONFIGURATION.VERBOSE ? [{target: "pino/file", options: {destination: 1}}] : [])]
}))


async function main(){
    try{
        let server: Express;

        await connect(`mongodb://${CONFIGURATION.DATABASE.USERNAME}:${CONFIGURATION.DATABASE.PASSWORD}@${CONFIGURATION.DATABASE.HOSTS}/${CONFIGURATION.DATABASE.DATA_DATABASE}?replicaSet=${CONFIGURATION.DATABASE.REPLICA_SET}&authMechanism=DEFAULT&authSource=${CONFIGURATION.DATABASE.AUTH_DATABASE}`);


        server = express();
        server.use(helmet());
        server.use(cors())
        server.use(express.json());
        server.use(require("pino-http")({logger: logger}))

        server.listen(CONFIGURATION.API.PORT, ()=>{console.log("Server listening on port " + CONFIGURATION.API.PORT)})

        console.log(CONFIGURATION)

    }catch(err: unknown){
        console.error(err)
    }
}

main();


