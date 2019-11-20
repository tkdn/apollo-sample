import { Repository } from "typeorm";
import { User } from "../../infra/database/entities/User";
import { IUserRepository } from "../../application/interfaces/IUserRepository";

export class UserRepository extends IUserRepository {
    
    constructor(
        private dbRepo: Repository<User>
    ) {
        super();
    }

    public async getList() {
        return await this.dbRepo.find();
    }

    public async getById(uid: string) {
        const [user] = await this.dbRepo.findByIds([uid]);
        return user;
    }
}
