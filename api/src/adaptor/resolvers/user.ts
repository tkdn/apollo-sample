import { UserRepository } from "../repositories/UserRepository";
import { UserUsecase } from "../../application/usecases/UserUsecase";
import { dbUser } from "../../infra/database/dbUser";

const userRepo = new UserRepository(dbUser);
const usecase = new UserUsecase(userRepo);

export const user = async () => {
    return usecase.get();
};
