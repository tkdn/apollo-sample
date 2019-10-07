import {
    Entity,
    PrimaryColumn,
    Column,
    BaseEntity
} from "typeorm";


@Entity("tasks")
export class Task extends BaseEntity {
    @PrimaryColumn()
    id!: string;

    @Column("varchar", { length: 255 })
    overview!: string;


    @Column("int")
    priority!: number;

    @Column("timestamp")
    deadline!: string;
}
