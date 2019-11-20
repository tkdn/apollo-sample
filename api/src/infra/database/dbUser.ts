import { getRepository } from "typeorm";
import { User } from "./entities/User";

export const dbUser = getRepository(User);
