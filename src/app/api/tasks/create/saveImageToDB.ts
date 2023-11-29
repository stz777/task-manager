import db_connection from "@/app/tools/dbConnect"
import { sendMessageToTg } from "../../bugReport/sendMessageToTg"

export default async function saveImageToDB(imageName: string, taskId: number) {
    return db_connection.promise().query(
        "INSERT INTO images ( user,essense_type,essense_id,image_name ) VALUES(?,?,?,?)",
        [1, "task_image", taskId, imageName]
    )
        .then(([resolve]: any) => {
            return resolve.insertId;
        })
        .catch(err => {
            console.log('err #c8ehk4', err);
            sendMessageToTg(
                JSON.stringify(
                    {
                        errorNo: "#d8dnd",
                        error: err,
                        values: {
                            imageName,
                            taskId
                        }
                    }, null, 2),
            )
            return 0;
        });
}