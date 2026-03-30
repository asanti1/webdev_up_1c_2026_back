import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { Package } from "./package.entity";

@Entity()
export class CategoryPackage extends Base {
    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Package, (pack) => pack.categoryPackage)
    packages: Package[];


}
