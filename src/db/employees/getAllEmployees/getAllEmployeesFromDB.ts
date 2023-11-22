import db_connection from "@/app/tools/dbConnect";
import { EmployeeFromDB } from "@/types/employees/employeeFromDB";

export default async function getAllEmployeesFromDB(): Promise<EmployeeFromDB[]> {
    return db_connection.promise().query("select * from employees ORDER BY id DESC").then(([x]: any) => {
        return x;
    })
}