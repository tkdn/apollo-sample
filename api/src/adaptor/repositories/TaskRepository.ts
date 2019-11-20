import { Repository } from "typeorm";
import { Task } from "../../infra/database/entities/Task";
import { ITaskRepository } from "../../application/interfaces/ITaskRespositoty";

export class TaskRepository extends ITaskRepository {
    
    constructor(
        private dbRepo: Repository<Task>
    ) {
        super();
    }

    public async getList() {
        return await this.dbRepo.find();
    }
}
