import getAllEmployeesFromDB from "@/db/employees/getAllEmployees/getAllEmployeesFromDB";

export default async function ViewAllEmployees() {
    const employees = await getAllEmployeesFromDB();
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