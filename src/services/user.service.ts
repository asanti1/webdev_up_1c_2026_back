import bcrypt from "bcrypt";
import { AppDataSource } from "../database";
import { CreateUserDto } from "../dtos/createUser.dto";
import { UpdateUserDto } from "../dtos/updateUser.dto";
import { UserResponseDto } from "../dtos/userResponse.dto";
import { Role } from "../entity/role.entity";
import { User } from "../entity/user.entity";
import { NotFoundError } from "../errors/notFound.error";
import { CountryRepository } from "../repositories/country.repository";
import { UserRepository } from "../repositories/user.repository";
import { PaginatedUserResponseDto } from "../dtos/paginatedUserResponse.dto";

export class UserService {
    constructor(
        private readonly userRepository: UserRepository = new UserRepository(),
        private readonly countryRepository: CountryRepository = new CountryRepository()) { }

    async get(limit: number, page: number): Promise<PaginatedUserResponseDto> {
        const limitSafe = Math.min(limit, 50);
        const skip = (page - 1) * limitSafe;

        const [users, total] = await this.userRepository.find(limitSafe, skip);

        return {
            data: users.map((u) => this.toUserResponseDto(u)),
            total,
            page,
            limit: limitSafe,
            totalPages: Math.ceil(total / limitSafe)
        }
    }

    async getById(id: string): Promise<User> {
        const userFound = await this.userRepository.findById(id);
        if (!userFound) throw new NotFoundError(`User with id: ${id} not found`);
        return userFound;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        if (updateUserDto.password) updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        const user = await this.userRepository.update(id, updateUserDto);
        if (!user) throw new NotFoundError(`User with id: ${id} not found`);
        return user;
    }

    async deleteById(id: string): Promise<void> {
        const deleted = await this.userRepository.deleteById(id);
        if (!deleted) throw new NotFoundError(`User with id: ${id} not found`);
    }
    async create(createUserDto: CreateUserDto & { role?: Role }): Promise<UserResponseDto> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        const roleRepo = AppDataSource.getRepository(Role);

        let role = createUserDto.role;

        if (!role) {
            const foundRole = await roleRepo.findOneBy({ name: "USER" });

            if (!foundRole) {
                throw new Error("Default role not configured");
            }
            role = foundRole;
        }

        const country = await this.countryRepository.findById(createUserDto.countryId);

        if (!country) {
            throw new NotFoundError(`Country with id: ${createUserDto.countryId} not found`);
        }

        const user = this.userRepository.createEntity({
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            age: createUserDto.age,
            email: createUserDto.email,
            password: hashedPassword,
            cellphoneNumber: createUserDto.cellphoneNumber,
            role,
            country,
        });

        const savedUser = await this.userRepository.save(user);

        return this.toUserResponseDto(savedUser);
    }

    private toUserResponseDto(user: User): UserResponseDto {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            email: user.email,
            cellphoneNumber: user.cellphoneNumber,
            role: {
                id: user.role.id,
                name: user.role.name,
            },
            country: {
                id: user.country.id,
                name: user.country.name,
                isoCode: user.country.isoCode,
            },
        };
    }
}