import {z as zod} from "zod";
import {IConfiguration} from "../Utils/Configuration";

//TODO: Default error messages for invalid properties
export const configurationValidator = zod.object({
    LOADED: zod.boolean().optional().transform(()=> false),
    VERBOSE: zod.boolean().optional().default(false),
    DEBUG: zod.boolean().optional().transform(()=>{
        return process.env.DEBUG === "True"
    }),
    DATABASE: zod.object({
        HOSTS: zod.array(zod.string()).min(1),
        USERNAME: zod.string().min(1),
        PASSWORD: zod.string().min(1),
        AUTH_DATABASE: zod.string().min(1),
        DATA_DATABASE: zod.string().min(1),
        REPLICA_SET: zod.string().min(1)
    }),
    API:zod.object({
        LISTEN_ADDRESS: zod.string().default("0.0.0.0"),
        PORT: zod.number().min(1).default(4000)
    })
})