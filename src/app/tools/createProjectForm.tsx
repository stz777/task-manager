"use client"

import { useForm } from 'react-hook-form';

export default function CreateProjectForm() {
    const {
        register,
        handleSubmit,
    } = useForm<any>()

    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("title")} placeholder="Название проекта" />
            <button>сохранить</button>
        </form>
    </>
}

async function onSubmit({ title }: any) {
    fetch("/api/projects/create", {
        method: "POST",
        body: JSON.stringify({ title })
    })
}