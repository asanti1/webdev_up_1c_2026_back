import { User } from "../entity/user.entity";
import { NotFoundError } from "../errors/notFound.error";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
    constructor(private readonly userRepository: UserRepository = new UserRepository()) { }

    async getById(id: string): Promise<User> {
        const userFound = await this.userRepository.findById(id);
        if (!userFound) throw new NotFoundError(`User with id ${id} not found`);
        return userFound;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.update(id, updateUserDto);
        if (!user) throw new NotFoundError(`User with id ${id} not found`);
        return user;
    }

    async deleteById(id: string): Promise<void> {
        const deleted = await this.userRepository.deleteById(id);
        if (!deleted) throw new NotFoundError(`User with id ${id} not found`);

    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.createEntity(createUserDto);
        return await this.userRepository.save(user);
    }

}