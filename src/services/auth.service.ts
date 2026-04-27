import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../database";
import { CreateUserDto } from "../dtos/createUser.dto";
import { Role } from "../entity/role.entity";
import { User } from "../entity/user.entity";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "./user.service";
import { LoginDto } from "../dtos/login.dto";
import { ConflictError } from "../errors/conflict.error";
import { UserResponseDto } from "../dtos/userResponse.dto";

export class AuthService {
    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly userRepository: UserRepository = new UserRepository()
    ) { }


    async login(loginCreds: LoginDto): Promise<string> {
        const user = await this.userRepository.findByEmail(loginCreds.email);
        if (!user) throw new UnauthorizedError("Invalid Credentials");

        const isValid = await bcrypt.compare(loginCreds.password, user.password);

        if (!isValid) throw new UnauthorizedError("Invalid Credentials");


        const accessToken = jwt.sign(
            { sub: user.id },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        return accessToken
    }

    async register(createUserDto: CreateUserDto): Promise<UserResponseDto> {
        const existingUser = await this.userRepository.findByEmail(createUserDto.email);

        if (existingUser) {
            throw new ConflictError(`Email ${createUserDto.email} has been taken`);
        }

        return await this.userService.create(createUserDto);
    }

}