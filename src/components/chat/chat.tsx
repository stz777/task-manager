"use client"
import { useEffect, useState } from "react";
// import AttachmentsArea from "./AttachmentsArea";
import { toast } from "react-toastify";
import dayjs from "dayjs";
// import { MessageToLead } from "@/app/components/types/fullLeadTypes";

interface MessageFromDB {
    id: number
    created_date: string
    text: string
}

export default function Chat({ task_id }: { task_id: number }) {
    return null;
    const [stateMessages, setStateMessages] = useState<MessageFromDB[]>([]);
    useEffect(() => {
        let mounted = true;
        (async function updateChat() {
            if (!mounted) return;
            const newMessages = await fetchGetMessages(task_id);
            if (JSON.stringify(stateMessages) !== JSON.stringify(newMessages)) setStateMessages(newMessages);
            setTimeout(() => {
                updateChat();
            }, 2000);
        })()
        return () => { mounted = false; }
    }, [task_id])


    return <>
        <div className="card">
            <div className="card-body">
                {stateMessages.map(message =>
                    <div key={message.id} className='border border-dsrk mb-5 p-1' style={{ maxWidth: "400px" }}>

                        <div className="d-flex justify-content-between">
                            <div className="text-dark fw-bold">
                                {/* {message.username} ({roleTranslator[message.role] || JSON.stringify(message.role)}) */}
                            </div> {/*username*/}
                            <div className="ms-4 text-nowrap">{dayjs(message.created_date).format("DD.MM.YYYY HH.mm")}</div> {/*username*/}
                        </div>
                        <pre
                            style={{
                                fontSize: "inherit", marginBottom: "0"
                            }}
                        >{message.text}</pre>
                        {/* <AttachmentsArea attachments={message.attachments} /> */}
                    </div>)}
            </div>
        </div>
    </>
}

async function fetchGetMessages(task_id: number) {
    return await fetch(
        "/api/messages/get",
        {
            method: "POST",
            body: JSON.stringify({
                task_id,
            })
        }
    ).then(
        response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText);
            }
        }
    ).then((data: any) => {
        if (data.success) {
            if (data.messages) {
                return data.messages;
            } else {
                toast.error("Что-то пошло не так #v45g");
            }
        } else {
            toast.error("Что-то пошло не так #53ge");
        }
    })
        .catch(_ => {
            toast.error("Что-то пошло не так #rh58");
        });
}

// export const roleTranslator: any = {
//     inspector: "Контролер",
//     executor: "Исполнитель",
//     viewer: "Наблюдатель",
// }