import getAllTasks from "@/db/tasks/getAllTasks";
import Client from "./client";

export default async function Dashboard() {
    const tasks = await getAllTasks();
    return <>
        <Client tasks={tasks} />
    </>
}
