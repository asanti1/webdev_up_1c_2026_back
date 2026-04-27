import { CategoryPackageResponseDto } from "../dtos/categoryPackageResponse.dto";
import { CreateCategoryPackageDto } from "../dtos/createCategoryPackage.dto";
import { PaginatedCategoryPackageResponseDto } from "../dtos/paginatedCategoryPackageResponse.dto";
import { UpdateCategoryPackageDto } from "../dtos/updateCategoryPackage.dto";
import { CategoryPackage } from "../entity/categoryPackage.entity";
import { NotFoundError } from "../errors/notFound.error";
import { CategoryPackageRepository } from "../repositories/categoryPackage.repository";



export class CategoryPackageService {
    constructor(
        private readonly categoryPackageRepository: CategoryPackageRepository = new CategoryPackageRepository()) { }


    async get(limit: number, page: number): Promise<PaginatedCategoryPackageResponseDto> {
        const limitSafe = Math.min(limit, 50);
        const skip = (page - 1) * limitSafe;

        const [categoryPackages, total] = await this.categoryPackageRepository.find(limitSafe, skip);

        return {
            data: categoryPackages.map((categoryPackage) => this.toCategoryPackageResponseDto(categoryPackage)),
            total,
            page,
            limit: limitSafe,
            totalPages: Math.ceil(total / limitSafe)
        }

    }

    async getById(id: string): Promise<CategoryPackageResponseDto> {
        const categoryPackageFound = await this.categoryPackageRepository.findById(id);
        if (!categoryPackageFound) throw new NotFoundError(`Category Package with id: ${id} not found`);
        return this.toCategoryPackageResponseDto(categoryPackageFound);
    }

    async update(id: string, updateCategoryPackageDto: UpdateCategoryPackageDto): Promise<CategoryPackageResponseDto> {
        const categoryPackageFound = await this.categoryPackageRepository.update(id, updateCategoryPackageDto);
        if (!categoryPackageFound) throw new NotFoundError(`Category Package with id: ${id} not found`);

        return this.toCategoryPackageResponseDto(categoryPackageFound);
    }

    async deleteById(id: string): Promise<void> {
        const deleted = await this.categoryPackageRepository.delete(id);
        if (!deleted) throw new NotFoundError(`Category Package with id: ${id} not found`);
    }


    async create(createCategoryPackageDto: CreateCategoryPackageDto): Promise<CategoryPackageResponseDto> {
        const categoryPackage = this.categoryPackageRepository.createEntity({
            name: createCategoryPackageDto.name,
            description: createCategoryPackageDto.description,
        });
        const savedCategoryPackage = await this.categoryPackageRepository.save(categoryPackage);

        return this.toCategoryPackageResponseDto(savedCategoryPackage);
    }

    private toCategoryPackageResponseDto(categoryPackage: CategoryPackage): CategoryPackageResponseDto {
        return {
            id: categoryPackage.id,
            name: categoryPackage.name,
            description: categoryPackage.description,
            packages: categoryPackage.packages?.map(pkg => ({
                id: pkg.id,
                title: pkg.title,
                price: pkg.price
            })) ?? []
        };
    }
}