import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <div className="d-flex">
          <Link href="/employees" className='btn btn-sm btn-outline-dark'>Сотрудники</Link>
          <Link href="/login" className='btn btn-sm btn-outline-dark'>Login</Link>
        </div>
        <header className='py-3'>
          <h1>Диспетчер задач</h1>
        </header>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
