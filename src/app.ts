import fastify, { FastifyInstance } from "fastify";
import { AppDataSource } from "./plugins/db.pluging";
import * as dotenv from "dotenv";
import { IncomingMessage, Server, ServerResponse } from "http";
import { TypeORMController } from "./services/pet/pet.service";
import path from "path";
import fs from "fs";
import axios from "axios";
import mime from "mime-types";

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
  let imagePosition: number = 0;
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

  if (data.images.length > 0) {
    const imageUrl = data.images[data.images.length - 1].url;

    try {
      // Descargar la imagen desde la URL
      const response = await axios({
        url: imageUrl,
        responseType: "arraybuffer",
      });

      // Verificar el tipo de imagen desde la respuesta
      const contentType = response.headers["content-type"];
      const ext = mime.extension(contentType);

      if (!["png", "jpeg", "jpg"].includes(ext)) {
        throw new Error(`Formato de imagen no soportado: ${contentType}`);
      }

      // Guardar la imagen temporalmente
      const imagePath = path.join(__dirname, `temp_image.${ext}`);
      fs.writeFileSync(imagePath, response.data);
      // Agregar la imagen al PDF

      doc.image(imagePath, {
        fit: [250, 300], // Ajustar tamaño
        align: "center", // Alineación horizontal
        valign: "center", // Alineación vertical
      });
      doc.y = imagePosition + 30;
      imagePosition = doc.y;
    } catch (error) {
      console.error("Error al descargar la imagen o generar el PDF:", error);
      // res.status(500).send("Error al generar el PDF");
    }
  }
  // Obtener la posición donde termina la imagen
  doc.moveDown(imagePosition);
  // Agregar un título o encabezado justo después de la imagen
  doc.text(`Listado de consultas`, {
    align: "left",
    continued: false, // Iniciar un nuevo bloque de texto
  });

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

  doc.text(`\nListado de medicamentos`);
  for (const reservacion of data.dataMedicamentos) {
    doc.text(`Nombre: ${reservacion.name}`);
    doc.text(`Descripcion: ${reservacion.description}`);
    doc.text(`Fecha: ${reservacion.dateCreated}`);
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
