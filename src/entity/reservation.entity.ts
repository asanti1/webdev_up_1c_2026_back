import { Column, Entity, ManyToOne } from "typeorm";
import { Base } from "./base.entity";
import { Package } from "./package.entity";
import { User } from "./user.entity";

export enum ReservationStatusEnum {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    CANCELLED = "cancelled",
}


@Entity()
export class Reservation extends Base {

    @Column({ type: "date" })
    reservationDate!: Date;

    @Column({ type: "int" })
    totalPassengers!: number;

    @Column({ type: "numeric", precision: 10, scale: 2 })
    finalPrice!: number;

    @Column({ type: "varchar", length: 400, nullable: true })
    notes!: string | null;

    @Column({
        type: "enum",
        enum: ReservationStatusEnum,
        default: ReservationStatusEnum.PENDING,
    })
    status!: ReservationStatusEnum;

    @ManyToOne(() => User, (user: User) => user.reservations)
    user!: User;

    @ManyToOne(() => Package, (pack: Package) => pack.reservations)
    package!: Package;

}
