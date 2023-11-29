import db_connection from "@/app/tools/dbConnect"
import { sendMessageToTg } from "../../bugReport/sendMessageToTg";

export default async function checkImageIsExists(imageName: string) {
    return db_connection.promise().query(
        "SELECT * FROM media WHERE name = ?",
        [imageName]
    )
        .then(
            ([res]: any) => {
                console.log('res #4nb483', res);
                return res.length;
            }
        )
        .catch(
            err => {
                console.error('error #3n4n6', err);
                sendMessageToTg(
                    JSON.stringify(
                        {
                            errorNo: "#n3b7m",
                            error: err,
                            values: { imageName }
                        }, null, 2),
                )
                return null;
            }
        )
}