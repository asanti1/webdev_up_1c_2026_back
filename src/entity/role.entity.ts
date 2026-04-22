import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { User } from "./user.entity";


@Entity()
export class Role extends Base{
    @Column({ type: "varchar", length: 25, unique: true })
    name!: string;

    @Column({ type: "varchar", length: 400 })
    description!: string;

    @OneToMany(() => User, (user: User) => user.role)
    users!: User[];

}