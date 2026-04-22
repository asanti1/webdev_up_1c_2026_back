import { Country } from "../entity/country.entity";

export type UserResponseDto = {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    cellphoneNumber: string;
    country: Country
};

