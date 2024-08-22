import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "files",
})
export class Image {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("varchar", { name: "tag", length: 100 })
  tag: string;

  @Column("varchar", { name: "name", length: 200 })
  name: string;

  @Column("integer", { name: "status", default: 1 })
  status: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  datecreated: Date;

  @Column("integer", { name: "id_reg" })
  idReg: number;

  @Column("integer", { name: "user" })
  user: number;
}
