import { CountryResponseDto } from "../dtos/countryResponse.dto";
import { CreateCountryDto } from "../dtos/createCountry.dto";
import { PaginatedCountryResponseDto } from "../dtos/paginatedCountryResponse.dto";
import { Country } from "../entity/country.entity";
import { NotFoundError } from "../errors/notFound.error";
import { CountryRepository } from "../repositories/country.repository";



export class CountryService {
    constructor(
        private readonly countryRepository: CountryRepository = new CountryRepository()) { }


    async get(limit: number, page: number): Promise<PaginatedCountryResponseDto> {
        const limitSafe = Math.min(limit, 50);
        const skip = (page - 1) * limitSafe;

        const [countries, total] = await this.countryRepository.find(limitSafe, skip);

        return {
            data: countries.map((country) => this.toCountryResponseDto(country)),
            total,
            page,
            limit: limitSafe,
            totalPages: Math.ceil(total / limitSafe)
        }

    }

    async getById(id: string): Promise<CountryResponseDto> {
        const countryFound = await this.countryRepository.findById(id);
        if (!countryFound) throw new NotFoundError(`Country with id: ${id} not found`);
        return this.toCountryResponseDto(countryFound);
    }

    async create(createCountryDto: CreateCountryDto): Promise<CountryResponseDto> {
        const country = this.countryRepository.createEntity({
            name: createCountryDto.name,
            isoCode: createCountryDto.isoCode
        });
        const savedCountry = await this.countryRepository.save(country);

        return this.toCountryResponseDto(savedCountry);
    }

    private toCountryResponseDto(country: Country): CountryResponseDto {
        return {
            id: country.id,
            name: country.name,
            isoCode: country.isoCode,
        };
    }
}