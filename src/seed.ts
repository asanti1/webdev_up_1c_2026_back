import bcrypt from "bcrypt";
import "reflect-metadata";
import { env } from "./config/env";
import { AppDataSource, initDB } from "./database";
import { CategoryPackage } from "./entity/categoryPackage.entity";
import { Country } from "./entity/country.entity";
import { Destination } from "./entity/destination.entity";
import { Package } from "./entity/package.entity";
import { Reservation, ReservationStatusEnum } from "./entity/reservation.entity";
import { Role } from "./entity/role.entity";
import { User } from "./entity/user.entity";

console.log({
  host: env.POSTGRE_HOST,
  port: env.POSTGRE_PORT,
  user: env.POSTGRE_USER,
  db: env.POSTGRE_DB,
});
async function seed() {
  await initDB();

  const roleRepo = AppDataSource.getRepository(Role);
  const countryRepo = AppDataSource.getRepository(Country);
  const categoryRepo = AppDataSource.getRepository(CategoryPackage);
  const destinationRepo = AppDataSource.getRepository(Destination);
  const userRepo = AppDataSource.getRepository(User);
  const packageRepo = AppDataSource.getRepository(Package);
  const reservationRepo = AppDataSource.getRepository(Reservation);

  console.log("🌱 Iniciando seed...");

  // Limpieza en orden inverso a las relaciones
  await AppDataSource.query(`TRUNCATE TABLE reservation CASCADE`);
  await AppDataSource.query(`TRUNCATE TABLE package CASCADE`);
  await AppDataSource.query(`TRUNCATE TABLE "user" CASCADE`);
  await AppDataSource.query(`TRUNCATE TABLE destination CASCADE`);
  await AppDataSource.query(`TRUNCATE TABLE category_package CASCADE`);
  await AppDataSource.query(`TRUNCATE TABLE country CASCADE`);
  await AppDataSource.query(`TRUNCATE TABLE role CASCADE`);
  // ROLES
  const adminRole = roleRepo.create({
    name: "ADMIN",
    description: "Administrador del sistema",
  });

  const userRole = roleRepo.create({
    name: "USER",
    description: "Usuario estándar del sistema",
  });

  await roleRepo.save([adminRole, userRole]);

  // COUNTRIES
  const argentina = countryRepo.create({
    name: "Argentina",
    isoCode: "ARG",
  });

  const brazil = countryRepo.create({
    name: "Brasil",
    isoCode: "BRA",
  });

  const chile = countryRepo.create({
    name: "Chile",
    isoCode: "CHL",
  });

  const uruguay = countryRepo.create({
    name: "Uruguay",
    isoCode: "URY",
  });

  await countryRepo.save([argentina, brazil, chile, uruguay]);

  // CATEGORY PACKAGE
  const aventura = categoryRepo.create({
    name: "Aventura",
    description: "Paquetes orientados a experiencias de aventura y naturaleza",
  });

  const relax = categoryRepo.create({
    name: "Relax",
    description: "Paquetes para descanso, playa y desconexión",
  });

  const ciudad = categoryRepo.create({
    name: "Ciudad",
    description: "Paquetes para turismo urbano y recorridos culturales",
  });

  await categoryRepo.save([aventura, relax, ciudad]);

  // DESTINATIONS
  const bariloche = destinationRepo.create({
    name: "Bariloche",
    description: "Destino de montaña con lagos, nieve y excursiones",
    country: argentina,
  });

  const rio = destinationRepo.create({
    name: "Rio de Janeiro",
    description: "Playas, vida urbana y turismo clásico en Brasil",
    country: brazil,
  });

  const santiago = destinationRepo.create({
    name: "Santiago de Chile",
    description: "Capital chilena con oferta urbana y cercanía a la cordillera",
    country: chile,
  });

  const punta = destinationRepo.create({
    name: "Punta del Este",
    description: "Destino costero premium para relax y verano",
    country: uruguay,
  });

  await destinationRepo.save([bariloche, rio, santiago, punta]);

  // USERS
  const hashedPassword = await bcrypt.hash("123456", 10);

  const admin = userRepo.create({
    firstName: "Admin",
    lastName: "Sistema",
    age: 30,
    email: "admin@test.com",
    password: hashedPassword,
    cellphoneNumber: "2216000001",
    role: adminRole,
    country: argentina,
  });

  const user1 = userRepo.create({
    firstName: "Agustin",
    lastName: "Perez",
    age: 27,
    email: "user1@test.com",
    password: hashedPassword,
    cellphoneNumber: "2216000002",
    role: userRole,
    country: argentina,
  });

  const user2 = userRepo.create({
    firstName: "Lucia",
    lastName: "Gomez",
    age: 25,
    email: "user2@test.com",
    password: hashedPassword,
    cellphoneNumber: "2216000003",
    role: userRole,
    country: brazil,
  });

  const user3 = userRepo.create({
    firstName: "Martin",
    lastName: "Lopez",
    age: 34,
    email: "user3@test.com",
    password: hashedPassword,
    cellphoneNumber: "2216000004",
    role: userRole,
    country: uruguay,
  });

  await userRepo.save([admin, user1, user2, user3]);

  // PACKAGES
  const package1 = packageRepo.create({
    title: "Bariloche Aventura 7 Noches",
    description: "Incluye alojamiento, desayuno y excursiones de montaña",
    price: 850000,
    startDate: new Date("2026-07-10"),
    endDate: new Date("2026-07-17"),
    availableSlots: 18,
    maxSlots: 20,
    isActive: true,
    imageUrl: "https://example.com/bariloche.jpg",
    categoryPackage: aventura,
    destination: bariloche,
  });

  const package2 = packageRepo.create({
    title: "Rio Relax 5 Noches",
    description: "Paquete con hotel frente al mar y traslado incluido",
    price: 990000,
    startDate: new Date("2026-09-05"),
    endDate: new Date("2026-09-10"),
    availableSlots: 12,
    maxSlots: 15,
    isActive: true,
    imageUrl: "https://example.com/rio.jpg",
    categoryPackage: relax,
    destination: rio,
  });

  const package3 = packageRepo.create({
    title: "Santiago Urbano 4 Noches",
    description: "Escapada urbana con city tour y visitas culturales",
    price: 720000,
    startDate: new Date("2026-08-14"),
    endDate: new Date("2026-08-18"),
    availableSlots: 10,
    maxSlots: 10,
    isActive: true,
    imageUrl: "https://example.com/santiago.jpg",
    categoryPackage: ciudad,
    destination: santiago,
  });

  await packageRepo.save([package1, package2, package3]);

  // RESERVATIONS
  const reservation1 = reservationRepo.create({
    reservationDate: new Date("2026-04-22"),
    totalPassengers: 2,
    finalPrice: 1700000.0,
    notes: "Prefiere habitación con vista al lago",
    status: ReservationStatusEnum.PENDING,
    user: user1,
    package: package1,
  });

  const reservation2 = reservationRepo.create({
    reservationDate: new Date("2026-04-22"),
    totalPassengers: 1,
    finalPrice: 990000.0,
    notes: "Viaja solo, sin equipaje extra",
    status: ReservationStatusEnum.PENDING,
    user: user2,
    package: package2,
  });

  await reservationRepo.save([reservation1, reservation2]);

  console.log("✅ Seed ejecutada correctamente");
  console.log("Usuarios de prueba:");
  console.log("admin@test.com / 123456");
  console.log("user1@test.com / 123456");
  console.log("user2@test.com / 123456");
  console.log("user3@test.com / 123456");

  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Error ejecutando seed:", error);
  process.exit(1);
});