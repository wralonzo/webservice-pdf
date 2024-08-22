import fastify, { FastifyInstance } from "fastify";
import { AppDataSource } from "./plugins/db.pluging";
import * as dotenv from "dotenv";
import { IncomingMessage, Server, ServerResponse } from "http";
import { TypeORMController } from "./services/pet/pet.service";

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify();
dotenv.config();

server.register((instance, opts, next) => {
  AppDataSource.initialize()
    .then(() => {
      instance.decorate("db", AppDataSource);
      next();
    })
    .catch((err) => next(err));
});

server.get("/pdf/:filename", async (req: any, reply) => {
  const PDFDocument = require("pdfkit");
  const doc = new PDFDocument();

  const data = await new TypeORMController().findData(+req.params.filename);

  reply.type("application/pdf");
  reply.header(
    "content-disposition",
    `attachment; filename="${req.params.filename}"`
  );

  doc.pipe(reply.raw);

  doc.text(`Reporte historico de la mascota`, { align: "center" });
  doc.text(`\n`);
  doc.text(`\n`);

  doc.text(`Listado de consultas`);
  for (const consulta of data.consultas) {
    doc.text(`Consulta: ${consulta.name}`);
    doc.text(`Descripcion: ${consulta.description}`);
    doc.text(`Fecha: ${consulta.dateCreated}`);
    doc.text(`\n`);
  }
  doc.text(`\n`);

  doc.text(`\nListado de servicios`);
  for (const servicio of data.servicios) {
    doc.text(`Nombre: ${servicio.name}`);
    doc.text(`Servicio: ${servicio.servicio}`);
    doc.text(`Fecha: ${servicio.dateCreated}`);
    doc.text(`\n`);
  }
  doc.text(`\n`);

  doc.text(`\nListado de examenes`);
  for (const examen of data.examenes) {
    doc.text(`Diagnostico: ${examen.diagnostico}`);
    doc.text(`Motivo: ${examen.motivo}`);
    doc.text(`Fecha: ${examen.createdAt}`);
    doc.text(`\n`);
  }
  doc.text(`\n`);

  doc.text(`\nListado de constancias`);
  for (const constancia of data.constancias) {
    doc.text(`Comentario: ${constancia.comentario}`);
    doc.text(`Fecha: ${constancia.createdAt}`);
    doc.text(`\n`);
  }
  doc.text(`\n`);

  doc.text(`\nListado de examenes`);
  for (const reservacion of data.reservaciones) {
    doc.text(`Diagnostico: ${reservacion.comentario}`);
    doc.text(`Motivo: ${reservacion.estado}`);
    doc.text(`Fecha: ${reservacion.createdAt}`);
    doc.text(`Hora inicio: ${reservacion.horaFin}`);
    doc.text(`Hora fin: ${reservacion.horaFin}`);
    doc.text(`\n`);
  }

  doc.text("");
  doc.text("");

  doc.end();
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
