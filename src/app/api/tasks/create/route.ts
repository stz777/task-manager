import { pool } from "@/app/tools/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const data = await request.formData();

    const {
        price,
        description,
        deadline
    } = Object.fromEntries(data);

    const newTaskId: number = await pool.promise().query(
        "INSERT INTO tasks ( description, price, deadline ) VALUES (?,?,?)",
        [description, price, deadline]
    ).then((x: any) => {
        return x[0].insertId;
    })
        .catch(x => {
            console.log('error #vuf7', (x));
            return 0;
        });

    // return NextResponse.json({
    //     success: true,
    //     task: newTaskId,
    // })

    return new Response(JSON.stringify({ a: "b" }), {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    });

} 