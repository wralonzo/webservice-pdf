import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { entities } from "../typeorm/typeorm.entities";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: entities,
  synchronize: false,
});
