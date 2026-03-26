import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../../../entities/user/api/usersApi'
import { useUsersStore } from '../../../entities/user/model/useUsersStore'

export function useHomeUsers() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  const { archivedIds, hiddenIds, archiveUser, activateUser, hideUser, mergeUser } = useUsersStore()

  const mappedUsers = useMemo(() => (data ?? []).map(mergeUser), [data, mergeUser])

  const activeUsers = mappedUsers.filter(
    (user) => !archivedIds.includes(user.id) && !hiddenIds.includes(user.id),
  )
  const archivedUsers = mappedUsers.filter((user) => archivedIds.includes(user.id) && !hiddenIds.includes(user.id))

  return {
    isLoading,
    isError,
    activeUsers,
    archivedUsers,
    archiveUser,
    activateUser,
    hideUser,
  }
}
