import { Repository, Transaction, TransactionManager, EntityManager } from "typeorm";
import { Task } from "../../infra/database/entities/Task";
import { ITaskRepository } from "../../application/interfaces/ITaskRespositoty";
import { fetch } from "apollo-server-env";

function sleep(ms: number) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

export class TaskRepository extends ITaskRepository {
    
    constructor(
        private dbRepo: Repository<Task>
    ) {
        super();
    }

    public async getList() {
        return await this.dbRepo.find();
    }

    @Transaction()
    public async save(
        params: Omit<Task, "id" | "idBeforeInsert">,
        @TransactionManager() entityManager?: EntityManager,
    ){
        const updateTask = new Task();
        updateTask.userId = params.userId;
        updateTask.overview = params.overview;
        updateTask.priority = params.priority;
        updateTask.deadline = params.deadline;
        try {
            if (params.userId === 1) {
                await sleep(1000);
            }
            const result = await entityManager!.save(updateTask);
            console.log(result);
            await fetch("https://dafdsa.j.ewaf/");
            // return result;
        } catch (error) {
            console.warn(error);
            throw error;
        }
    }
}
