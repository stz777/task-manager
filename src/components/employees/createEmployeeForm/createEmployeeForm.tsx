"use client"

import { PostWrapper } from "@/components/fetch/fetchWrapper";
import roles from "@/components/roles/roles";
import { EmployeeFromDB } from "@/types/employees/employeeFromDB";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateEmployeeForm() {
  const {
    register,
    handleSubmit,
  } = useForm<EmployeeFromDB>({
    defaultValues: {
      username: "дядя вася",
      telegram_id: "manamana",
      contacts: "телефоны, шмелефоны",
      role: "manager"
    }
  })
  return <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input className="form-control" {...register("username")} placeholder="ФИО сотрудника" />
      <input className="form-control" {...register("telegram_id")} placeholder="Телеграм" />
      <textarea className="form-control" cols={30} rows={10} {...register("contacts")}></textarea>
      <select {...register("role", { required: true })} className="form-select" aria-label="Default select example">
        <option value="" disabled>Выберите должность</option>
        {roles.map(role => <option key={role.slug} value={role.slug}>{role.title}</option>)}
      </select>
      <button>сохранить</button>
    </form>
  </>
}

async function onSubmit(values: any) {
  try {
    const postWrapper = new PostWrapper();
    const postDataResponse = await postWrapper.post('/api/employees/create', JSON.stringify(values));
    if (postDataResponse.success) {
      toast.success("Новый сотрудник создан")
    }
  } catch (error) {
    console.log('err #fnru4', error);
  }
}
