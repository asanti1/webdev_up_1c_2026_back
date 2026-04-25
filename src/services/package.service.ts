import z from "zod";
import { AppDataSource } from "../database";
import { CreatePackageDto } from "../dtos/createPackage.dto";
import { PaginatedPackagesResponseDto } from "../dtos/findPackagesResponse.dto";
import { packageResponseSchema } from "../dtos/packageResponseSchema.dto";
import { UpdatePackageDto } from "../dtos/updatePackage.dto";
import { CategoryPackage } from "../entity/categoryPackage.entity";
import { Destination } from "../entity/destination.entity";
import { Package } from "../entity/package.entity";
import { NotFoundError } from "../errors/notFound.error";
import { PackageRepository } from "../repositories/package.repository";

export type PackageResponseDto = z.infer<typeof packageResponseSchema>;


export class PackageService {
    constructor(private readonly packageRepository: PackageRepository = new PackageRepository()) { }


    async get(limit: number, page: number): Promise<PaginatedPackagesResponseDto> {
        const limitSafe = Math.min(limit, 50);
        const skip = (page - 1) * limitSafe;

        const [packages, total] = await this.packageRepository.find(limitSafe, skip);

        return {
            data: packages.map((pkg) => this.toPackageResponseDto(pkg)),
            total,
            page,
            limit: limitSafe,
            totalPages: Math.ceil(total / limitSafe)
        }

    }

    async getById(id: string): Promise<PackageResponseDto> {
        const packageFound = await this.packageRepository.findById(id);
        if (!packageFound) throw new NotFoundError(`Package with id ${id} not found`);
        return this.toPackageResponseDto(packageFound);
    }


    async update(id: string, updatePackageDto: UpdatePackageDto): Promise<PackageResponseDto> {
        const packageFound = await this.packageRepository.update(id, updatePackageDto);
        if (!packageFound) throw new NotFoundError(`Package with id ${id} not found`);

        return this.toPackageResponseDto(packageFound);
    }

    async deleteById(id: string): Promise<void> {
        const deleted = await this.packageRepository.delete(id);
        if (!deleted) throw new NotFoundError(`Package with id ${id} not found`);
    }

    async create(createPackageDto: CreatePackageDto): Promise<PackageResponseDto> {
        const destinationRepo = AppDataSource.getRepository(Destination);
        const categoryPackageRepo = AppDataSource.getRepository(CategoryPackage);

        const destination = await destinationRepo.findOneBy({ id: createPackageDto.destinationId });
        if (!destination) {
            throw new NotFoundError("Destination not found");
        }

        const categoryPackage = await categoryPackageRepo.findOneBy({ id: createPackageDto.categoryPackageId });
        if (!categoryPackage) {
            throw new NotFoundError("Category package not found");
        }

        const pkg = this.packageRepository.createEntity({
            title: createPackageDto.title,
            description: createPackageDto.description,
            price: createPackageDto.price,
            startDate: createPackageDto.startDate,
            endDate: createPackageDto.endDate,
            maxSlots: createPackageDto.maxSlots,
            availableSlots: createPackageDto.maxSlots,
            imageUrl: createPackageDto.imageUrl,
            isActive: true,
            destination,
            categoryPackage,
        });

        const createdPkg = await this.packageRepository.save(pkg)

        return this.toPackageResponseDto(createdPkg) ;
    }

    private toPackageResponseDto(pkg: Package): PackageResponseDto {
        return {
            id: pkg.id,
            title: pkg.title,
            description: pkg.description,
            price: pkg.price,
            startDate: pkg.startDate,
            endDate: pkg.endDate,
            maxSlots: pkg.maxSlots,
            imageUrl: pkg.imageUrl,
            isActive: pkg.isActive,
            availableSlots: pkg.availableSlots,
            destination: {
                id: pkg.destination.id,
                name: pkg.destination.name,
            },
            categoryPackage: {
                id: pkg.categoryPackage.id,
                name: pkg.categoryPackage.name,
            }
        };
    }
}