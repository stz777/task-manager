import db_connection from "@/app/tools/dbConnect";
import { EmployeeFromDB } from "@/types/employees/employeeFromDB";

export default function createEmployee(employee: EmployeeFromDB) {
    const { username, telegram_id, contacts, role } = employee;
    return db_connection.promise().query(
        "INSERT INTO employees (username, telegram_id, contacts, role) VALUES (?,?,?,?)",
        [username, telegram_id, contacts, role]
    )
        .then(([answer]: any) => answer.insertId)
}