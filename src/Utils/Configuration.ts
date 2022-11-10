import {readFileSync} from "fs";
import * as path from "path";
import {configurationValidator} from "../Validators/Others";



export let CONFIGURATION: IConfiguration;

export const load = ()=>{

    CONFIGURATION = configurationValidator.parse(JSON.parse(readFileSync(path.join(path.dirname(require.main!.filename), "config.json")).toString()))
    console.log(CONFIGURATION.LOADED)
    CONFIGURATION.LOADED = true;
}



export interface IConfiguration {
    LOADED: boolean,
    /** Prints out all logs */
    VERBOSE: boolean,
    /** Is debugging mode active */
    DEBUG: boolean,
    /** MongoDB configuration */
    DATABASE:{
        /** Hostname/IP of MongoDB instance */
        HOSTS: string[],
        /** Username for MongoDB connection */
        USERNAME: string,
        /** Password for MongoDB connection */
        PASSWORD: string,
        /** Database the authentication will be performed against */
        AUTH_DATABASE: string,
        /** Database for opassman data */
        DATA_DATABASE: string,
        /** Name of replica set to use (mandatory for transaction) */
        REPLICA_SET: string
    },
    /** API configuration */
    API:{
        /** Interface/IP on which the API will listen for requests */
        LISTEN_ADDRESS: string,
        /** Port on which the API will listen for requests */
        PORT: number
    }
}