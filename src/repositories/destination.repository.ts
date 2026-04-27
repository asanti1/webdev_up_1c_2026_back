import { Repository } from "typeorm";
import { AppDataSource } from "../database";
import { Destination } from "../entity/destination.entity";
import { BadRequestError } from "../errors/badRequest.error";

export class DestinationRepository {
    constructor(private readonly destinationDataSource: Repository<Destination> = AppDataSource.getRepository(Destination)) { }

    async find(take: number, skip: number): Promise<[Destination[], number]> {
        return await this.destinationDataSource.
            findAndCount({
                relations: {
                    country: true,
                    packages: true,
                },
                take,
                skip,
                order: {
                    createdAt: "DESC"
                }
            })
    }

    async findById(id: string): Promise<Destination | null> {
        return await this.destinationDataSource.findOne({
            where: { id },
            relations: {
                country: true,
                packages: true,
            },
        });
    }


    async update(id: string, partial: Partial<Destination>): Promise<Destination | null> {
        const entity = await this.destinationDataSource.preload({ id, ...partial });
        if (!entity) return null;
        await this.destinationDataSource.save(entity);
        return await this.findById(id);
    }

    async delete(id: string): Promise<boolean> {
        const destinationFound = await this.findById(id);

        if (!destinationFound) return false;
        if (destinationFound.packages?.length) throw new BadRequestError("Destination has associated packages");

        await this.destinationDataSource.remove(destinationFound);
        return true;
    }


    createEntity(data: Partial<Destination>): Destination {
        return this.destinationDataSource.create(data);
    }

    async save(destination: Destination): Promise<Destination> {
        return await this.destinationDataSource.save(destination);
    }
}
