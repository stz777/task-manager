import db_connection from "@/app/tools/dbConnect";

export async function changeTaskStatusInDB(task_id: number, status: number): Promise<boolean> {
    return await db_connection.promise().query(
        "UPDATE tasks SET status = ? WHERE id = ?", [status, task_id]
    )
        .then(([x]: any) => {
            return !!x.affectedRows;
        })
        .catch(error => {
            console.log('error', error);
            return false;
        });;
}