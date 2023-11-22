import db_connection from "@/app/tools/dbConnect";

export default async function ViewAllEmployees() {
    const employees = await getAllEmployees();
    return <>
        <pre>
            {JSON.stringify(employees, null, 2)}
        </pre>
    </>
}

async function getAllEmployees() {
    return db_connection.promise().query("select * from employees ORDER BY id DESC").then(([x]) => {
        return x;
    })
}