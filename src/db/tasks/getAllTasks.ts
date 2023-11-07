import { pool } from "@/app/tools/dbConnect";
import { TaskFromDBInterface } from "@/app/types/tasks/TaskFromDBInterface";

export default async function getAllTasks(): Promise<TaskFromDBInterface[]> {
    return await pool.promise().query(
        "SELECT * FROM tasks"
    )
        .then(([x]: any) => x)
        .catch(_ => []);;
}