import * as express from "express";
import { pipeResolvers } from "graphql-resolvers";
import { pipe } from "./middleware/pipe";
import { TaskUsecase } from "../../application/usecases/TaskUsecase";
import { UserRepository } from "../repositories/UserRepository";
import { TaskRepository } from "../repositories/TaskRepository";
import { dbTask } from "../../infra/database/dbTask";
import { dbUser } from "../../infra/database/dbUser";

const taskRepo = new TaskRepository(dbTask);
const userRepo = new UserRepository(dbUser);
const usecase = new TaskUsecase(taskRepo, userRepo);

const _task = async (
    _root: any,
    _args: any,
    ctx: {req: express.Request, [key: string]: any}
) => {
    console.log(_root); // ワッフル
    ctx.req.session!.user = {
        name: "John"
    };
    ctx.user = "existed";
    return await usecase.getListWithUser();
};

export const task = pipeResolvers(pipe, _task);
