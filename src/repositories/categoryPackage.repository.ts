import { Repository } from "typeorm";
import { AppDataSource } from "../database";
import { CategoryPackage } from "../entity/categoryPackage.entity";
import { BadRequestError } from "../errors/badRequest.error";

export class CategoryPackageRepository {
    constructor(private readonly categoryPackageDataSource: Repository<CategoryPackage> = AppDataSource.getRepository(CategoryPackage)) { }

    async find(take: number, skip: number): Promise<[CategoryPackage[], number]> {
        return this.categoryPackageDataSource.
            findAndCount({
                relations: {
                    packages: true,
                },
                take,
                skip,
                order: {
                    createdAt: "DESC"
                }
            })
    }

    async findById(id: string): Promise<CategoryPackage | null> {
        return await this.categoryPackageDataSource.findOne({
            where: { id },
            relations: {
                packages: true,
            },
        });
    }


    async update(id: string, partial: Partial<CategoryPackage>): Promise<CategoryPackage | null> {
        const entity = await this.categoryPackageDataSource.preload({ id, ...partial });
        if (!entity) return null;
        await this.categoryPackageDataSource.save(entity);
        return await this.findById(id);
    }

    async delete(id: string): Promise<boolean> {
        const savedCategoryPackageFound = await this.findById(id);

        if (!savedCategoryPackageFound) return false;
        if (savedCategoryPackageFound.packages?.length) throw new BadRequestError("Category package has associated packages");

        await this.categoryPackageDataSource.remove(savedCategoryPackageFound);
        return true;
    }


    createEntity(data: Partial<CategoryPackage>): CategoryPackage {
        return this.categoryPackageDataSource.create(data);
    }

    async save(categoryPackage: CategoryPackage): Promise<CategoryPackage> {
        return await this.categoryPackageDataSource.save(categoryPackage);
    }
}
