import {
    Entity,
    Column,
    PrimaryColumn,
    BeforeInsert
} from "typeorm";

import { v4 as uuid } from "uuid";

@Entity("tasks")
export class Task {
    @PrimaryColumn()
    id!: string;

    @Column({
        name: "user_id"
    })
    userId!: number;

    @Column("varchar", { length: 255 })
    overview!: string;

    @Column("int")
    priority!: number;

    @Column("timestamp")
    deadline!: string;

    @BeforeInsert()
    idBeforeInsert() {
        this.id = uuid();
        // this.id = "hogefugafoobar";
    }
}
