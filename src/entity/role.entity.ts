import { Column, Entity, Generated, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";
import { Base } from "./base.entity";


@Entity()
export class Role extends Base{
    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];

}