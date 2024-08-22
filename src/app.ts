import fastify from "fastify";
import { AppDataSource } from "./plugins/db.pluging";
import * as dotenv from "dotenv";

const server = fastify();
dotenv.config();

server.register((instance, opts, next) => {
  AppDataSource.initialize()
    .then(() => {
      instance.decorate("db", AppDataSource);
      next();
    })
    .catch((err) => next(err));
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
