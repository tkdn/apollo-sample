import { getRepository } from "typeorm";
import { Task } from "./entities/Task";

export const dbTask = getRepository(Task);
