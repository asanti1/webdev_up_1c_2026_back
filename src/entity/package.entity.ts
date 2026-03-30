import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { CategoryPackage } from "./categoryPackage.entity";
import { Destination } from "./destination.entity";
import { Reservation } from "./reservation.entity";

@Entity()
export class Package extends Base {
    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    availableSlots: number;

    @Column()
    maxSlots: number;

    @Column()
    imageUrl: string;

    @Column()
    isActive: boolean;

    @ManyToOne(() => CategoryPackage, (categoryPackage) => categoryPackage.packages)
    categoryPackage: CategoryPackage;

    @ManyToOne(() => Destination, (destination) => destination.packages)
    destination: Destination;

    @OneToMany(() => Reservation, (reservation) => reservation.package)
    reservations: Reservation[];

}
