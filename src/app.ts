import fastify, { FastifyInstance, FastifyReply } from "fastify";
import { AppDataSource } from "./plugins/db.pluging";
import * as dotenv from "dotenv";
import { IncomingMessage, Server, ServerResponse } from "http";
import formbody from "@fastify/formbody";
import multer from "fastify-multer";
import path from "path";
import { TypeORMImageController } from "./services/pet/image.service";

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify({ logger: true });
dotenv.config();

server.register((instance, opts, next) => {
  AppDataSource.initialize()
    .then(() => {
      instance.decorate("db", AppDataSource);
      next();
    })
    .catch((err) => next(err));
});
server.register(formbody);
server.addContentTypeParser(
  "multipart/form-data",
  {
    bodyLimit: 1048576,
  },
  (req, payload, done) => {
    const formData = new FormData();
    done(null, formData);
  }
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fullPath = path.resolve(process.cwd());
    cb(null, `${fullPath}/src/uploads`);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    );
  },
});

const upload = multer({ storage: storage });

server.post(
  "/upload",
  { preHandler: upload.single("file") },
  async (request: any, reply: FastifyReply) => {
    const payload = {
      tag: request.body.tag,
      name: request.file.filename,
      idReg: +request.body.idReg,
      user: +request.body.user,
    };
    
    const data = new TypeORMImageController().create(payload);
    reply.send({
      file: request.file,
      status: 200,
    });
  }
);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
