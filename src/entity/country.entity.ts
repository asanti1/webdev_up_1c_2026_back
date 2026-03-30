import { Column, Entity, OneToMany } from "typeorm";

import { Base } from "./base.entity";
import { Destination } from "./destination.entity";
import { User } from "./user.entity";

@Entity()
export class Country extends Base {

    @Column()
    name: string;

    @Column()
    isoCode: string;

    @OneToMany(() => User, (user) => user.country)
    users: User[];

    @OneToMany(() => Destination, (destination) => destination.country)
    destinations: Destination[];
    }