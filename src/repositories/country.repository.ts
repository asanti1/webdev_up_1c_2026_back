import { Repository } from "typeorm";
import { AppDataSource } from "../database";
import { Country } from "../entity/country.entity";

export class CountryRepository {
    constructor(private readonly countryDataSource: Repository<Country> = AppDataSource.getRepository(Country)) { }

    async find(take: number, skip: number): Promise<[Country[], number]> {
        return await this.countryDataSource.
            findAndCount({
                take,
                skip,
                order: {
                    createdAt: "DESC"
                }
            })
    }

    async findAll(): Promise<Country[]> {
        return await this.countryDataSource.find();
    }

    async findById(id: string): Promise<Country | null> {
        return await this.countryDataSource.findOne({
            where: { id },
            relations: {
                destinations: true,
            },
        });
    }


    createEntity(data: Partial<Country>): Country {
        return this.countryDataSource.create(data);
    }

    async save(country: Country): Promise<Country> {
        return await this.countryDataSource.save(country);
    }

}
