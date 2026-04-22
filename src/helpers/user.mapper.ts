import { User } from "../entity/user.entity";
import { UserResponseDto } from "../dtos/userResponse.dto"; 

export function toUserResponseDto(user: User): UserResponseDto {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        email: user.email,
        cellphoneNumber: user.cellphoneNumber,
        country: user.country
    };
}