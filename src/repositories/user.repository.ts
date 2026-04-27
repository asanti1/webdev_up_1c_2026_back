import { Repository } from "typeorm";
import { AppDataSource } from "../database";
import { User } from "../entity/user.entity";

export class UserRepository {
    constructor(private readonly userDataSource: Repository<User> = AppDataSource.getRepository(User)) { }


    async findById(id: string): Promise<User | null> {
        return await this.userDataSource.findOneBy({ id })
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.userDataSource.findOne({
            where: { email },
            select: {
                id: true,
                email: true,
                password: true,
                role: true,
            },
            relations: {
                role: true,
            },
        });
    }

    async update(id: string, partial: Partial<User>): Promise<User | null> {
        const entity = await this.userDataSource.preload({ id, ...partial });
        if (!entity) return null;
        return await this.save(entity)
    }
    createEntity(data: Partial<User>): User {
        return this.userDataSource.create(data);
    }

    async save(user: User): Promise<User> {
        return await this.userDataSource.save(user);
    }

    async deleteById(id: string): Promise<boolean> {
        const result = await this.userDataSource.softDelete({ id });
        return result.affected ? true : false;
    }

}