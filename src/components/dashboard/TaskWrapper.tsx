"use client"

import { FullTaskInterface } from "@/app/types/tasks/FullTaskInterface";
import { useState } from "react";
import SideModal from "../side-modal/SideModal";

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
            children={<>
                <h1>Задача #{task.id}</h1>
                <pre>{JSON.stringify(task, null, 2)}</pre>
            </>}
        />
    </div>
}