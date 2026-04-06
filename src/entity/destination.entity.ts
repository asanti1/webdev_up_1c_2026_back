import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Country } from "./country.entity";
import { Package } from "./package.entity";
import { Base } from "./base.entity";

@Entity()
export class Destination extends Base{

    @Column({ type: "varchar", length: 50 })
    name!: string;

    @Column({ type: "varchar", length: 400 })
    description!: string;

    @ManyToOne(() => Country, (country: Country) => country.destinations)
    country!: Country;

    @OneToMany(() => Package, (pack: Package) => pack.destination)
    packages!: Package[];

}
