"use client"

import { FullTaskInterface } from "@/app/types/tasks/FullTaskInterface";
import { useState } from "react";
import SideModal from "../side-modal/SideModal";
import dayjs from "dayjs";

export default function TaskWrapper({ task, children }: { task: FullTaskInterface; children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    return <div>
        <div onClick={() => {
            setOpen(true);
        }}>
            {children}
        </div>
        <SideModal
            closeHandler={() => setOpen(false)}
            isOpen={open}
        >
            <h1>Задача #{task.id}</h1>
            <table className="table">
                <tbody>
                    <tr><td>Описание</td><td>{task.description}</td></tr>
                    <tr><td>Статус</td><td>{task.status}</td></tr>
                    <tr><td>Цена</td><td>{task.price}</td></tr>
                    <tr><td>Создано</td><td>{dayjs(task.created_date).format("DD.MM.YYYY hh:mm")}</td></tr>
                    <tr><td>Дедлайн</td><td>{dayjs(task.deadline).format("DD.MM.YYYY hh:mm")}</td></tr>
                    <tr><td>Ответственные</td><td>
                        <pre>{JSON.stringify(task.employees, null, 2)}</pre>
                    </td></tr>
                </tbody>
            </table>
        </SideModal>
    </div>
}