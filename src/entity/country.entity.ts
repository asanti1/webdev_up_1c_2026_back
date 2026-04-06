import { Column, Entity, OneToMany } from "typeorm";

import { Base } from "./base.entity";
import { Destination } from "./destination.entity";
import { User } from "./user.entity";

@Entity()
export class Country extends Base {

    @Column({ type: "varchar", length: 50 })
    name!: string;

    @Column({ type: "varchar", length: 3, unique: true })
    isoCode!: string;

    @OneToMany(() => User, (user: User) => user.country)
    users!: User[];

    @OneToMany(() => Destination, (destination: Destination) => destination.country)
    destinations!: Destination[];
}