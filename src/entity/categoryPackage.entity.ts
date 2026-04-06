import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { Package } from "./package.entity";

@Entity()
export class CategoryPackage extends Base {
    @Column({ type: "varchar", length: 100 })
    name!: string;

    @Column({ type: "varchar", length: 400 })
    description!: string;

    @OneToMany(() => Package, (pack: Package) => pack.categoryPackage)
    packages!: Package[];

}
