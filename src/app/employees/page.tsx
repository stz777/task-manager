import CreateEmployeeForm from "@/components/employees/createEmployeeForm/createEmployeeForm";
import ViewAllEmployees from "@/components/employees/viewAll/ViewAllEmployees";

export default async function PAGE() {
    return <>
        <h1>employeess</h1>
        <div className="m-5 p-5 shadow">
            <h3>Создать сотрудника</h3>
            <CreateEmployeeForm />
        </div>
        <ViewAllEmployees />
    </>
}