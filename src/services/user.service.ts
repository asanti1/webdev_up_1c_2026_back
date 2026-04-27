import bcrypt from "bcrypt";
import { CreateUserDto } from "../dtos/createUser.dto";
import { UpdateUserDto } from "../dtos/updateUser.dto";
import { Role } from "../entity/role.entity";
import { User } from "../entity/user.entity";
import { NotFoundError } from "../errors/notFound.error";
import { UserRepository } from "../repositories/user.repository";
import { AppDataSource } from "../database";

export class UserService {
    constructor(private readonly userRepository: UserRepository = new UserRepository()) { }

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

    async create(createUserDto: CreateUserDto & { role?: Role }): Promise<User> {
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

        const user = this.userRepository.createEntity({
            ...createUserDto,
            password: hashedPassword,
            role,
        });

        return await this.userRepository.save(user);
    }
}