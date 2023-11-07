import { changeTaskStatusInDB } from "@/db/tasks/changeTaskStatus";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { task_id, status } = await request.json();
    const updated = await changeTaskStatusInDB(task_id, status);
    return NextResponse.json({
        success: true,
        updated
    })
}