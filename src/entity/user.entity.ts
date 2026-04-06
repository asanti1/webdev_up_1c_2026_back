import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { Country } from "./country.entity";
import { Reservation } from "./reservation.entity";
import { Role } from "./role.entity";

@Entity()
export class User extends Base {
    @Column({ type: "varchar", length: 50 })
    firstName!: string;

    @Column({ type: "varchar", length: 50 })
    lastName!: string;

    @Column({ type: "int" })
    age!: number;

    @Column({ type: "varchar", length: 75, unique: true })
    email!: string;

    @Column({ type: "varchar", length: 100 })
    password!: string;

    @Column({ type: "boolean", default: true })
    isActive!: boolean;

    @Column({ type: "varchar", length: 50 })
    cellphoneNumber!: string;

    @ManyToOne(() => Role, (role) => role.users)
    role!: Role;

    @ManyToOne(() => Country, (country: Country) => country.users)
    country!: Country;

    @OneToMany(() => Reservation, (reservation: Reservation) => reservation.user)
    reservations!: Reservation[];
}
