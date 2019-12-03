import {AddTaskUsecase} from "./../../application/usecases/AddTaskUsecase";
import { dbTask } from "../../infra/database/dbTask";
import { TaskRepository } from "../repositories/TaskRepository";

const taskRepo = new TaskRepository(dbTask);
const usecase = new AddTaskUsecase(taskRepo);

export const addTask = async (
    _root: any,
    args: {
        userId: number,
        overview: string,
        priority: number,
        deadline: string
    },
) => {
    const {userId, overview, priority, deadline } = args;
    return await usecase.exeute({
        userId, overview, priority, deadline
    });
};
