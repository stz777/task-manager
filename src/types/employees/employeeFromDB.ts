export interface EmployeeFromDB {
  id: number
  created_date: any
  is_active: boolean | 1 | 0
  username: string
  telegram_id: string
  tg_chat_id: string
  contacts: string
  role: string
}