import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { Country } from "./country.entity";
import { Reservation } from "./reservation.entity";
import { Role } from "./role.entity";

@Entity()
export class User extends Base{
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    isActive: boolean;

    @Column()
    cellphoneNumber: string;

    @ManyToOne(() => Role, (role) => role.users)
    role: Role;

    @ManyToOne(() => Country, (country) => country.users)
    country: Country;

    @OneToMany(() => Reservation, (reservation) => reservation.user)
    reservations: Reservation[];
}
