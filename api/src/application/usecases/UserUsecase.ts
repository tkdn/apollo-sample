import { IUserRepository } from "../interfaces/IUserRepository";

export class UserUsecase {
    constructor(
        private userRepo: IUserRepository
    ){}

    public async get() {
        return await this.userRepo.getList();
    }
}
