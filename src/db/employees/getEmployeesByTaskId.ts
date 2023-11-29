import db_connection from "@/app/tools/dbConnect";
import { EmployeeFromDB } from "@/types/employees/employeeFromDB";

export default async function getEmployeesByTaskId(taskId: number): Promise<EmployeeFromDB[]> {
    return db_connection.promise().query(
        "SELECT * FROM employees"
    )
        .then(x => {
            return [];
        })
}

