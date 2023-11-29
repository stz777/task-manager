import { EmployeeFromDB } from "@/types/employees/employeeFromDB";
import { TaskFromDBInterface } from "./TaskFromDBInterface";
import { ImageFromDBInterface } from "../images/ImageFromDBInterface";

export type FullTaskInterface = TaskFromDBInterface
    & { employees: EmployeeFromDB[] }
    & { images: ImageFromDBInterface[] };