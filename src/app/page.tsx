import 'bootstrap/dist/css/bootstrap.min.css';
import { pool } from './tools/dbConnect';
import Dashboard from '@/components/dashboard/dashboard';

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
      <Dashboard />
    </main>
  )
}
