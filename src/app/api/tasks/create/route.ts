import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const data = await request.formData();

    return NextResponse.json({
        success: true,
        data: Array.from(data),
    })
} 