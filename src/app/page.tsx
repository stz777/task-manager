import 'bootstrap/dist/css/bootstrap.min.css';
import { pool } from './tools/dbConnect';
import CreateProjectForm from './tools/createProjectForm';

export interface Project {
  id: number
  title: string
}

export interface Task {
  id: number
  description: string
  title: string
  column_id: number
  project_id: number
}

export default async function Home() {

  return (
    <main>
      <h1>Главная</h1>
      <CreateProjectForm />

    </main>
  )
}



export async function getColumns(): Promise<any> {
  return await new Promise(
    r => pool.query(
      `SELECT id, title FROM columns`,
      function (err, res) {
        if (err) {
          console.log('err #cn4b7vdD', err);
        }
        r(res);
      }
    )
  )
}


export async function getProjects(): Promise<Project[]> {
  return await new Promise(
    r => pool.query(
      `SELECT * FROM projects`,
      function (err, res: Project[]) {
        if (err) {
          console.log('err #nv3nbyock', err);
        }
        r(res);
      }
    )
  )
}


export async function getTasks(projectId: number): Promise<Task[]> {
  return await new Promise(
    r => pool.query(
      `SELECT * FROM tasks WHERE project_id = ${projectId}`,
      function (err, res: Task[]) {
        if (err) {
          console.log('err #22m4m6n', err);
        }
        r(res);
      }
    )
  )
}


// import Image from 'next/image'
// import styles from './page.module.css'

// export default function Home() {
//   return (
//     <main className={styles.main}>
//       <div className={styles.description}>
//         <p>
//           Get started by editing&nbsp;
//           <code className={styles.code}>src/app/page.tsx</code>
//         </p>
//         <div>
//           <a
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{' '}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className={styles.vercelLogo}
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className={styles.center}>
//         <Image
//           className={styles.logo}
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//       <div className={styles.grid}>
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2>
//             Docs <span>-&gt;</span>
//           </h2>
//           <p>Find in-depth information about Next.js features and API.</p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2>
//             Learn <span>-&gt;</span>
//           </h2>
//           <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2>
//             Templates <span>-&gt;</span>
//           </h2>
//           <p>Explore the Next.js 13 playground.</p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2>
//             Deploy <span>-&gt;</span>
//           </h2>
//           <p>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   )
// }
