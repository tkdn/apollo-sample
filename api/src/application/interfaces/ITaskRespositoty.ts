import { Task } from "../../infra/database/entities/Task";

export abstract class ITaskRepository {
    public abstract async getList(): Promise<Task[]>
    public abstract async save(
        params: Omit<Task, "id" | "idBeforeInsert">
    ): Promise<Task | void>
}
