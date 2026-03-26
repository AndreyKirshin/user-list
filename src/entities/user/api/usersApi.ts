import type { ApiUser } from '../model/types'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

export async function getUsers(): Promise<ApiUser[]> {
  const response = await fetch(USERS_URL)
  if (!response.ok) {
    throw new Error('Не удалось загрузить пользователей')
  }

  const users = (await response.json()) as ApiUser[]
  return users.slice(0, 6)
}
