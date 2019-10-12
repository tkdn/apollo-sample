import {
    Entity,
    PrimaryColumn,
    Column
} from "typeorm";

@Entity("tasks")
export class Task {
    @PrimaryColumn()
    id!: string;

    @Column("varchar", { length: 255 })
    overview!: string;


    @Column("int")
    priority!: number;

    @Column("timestamp")
    deadline!: string;
}
