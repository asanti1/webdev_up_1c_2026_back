import { Column, Entity, Generated, ManyToOne, PrimaryColumn } from "typeorm";
import { Package } from "./package.entity";
import { User } from "./user.entity";
import { Base } from "./base.entity";

enum ReservationStatusEnum {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    CANCELLED = "cancelled",
}


@Entity()
export class Reservation extends Base {

    @Column()
    reservationDate: Date;

    @Column()
    totalPassengers: number;

    @Column()
    finalPrice: number;

    @Column()
    notes: string;

    @Column({
        type: "enum",
        enum: ReservationStatusEnum,
        default: ReservationStatusEnum.PENDING,
    })
    status: ReservationStatusEnum;

    @ManyToOne(() => User, (user) => user.reservations)
    user: User;

    @ManyToOne(() => Package, (pack) => pack.reservations)
    package: Package;

}
