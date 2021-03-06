import {
    Entity,
    PrimaryColumn,
    Column
} from "typeorm";

@Entity("users")
export class User {
    @PrimaryColumn()
    id!: number;

    @Column({
        name: "hashed_uid",
        type: "varchar",
        length: 255
    })
    hashedUid!: string;
}
