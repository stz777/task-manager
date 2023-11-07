import getAllTasks from "@/db/tasks/getAllTasks";
import { NextResponse } from "next/server";

export async function POST() {
    const tasks = await getAllTasks();

    return NextResponse.json({
        success: true,
        tasks
    })
}