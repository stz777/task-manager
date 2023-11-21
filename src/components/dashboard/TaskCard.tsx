"use client"
import { FullTaskInterface } from "@/app/types/tasks/FullTaskInterface";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import { Modal } from "react-bootstrap";
import Chat from "../chat/chat";

export default function TaskCard(props: FullTaskInterface) {
    const [show, setShow] = useState(false);


    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);


    return <div className="card mb-3">
        <div className="card-header">
            <h5 className="m-0 p-0">Задача #{props.id}</h5>
        </div>
        <div className="card-body">
            <div className="row">
                <div className="col-6">
                    <table>
                        <tbody>
                            <tr><th>Описание: </th><td>{props.description}</td></tr>
                            <tr><th>Стоимость: </th><td>{props.price}</td></tr>
                            <tr><th>Создано: </th><td>{dayjs(props.created_date).format("DD.MM.YYYY hh:mm")}</td></tr>
                            <tr><th>Дедлайн: </th><td>{dayjs(props.deadline).format("DD.MM.YYYY hh:mm")}</td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-6">
                    <div><button
                        className="btn btn-sm btn-outline-dark"
                        onClick={() => {
                            fetch("/api/tasks/change-status", {
                                method: "POST", body: JSON.stringify({ task_id: props.id, status: 2 })
                            })
                        }}
                    >Передать в работу</button></div>
                    <div>
                        <ChatWrapper task_id={props.id} />
                    </div>
                </div>
            </div>
        </div>
    </div>
}

function ChatWrapper({ task_id }: { task_id: number }) {
    const [open, setOpen] = useState(false);
    if (!open) return <>
        <button
            className="btn btn-sm btn-outline-dark"
            onClick={() => {
                setOpen(true);
            }}
        >Чат</button>
    </>
    return <Modal show={open} onHide={() => setOpen(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Чат задачи #1</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Chat task_id={task_id} />
        </Modal.Body>
    </Modal>

}