import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Country } from "./country.entity";
import { Package } from "./package.entity";
import { Base } from "./base.entity";

@Entity()
export class Destination extends Base{

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => Country, (country) => country.destinations)
    country: Country;

    @OneToMany(() => Package, (pack) => pack.destination)
    packages: Package[];

}
