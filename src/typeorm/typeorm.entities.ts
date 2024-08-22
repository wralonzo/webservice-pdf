import { AppUser } from "./entities/app-user-entity";
import { App } from "./entities/app.entity";
import { Client } from "./entities/client.entity";
import { Consult } from "./entities/consult.entity";
import { Constancy } from "./entities/contancy.entity";
import { Examen } from "./entities/examen.entity";
import { Pet } from "./entities/pet.entity";
import { Product } from "./entities/product.entity";
import { Reservation } from "./entities/reservation.entity";
import { RoleUser } from "./entities/role-user-entity";
import { Role } from "./entities/role.entity";
import { ServiceCatalog } from "./entities/service-catalog.entity";
import { ServicePet } from "./entities/service-pet";
import { User } from "./entities/user.entity";
import { VaccinePet } from "./entities/vaccine-pet";
import { Vaccine } from "./entities/vaccine.entity";
import { Image } from "./entities/image-entity";

export const entities = [
  Pet,
  App,
  AppUser,
  Client,
  Consult,
  Constancy,
  Examen,
  Product,
  Reservation,
  RoleUser,
  Role,
  ServiceCatalog,
  ServicePet,
  User,
  Vaccine,
  VaccinePet,
  Image,
];
