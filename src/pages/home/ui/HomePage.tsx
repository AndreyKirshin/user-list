import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../../../entities/user/api/usersApi'
import { useUsersStore } from '../../../entities/user/model/useUsersStore'
import { Loader } from '../../../shared/ui/Loader'
import { UsersSectionWidget } from '../../../widgets/users-list/ui/UsersSectionWidget'

export function HomePage() {
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

  return (
    <main className="page">
      <header className="page__header">
        <h1>Пользователи</h1>
      </header>

      {isLoading && <Loader />}
      {isError && <p>Ошибка загрузки пользователей</p>}

      {!isLoading && !isError && (
        <>
          <UsersSectionWidget
            title="Активные"
            users={activeUsers}
            onArchive={archiveUser}
            onHide={hideUser}
            emptyText="Нет активных пользователей"
          />
          <UsersSectionWidget
            title="Архив"
            users={archivedUsers}
            archived
            onActivate={activateUser}
            emptyText="Архив пуст"
          />
        </>
      )}
    </main>
  )
}
