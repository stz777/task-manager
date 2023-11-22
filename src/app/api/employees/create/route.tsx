import createEmployee from "@/db/employees/create/createEmployee";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const data = await request.json();
    const employeeId = await createEmployee(data);
    if (!employeeId) {
        return NextResponse.json({
            success: false,
            error: "#c82n"
        })
    }
    return NextResponse.json({
        success: true,
        data,
        employeeId
    })
}