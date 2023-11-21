"use client"

import { PostWrapper } from "@/components/fetch/fetchWrapper";
import { useForm } from "react-hook-form";

export default function CreateEmployeeForm() {
  const {
    register,
    handleSubmit,
  } = useForm<any>()
  return <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input className="form-control" {...register("title")} placeholder="ФИО сотрудника" />
      <select {...register("role", { required: true })} defaultValue="" className="form-select" aria-label="Default select example">
        <option value="" disabled>
          Выберите должность
        </option>
        <option value="manager">Менеджер</option>
        <option value="designer">Дизайнер</option>
        <option value="">Дизайнер</option>
      </select>
      <button>сохранить</button>
    </form>
  </>
}

async function onSubmit({ title }: any) {
  try {
    const postWrapper = new PostWrapper(); //postDataResponse
    const postDataResponse = await postWrapper.post('/api/employees/create', JSON.stringify({ title }));
    console.log('postDataResponse', postDataResponse);
  } catch (error) {
    console.log('err #fnru4', error);
  }
}
