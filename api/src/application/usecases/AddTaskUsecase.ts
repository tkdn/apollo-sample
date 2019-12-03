import { ITaskRepository } from "../interfaces/ITaskRespositoty";

export class AddTaskUsecase {
    constructor(
        private taskRepo: ITaskRepository
    ){}

    public async exeute(params: {
        userId: number,
        overview: string,
        priority: number,
        deadline: string
    }){
        return await this.taskRepo.save.apply(this.taskRepo, [params]);
    }
}
