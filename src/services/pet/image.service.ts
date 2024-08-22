import { DataSource } from "typeorm";
import { Image } from "../../typeorm/entities/image-entity";
import { entities } from "../../typeorm/typeorm.entities";

export class TypeORMImageController {
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

  async create(payload: any) {
    try {
      await this.dataSource.initialize();
      const data = await this.dataSource.getRepository(Image).save(payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
