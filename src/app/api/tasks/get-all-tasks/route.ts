import { FullTaskInterface } from "@/app/types/tasks/FullTaskInterface";
import getEmployeesByTaskId from "@/db/employees/getEmployeesByTaskId";
import getImagesByTaskId from "@/db/images/getImagesByTaskId";
import getAllTasks from "@/db/tasks/getAllTasks";
import { NextResponse } from "next/server";

export async function POST() {
    const tasksFromDB = await getAllTasks();
    const fullTasks: FullTaskInterface[] = [];
    for (let index = 0; index < tasksFromDB.length; index++) {
        const task = tasksFromDB[index];
        const employees = await getEmployeesByTaskId(task.id);
        const images = await getImagesByTaskId(task.id);

        fullTasks.push({
            ...task,
            employees: employees,
            images: images
        })
    }

    return NextResponse.json({
        success: true,
        fullTasks
    })
}