"use client"
import { FullTaskInterface } from "@/app/types/tasks/FullTaskInterface";
import { TaskFromDBInterface } from "@/app/types/tasks/TaskFromDBInterface";
import taskStatuses from "@/consts/taskStatuses";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Client(props: { tasks: TaskFromDBInterface[] }) {

    const [stateTasks, setTasks] = useState(props.tasks);

    useEffect(() => {
        let mount = true;
        (async function refreshData() {
            if (!mount) return;
            await new Promise(resolve => { setTimeout(() => { resolve(1); }, 1000); });
            const response = await fetchTasks();

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


function TaskCard(props: FullTaskInterface) {
    return <div className="card mb-3">
        <div className="card-header">
            <h5>Задача #{props.id}</h5>
        </div>
        <div className="card-body">
            <table>
                <tbody>
                    <tr><th>Описание: </th><td>{props.description}</td></tr>
                    <tr><th>Стоимость: </th><td>{props.price}</td></tr>
                    <tr><th>Создано: </th><td>{dayjs(props.created_date).format("DD.MM.YYYY hh:mm")}</td></tr>
                    <tr><th>Дедлайн: </th><td>{dayjs(props.deadline).format("DD.MM.YYYY hh:mm")}</td></tr>
                </tbody>
            </table>

            <div>
                <div><button
                    onClick={() => {
                        fetch(
                            "/api/tasks/change-status",
                            {
                                method: "POST",
                                body: JSON.stringify({
                                    task_id: props.id,
                                    status: 2
                                })
                            }
                        )
                    }}
                >Передать в работу</button></div>
            </div>
        </div>
    </div>
}



async function fetchTasks() {
    return fetch(
        `/api/tasks/get-all-tasks`,
        {
            method: "POST",
        }
    ).then(
        response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText);
            }
        }
    ).then(data => {
        if (data.success) {
            if (!data.data) {
                // toast.error("Что-то пошло не так #dnsd3J");
            }
            return data;
        } else {
            // toast.error("Что-то пошло не так #mdna3");
        }
    })
        .catch(error => {
            const statusText = String(error);
            fetch(
                `/api/bugReport`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        text: {
                            err: "#dhhcds8",
                            data: {
                                statusText,
                                error,
                                values: {}
                            }
                        }
                    })
                }
            )
                .then(x => x.json())
                .then(x => {
                    console.log(x);
                })
        })
}