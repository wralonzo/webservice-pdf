import { DataSource } from "typeorm";
import { Pet } from "../../typeorm/entities/pet.entity";
import { entities } from "../../typeorm/typeorm.entities";
import { Medicamento } from "../../typeorm/entities/medicamentos.entity";
import { Image } from "../../typeorm/entities/image-entity";

export class TypeORMController {
  private dataSource: DataSource;
  constructor() {
    this.dataSource = new DataSource({
      type: "mysql",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: entities,
      synchronize: false,
    });
  }

  async findData(id: number) {
    await this.dataSource.initialize();
    const data = await this.dataSource.getRepository(Pet).findOne({
      relations: {
        consultsFk: true,
        serivicePetFk: {
          serviceFK: true,
        },
        examenFk: true,
        reservacionFk: true,
        constancyFk: true,
      },
      where: {
        id: id,
      },
    });

    const dataMedicamentos = await this.dataSource
      .getRepository(Medicamento)
      .find({
        where: {
          id: id,
        },
      });

    const consultas = data.consultsFk.map((itemc) => {
      return {
        id: itemc.id,
        name: itemc.name,
        description: itemc.description,
        dateCreated: itemc.dateCreated,
      };
    });

    const servicios = data.serivicePetFk.map((itemc) => {
      return {
        id: itemc.id,
        name: itemc.name,
        time: itemc.time,
        servicio: itemc.serviceFK.name,
        dateCreated: itemc.dateCreated,
      };
    });

    const examenes = data.examenFk.map((itemc) => {
      return {
        id: itemc.id,
        diagnostico: itemc.diagnostico,
        motivo: itemc.motivo,
        createdAt: itemc.createdAt,
      };
    });
    const constancias = data.constancyFk.map((itemc) => {
      return {
        id: itemc.id,
        comentario: itemc.comentario,
        createdAt: itemc.createdAt,
      };
    });
    const reservaciones = data.reservacionFk.map((itemc) => {
      return {
        id: itemc.id,
        horaInicio: itemc.horaInicio,
        horaFin: itemc.horaFin,
        fecha: itemc.fecha,
        comentario: itemc.comentario,
        estado: itemc.estado,
        createdAt: itemc.createdAt,
      };
    });
    const images = await this.findImages("pet", id);
    return {
      id: data.id,
      name: data.name,
      age: data.age,
      gender: data.gender,
      race: data.race,
      consultas,
      examenes,
      reservaciones,
      constancias,
      servicios,
      dataMedicamentos,
      images,
    };
  }

  async findImages(tag: string, idReg: number) {
    try {
      const data = await this.dataSource.getRepository(Image).find({
        where: {
          tag: tag,
          idReg: idReg,
        },
      });
      const response = data.map((item) => {
        return {
          id: item.id,
          url: `${process.env.HOST_ASSETS}${item.name}`,
        };
      });
      return response;
    } catch (error) {
      return [];
    }
  }
}
