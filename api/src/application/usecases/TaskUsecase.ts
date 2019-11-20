import { ITaskRepository } from "../interfaces/ITaskRespositoty";
import { IUserRepository } from "../interfaces/IUserRepository";

export class TaskUsecase {
    constructor(
        private taskRepo: ITaskRepository,
        private userReso: IUserRepository
    ){}

    public async getListWithUser() {
        const tasks = await this.taskRepo.getList();
        return tasks.map(async (task) => {
            const user = await this.userReso.getById(task.userId);
            return {
                ...task,
                user
            };
        });
    }
}
