import getAllTasks from "@/db/tasks/getAllTasks";
import { FullTaskInterface } from "@/app/types/tasks/FullTaskInterface";
import Client from "./client";
import getEmployeesByTaskId from "@/db/employees/getEmployeesByTaskId";
import getImagesByTaskId from "@/db/images/getImagesByTaskId";

export default async function Dashboard() {
    const tasksFromDB = await getAllTasks();
    const fullTasks: FullTaskInterface[] = [];
    for (let index = 0; index < tasksFromDB.length; index++) {
        const task = tasksFromDB[index];
        const employees = await getEmployeesByTaskId(task.id);
        const images = await getImagesByTaskId(task.id);

        fullTasks.push({
            ...task,
            employees: employees,
            images: images
        })
    }
    return <>
        <Client tasks={fullTasks} />
    </>
}
