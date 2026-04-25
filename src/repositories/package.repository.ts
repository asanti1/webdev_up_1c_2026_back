import { Repository } from "typeorm";
import { AppDataSource } from "../database";
import { Package } from "../entity/package.entity";

export class PackageRepository {
    constructor(private readonly packageDataSource: Repository<Package> = AppDataSource.getRepository(Package)) { }

    async find(take: number, skip: number): Promise<[Package[], number]> {
        return await this.packageDataSource.
            findAndCount({
                where: {
                    isActive: true
                },
                relations: {
                    destination: true,
                    categoryPackage: true,
                },
                take,
                skip,
                order: {
                    createdAt: "DESC"
                }
            })
    }

    async findById(id: string): Promise<Package | null> {
        return await this.packageDataSource.findOne({
            where: { id },
            relations: {
                destination: true,
                categoryPackage: true,
            },
        });
    }


    async update(id: string, partial: Partial<Package>): Promise<Package | null> {
        const entity = await this.packageDataSource.preload({ id, ...partial });
        if (!entity) return null;
        await this.packageDataSource.save(entity);
        return await this.findById(id);
    }

    async delete(id: string): Promise<boolean> {
        const packageFound = await this.findById(id);
        if (!packageFound) return false;
        packageFound.isActive = false;
        await this.packageDataSource.save(packageFound)
        return true;
    }


    createEntity(data: Partial<Package>): Package {
        return this.packageDataSource.create(data);
    }

    async save(pkg: Package): Promise<Package> {
        return await this.packageDataSource.save(pkg);
    }

}
