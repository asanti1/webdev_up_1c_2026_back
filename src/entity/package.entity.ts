import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { CategoryPackage } from "./categoryPackage.entity";
import { Destination } from "./destination.entity";
import { Reservation } from "./reservation.entity";

@Entity()
export class Package extends Base {
    @Column({ type: "varchar", length: 50 })
    title!: string;

    @Column({ type: "varchar", length: 400 })
    description!: string;

    @Column({ type: "int" })
    price!: number;

    @Column({ type: "date" })
    startDate!: Date;

    @Column({ type: "date" })
    endDate!: Date;

    @Column({ type: "int" })
    availableSlots!: number;

    @Column({ type: "int" })
    maxSlots!: number;

    @Column({ type: "varchar", length: 400 })
    imageUrl!: string;

    @Column({ type: "boolean" })
    isActive!: boolean;

    @ManyToOne(() => CategoryPackage, (categoryPackage: CategoryPackage) => categoryPackage.packages)
    categoryPackage!: CategoryPackage;

    @ManyToOne(() => Destination, (destination: Destination) => destination.packages)
    destination!: Destination;

    @OneToMany(() => Reservation, (reservation: Reservation) => reservation.package)
    reservations!: Reservation[];

}
