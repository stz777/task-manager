import db_connection from "@/app/tools/dbConnect"
import { sendMessageToTg } from "../../bugReport/sendMessageToTg"

export default async function insertTokenToDB(token: string, user: number): Promise<number> {
    return await new Promise(resolve => {
        db_connection.query(
            "INSERT INTO tokens (user, token) VALUES (?,?)",
            [user, token],
            function (err, res: any) {
                if (err) {
                    sendMessageToTg(
                        JSON.stringify(
                            {
                                errorNo: "#m2ndpv7J",
                                error: err,
                                values: { token, user }
                            }, null, 2),
                        "5050441344"
                    )
                }
                if (res) {
                    resolve(res.insertId)
                } else {
                    resolve(0)
                }
            }
        )
    })
}