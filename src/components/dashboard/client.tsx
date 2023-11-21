"use client"
import { TaskFromDBInterface } from "@/app/types/tasks/TaskFromDBInterface";
import taskStatuses from "@/consts/taskStatuses";
import { useEffect, useState } from "react";
import fetchAllTasks from "./fetchAllTasks";
import TaskCard from "./TaskCard";

export default function Client(props: { tasks: TaskFromDBInterface[] }) {
    const [stateTasks, setTasks] = useState(props.tasks);
    useEffect(() => {
        let mount = true;
        (async function refreshData() {
            if (!mount) return;
            await new Promise(resolve => { setTimeout(() => { resolve(1); }, 1000); });
            const response = await fetchAllTasks();

            if (JSON.stringify(stateTasks) !== JSON.stringify(response.tasks)) {
                setTasks(response.tasks);
            }
            await new Promise(r => {
                setTimeout(() => {
                    r(1);
                }, 1000);
            })
            await refreshData();
        })();
        return () => { mount = false; }
    }, [])


    const outputTasks = stateTasks ? stateTasks : props.tasks;

    return <div className="row">
        {Object.entries(taskStatuses)
            .map(([status_id, status_title]) => <div className="col border" key={status_id}>
                <h3>{status_title}</h3>
                {(() => {
                    const taskWithStatus = outputTasks.filter(task => task.status === Number(status_id));
                    return taskWithStatus.map(task => <TaskCard key={task.id} {...task} />);
                })()}

            </div>)}
    </div>
}
