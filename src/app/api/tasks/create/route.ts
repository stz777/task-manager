import { pool } from "@/app/tools/dbConnect";
import slugify from "slugify";
import saveImageToDB from "./saveImageToDB";
import fs from "fs";
import checkImageIsExists from "./checkImageIsExists";

export async function POST(request: Request) {
    const data = await request.formData();

    const formdataObj = Object.fromEntries(data);

    const images: any[] = Array.from(data).filter(x => x[0] === "images").map(x => x[1]);

    const {
        price,
        description,
        deadline,
    } = formdataObj;

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

    if (!newTaskId) {
        return new Response(
            JSON.stringify({
                success: false,
                error: "#fk4n6",
            }),
            {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                }
            });
    }

    for (let index = 0; index < images.length; index++) {
        const image = images[index];
        let filename = slugify(image.name.toLocaleLowerCase().replace(/[^ a-zA-Zа-яА-Я0-9-.]/igm, ""));

        const imageIsExists = await checkImageIsExists(filename);
        if (imageIsExists) {
            const splittedFilename = filename.split(".");
            const newfilename = splittedFilename[0] + String(Date.now()) + "." + splittedFilename[1];
            filename = newfilename;
        }

        const res = await saveImageToDB(filename, newTaskId)
        console.log('saveImage res', res);

        if (!!res) {
            const buffer = await image.arrayBuffer();
            const filePath = `${String(process.env.IMAGES_FOLDER)}/${filename}`;
            const imagesFolder = `${String(process.env.IMAGES_FOLDER)}`;
            if (!fs.existsSync(
                imagesFolder
            )) {
                try {
                    await new Promise(res => {
                        fs.mkdir(imagesFolder, { recursive: true }, (err) => {
                            if (err) {
                                console.error('Ошибка при создании папки: err#v43io', err);
                                res(false);
                            } else {
                                res(true);
                            }
                        });
                    });

                } catch (error) {
                    console.error(
                        "err #m4im3",
                        error
                    );
                }
            }

            try {
                fs.writeFileSync(filePath, Buffer.from(buffer));
                console.log('Запись в файл выполнена успешно');
            } catch (error) {
                console.error('Ошибка при записи в файл: error #1n04n: ', error);
            }
        }

    }

    return new Response(
        JSON.stringify({
            success: true,
            task: newTaskId,
        }),
        {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        });
}