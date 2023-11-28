"use client"
import taskStatuses from "@/consts/taskStatuses";
import { useEffect, useState } from "react";
import fetchAllTasks from "./fetchAllTasks";
import TaskCard from "./TaskCard";
import TaskWrapper from "./TaskWrapper";
import { FullTaskInterface } from "@/app/types/tasks/FullTaskInterface";

export default function Client(props: { tasks: FullTaskInterface[] }) {
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

    return <>
        <div className="row">
            {Object.entries(taskStatuses)
                .map(([status_id, status_title]) => <div className="col border" key={status_id}>
                    <h3>{status_title}</h3>
                    {(() => {
                        const taskWithStatus = outputTasks.filter(task => task.status === Number(status_id));
                        return taskWithStatus.map(task => <TaskWrapper key={task.id} task={task}>
                            <TaskCard  {...task} />
                        </TaskWrapper>
                        );
                    })()}

                </div>)}
        </div>
    </>
}
