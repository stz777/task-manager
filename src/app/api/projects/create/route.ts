import {pool} from '@/app/tools/dbConnect';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const project = await request.json();

    if (!project.title) {
        return NextResponse.json({
            success: false,
            err: "#dm32mcs09"
        });
    }

    const newProject = await createProject(project.title);

    return NextResponse.json({
        success: true,
        newProject
    });
   
}

async function createProject(title: string) {
    return await new Promise(r => {
        const qs = `INSERT INTO projects (title) VALUES (?)`;
        const values = [title];
        pool.query(qs, values, function (err, res: any) {
            if (err) { console.log('err #c9c6f3bnNn', err) }
            console.log(res);

            r(res.insertId);
        })
    });
}