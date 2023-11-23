import { NextResponse } from "next/server";
import generateRandomString from "./generateRandomString";
import getUserByCode from "./getUserByCode";
import insertTokenToDB from "./insertTokenToDB";

export async function POST(
    request: Request,
) {
    const resquestData = await request.json();
    if (resquestData.code) {
        const user: any = await getUserByCode(resquestData.code);
        if (user) {
            const newToken = generateRandomString();
            const tokenCreated = await insertTokenToDB(newToken, user.id);
            if (tokenCreated) {
                return NextResponse.json({
                    success: true,
                    token: newToken,
                    user: user.username,
                });
            } else {
                return NextResponse.json({
                    success: false,
                    error:"#k3n7k"
                });
            }
        } else {
            return NextResponse.json({
                success: false,
                error:"#f8f4"
            });
        }
    }
    return NextResponse.json({
        success: false,
    });
}


