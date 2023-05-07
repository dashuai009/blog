import { DataSource } from "typeorm";
import {Blog} from "./blog";
import "reflect-metadata"
export const AppDataSource = new DataSource({
    type: process.env.TYPEORM_CONFIG_type as any,
    host: process.env.TYPEORM_CONFIG_host as any,
    port: Number(process.env.TYPEORM_CONFIG_port),
    username: process.env.TYPEORM_CONFIG_username,
    password: process.env.TYPEORM_CONFIG_password,
    database: process.env.TYPEORM_CONFIG_database,
    synchronize: Boolean(process.env.TYPEORM_CONFIG_synchronize),
    logging: Boolean(process.env.TYPEORM_CONFIG_logging),
    logger: process.env.TYPEORM_CONFIG_logger as any,
    cache: process.env.TYPEORM_CONFIG_cache as any,
    entities: [Blog],
    migrations: [],
    subscribers: [],
});