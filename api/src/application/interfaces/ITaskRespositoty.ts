import { Task } from "../../infra/database/entities/Task";

export abstract class ITaskRepository {
    public abstract getList(): Promise<Task[]>
    public abstract save(
        params: Omit<Task, "id" | "idBeforeInsert">
    ): Promise<Task | void>
}
