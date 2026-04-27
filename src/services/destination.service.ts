import { CreateDestinationDto } from "../dtos/createDestination.dto";
import { DestinationResponseDto } from "../dtos/destinationResponse.dto";
import { PaginatedDestinationResponseDto } from "../dtos/paginatedDestinationResponse.dto";
import { UpdateDestinationDto } from "../dtos/updateDestination.dto";
import { Destination } from "../entity/destination.entity";
import { NotFoundError } from "../errors/notFound.error";
import { CountryRepository } from "../repositories/country.repository";
import { DestinationRepository } from "../repositories/destination.repository";



export class DestinationService {
    constructor(
        private readonly destinationRepository: DestinationRepository = new DestinationRepository(),
        private readonly countryRepository: CountryRepository = new CountryRepository()) { }


    async get(limit: number, page: number): Promise<PaginatedDestinationResponseDto> {
        const limitSafe = Math.min(limit, 50);
        const skip = (page - 1) * limitSafe;

        const [destinations, total] = await this.destinationRepository.find(limitSafe, skip);

        return {
            data: destinations.map((dest) => this.toDestinationResponseDto(dest)),
            total,
            page,
            limit: limitSafe,
            totalPages: Math.ceil(total / limitSafe)
        }

    }

    async getById(id: string): Promise<DestinationResponseDto> {
        const destinationFound = await this.destinationRepository.findById(id);
        if (!destinationFound) throw new NotFoundError(`Destination with id: ${id} not found`);
        return this.toDestinationResponseDto(destinationFound);
    }


    async update(id: string, updateDestinationDto: UpdateDestinationDto): Promise<DestinationResponseDto> {
        const destinationFound = await this.destinationRepository.update(id, updateDestinationDto);
        if (!destinationFound) throw new NotFoundError(`Destination with id: ${id} not found`);

        return this.toDestinationResponseDto(destinationFound);
    }

    async deleteById(id: string): Promise<void> {
        const deleted = await this.destinationRepository.delete(id);
        if (!deleted) throw new NotFoundError(`Destination with id: ${id} not found`);
    }


    async create(createDestinationDto: CreateDestinationDto): Promise<DestinationResponseDto> {
        const country = await this.countryRepository.findById(createDestinationDto.countryId);

        if (!country) throw new NotFoundError(`Country with id: ${createDestinationDto.countryId} not found`);

        const dest = this.destinationRepository.createEntity({
            name: createDestinationDto.name,
            description: createDestinationDto.description,
            country
        });

        const createdDestination = await this.destinationRepository.save(dest)

        const destinationWithRelations = await this.destinationRepository.findById(createdDestination.id);

        if (!destinationWithRelations) throw new NotFoundError(`Destination with id: ${createdDestination.id} not found`);

        return this.toDestinationResponseDto(destinationWithRelations);
    }

    private toDestinationResponseDto(destination: Destination): DestinationResponseDto {
        return {
            id: destination.id,
            name: destination.name,
            description: destination.description,
            country: {
                id: destination.country.id,
                name: destination.country.name
            },
            packages: destination.packages?.map(pkg => ({
                id: pkg.id,
                title: pkg.title,
                price: pkg.price
            })) ?? []
        };
    }
}