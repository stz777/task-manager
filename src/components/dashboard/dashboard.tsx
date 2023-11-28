import getAllTasks from "@/db/tasks/getAllTasks";
import { FullTaskInterface } from "@/app/types/tasks/FullTaskInterface";
import Client from "./client";
import { EmployeeFromDB } from "@/types/employees/employeeFromDB";
import db_connection from "@/app/tools/dbConnect";

export default async function Dashboard() {
    const tasksFromDB = await getAllTasks();
    const fullTasks: FullTaskInterface[] = [];
    for (let index = 0; index < tasksFromDB.length; index++) {
        const task = tasksFromDB[index];
        const employees = await getEmployeesByTaskId(task.id);
        fullTasks.push({
            ...task,
            employees: employees
        })
    }
    return <>
        <Client tasks={fullTasks} />
    </>
}

async function getEmployeesByTaskId(taskId: number): Promise<EmployeeFromDB[]> {
    return db_connection.promise().query(
        "SELECT * FROM employees"
    )
        .then(x => {
            return [];
        })
}