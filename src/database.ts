import { DataSource } from "typeorm";
import { env } from './config/env';
import { User } from "./entity/user.entity";
import { CategoryPackage } from "./entity/categoryPackage.entity";
import { Country } from "./entity/country.entity";
import { Destination } from "./entity/destination.entity";
import { Package } from "./entity/package.entity";
import { Reservation } from "./entity/reservation.entity";
import { Role } from "./entity/role.entity";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: env.POSTGRE_HOST,
    port: Number(env.POSTGRE_PORT),
    username: env.POSTGRE_USER,
    password: env.POSTGRE_PASSWORD,
    database: env.POSTGRE_DB,
    synchronize: true,
    logging: true,
    entities: [User, CategoryPackage, Country, Destination, Package, Reservation, Role],
    subscribers: [],
    migrations: [],
});

export const initDB = async () => {
    try {
        await AppDataSource.initialize();
    } catch (e) {
        console.error("Init DB err", e);
        throw e;
    }
}

