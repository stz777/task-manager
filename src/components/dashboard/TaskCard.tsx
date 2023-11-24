"use client"
import { FullTaskInterface } from "@/app/types/tasks/FullTaskInterface";
import dayjs from "dayjs";
export default function TaskCard(props: FullTaskInterface) {
    return <div className="card mb-3">
        <div className="card-header">
            <h5 className="m-0 p-0">Задача #{props.id}</h5>
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
        </div>
    </div>
}
