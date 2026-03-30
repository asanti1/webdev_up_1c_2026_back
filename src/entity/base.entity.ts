import { CreateDateColumn, Generated, PrimaryColumn, UpdateDateColumn } from "typeorm";


export class Base {
    @PrimaryColumn()
    @Generated("uuid")
    id: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}

