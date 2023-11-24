"use client"
import { useEffect, useState } from "react";

export default function SideModal({ children, opener, isOpen, closeHandler }: { children: React.ReactNode; opener?: React.ReactNode; isOpen?: boolean; closeHandler: any }) {
    const [open, setOpen] = useState(false);
    useEffect(() => { setOpen(!!isOpen) }, [isOpen])
    return <>
        {opener && <div className="p-5" onClick={() => {
            setOpen(true);
        }}>{opener}</div>}
        {open && <>
            <ModalWrapper>
                {children}
                <button onClick={() => {
                    setOpen(false);
                    if (closeHandler) closeHandler();
                }}>close modal</button>
            </ModalWrapper>
        </>}
    </>
}

function ModalWrapper(props: any) {
    return <div
        style={{
            position: "fixed",
            top: 0,
            right: 0,
            background: "#fff",
            border: "1px solid",
            height: "100vh"
        }}
    >
        {props.children}
    </div>
}