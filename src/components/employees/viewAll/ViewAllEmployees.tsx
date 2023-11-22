import db_connection from "@/app/tools/dbConnect";
import { EmployeeFromDB } from "@/types/employees/employeeFromDB";

export default async function ViewAllEmployees() {
    const employees = await getAllEmployees();
    return <>
        <table className="table w-auto striped table-border">
            <thead>
                {Object.entries(employees[0]).map(([a]) => <td key={a}>{String(a)}</td>)}
            </thead>
            <tbody>
                {employees.map(employee => <tr key={employee.id}>
                    {Object.entries(employee).map(([_, b]) => <td key={b}>{String(b)}</td>)}
                </tr>)}
            </tbody>
        </table>
        <pre>
            {JSON.stringify(employees, null, 2)}
        </pre>
    </>
}

async function getAllEmployees(): Promise<EmployeeFromDB[]> {
    return db_connection.promise().query("select * from employees ORDER BY id DESC").then(([x]: any) => {
        return x;
    })
}