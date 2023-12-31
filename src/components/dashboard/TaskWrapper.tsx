"use client"

import { FullTaskInterface } from "@/app/types/tasks/FullTaskInterface";
import { useState } from "react";
import SideModal from "../side-modal/SideModal";
import dayjs from "dayjs";
import Image from "next/image";

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
                    <tr><td>Изображения</td><td>
                        {
                            task.images.length
                                ? <>
                                    {task.images
                                        .map(image => {
                                            const path = `${process.env.NEXT_PUBLIC_HOST}/${process.env.NEXT_PUBLIC_IMAGES_FOLDER_WEB}/${image.image_name}`;
                                            return <div key={image.id}>
                                                <div className="col position-relative" style={{ height: "300px" }}>
                                                    <Image
                                                        loader={() => path}
                                                        src={path} alt=""
                                                        fill={true}
                                                        style={{ objectFit: "contain" }}
                                                    />
                                                </div>
                                            </div>
                                        })}
                                </>
                                : <>нет картинок</>
                        }
                    </td></tr>
                </tbody>
            </table>
        </SideModal>
    </div>
}