import { EmployeeFromDB } from "@/types/employees/employeeFromDB";
import { TaskFromDBInterface } from "./TaskFromDBInterface";
export type FullTaskInterface = TaskFromDBInterface & { employees: EmployeeFromDB[] };