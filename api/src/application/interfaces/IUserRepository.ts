import { User } from "../../infra/database/entities/User";

export abstract class IUserRepository {
    public abstract getList(): Promise<User[]>
    public abstract getById(uid: number): Promise<User>
}
