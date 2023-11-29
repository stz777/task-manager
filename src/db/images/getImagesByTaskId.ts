import db_connection from "@/app/tools/dbConnect";
import { ImageFromDBInterface } from "@/app/types/images/ImageFromDBInterface";

export default async function getImagesByTaskId(taskId: number): Promise<ImageFromDBInterface[]> {
    return db_connection.promise().query(
        "SELECT * FROM images WHERE essense_id = ?", [taskId]
    )
        .then((x: any) => {
            return x[0];
        })
}
