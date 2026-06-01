import { Repository } from "typeorm";
import { AppDataSource } from "../database";
import { Reservation, ReservationStatusEnum } from "../entity/reservation.entity";

export class ReservationRepository {
    constructor(private readonly reservationDataSource: Repository<Reservation> = AppDataSource.getRepository(Reservation)) { }

    async find(take: number, skip: number, status?: ReservationStatusEnum): Promise<[Reservation[], number]> {
        return await this.reservationDataSource.
            findAndCount({
                where: status ? { status } : {},
                relations: {
                    user: true,
                    package: {
                        destination: true,
                        categoryPackage: true,
                    }
                },
                take,
                skip,
                order: {
                    createdAt: "DESC"
                }
            })
    }
    async findAllByUserId(take: number, skip: number, id: string): Promise<[Reservation[], number]> {
        return await this.reservationDataSource.
            findAndCount({
                where: { user: { id } },    
                relations: {
                    user: true,
                    package: {
                        destination: true,
                        categoryPackage: true,
                    }
                },
                take,
                skip,
                order: {
                    createdAt: "DESC"
                }
            })
    }

    async findById(id: string): Promise<Reservation | null> {
        return await this.reservationDataSource.
            findOne({
                where: { id },

                relations: {
                    user: true,
                    package: {
                        destination: true,
                        categoryPackage: true,
                    }
                },
            })
    }

    async changeStatusById(id: string, status: ReservationStatusEnum): Promise<Reservation | null> {
        const entity = await this.reservationDataSource.preload({ id, status });

        if (!entity) return null;

        await this.reservationDataSource.save(entity);

        return this.findById(id);
    }

    async delete(id: string): Promise<Reservation | null> {
        const reservationFound = await this.findById(id);
        if (!reservationFound) return null;

        reservationFound.status = ReservationStatusEnum.CANCELLED;

        return await this.reservationDataSource.save(reservationFound)
    }

    createEntity(data: Partial<Reservation>): Reservation {
        return this.reservationDataSource.create(data);
    }

    async save(reservation: Reservation): Promise<Reservation> {
        return await this.reservationDataSource.save(reservation);
    }


}