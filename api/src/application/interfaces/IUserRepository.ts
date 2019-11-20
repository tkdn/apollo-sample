import { User } from "../../infra/database/entities/User";

export abstract class IUserRepository {
    public abstract async getList(): Promise<User[]>
    public abstract async getById(uid: string): Promise<User>
}
