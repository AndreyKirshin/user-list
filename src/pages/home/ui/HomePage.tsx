import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../../../entities/user/api/usersApi'
import { useUsersStore } from '../../../entities/user/model/useUsersStore'
import { UserCard } from '../../../entities/user/ui/UserCard'
import { Loader } from '../../../shared/ui/Loader'

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
          <section className="cards-section">
            <h2>Активные</h2>
            <div className="cards-grid">
              {activeUsers.map((user) => (
                <UserCard key={user.id} user={user} onArchive={archiveUser} onHide={hideUser} />
              ))}
            </div>
          </section>

          <section className="cards-section">
            <h2>Архив</h2>
            <div className="cards-grid">
              {archivedUsers.length > 0 ? (
                archivedUsers.map((user) => (
                  <UserCard key={user.id} user={user} archived onActivate={activateUser} />
                ))
              ) : (
                <p>Архив пуст</p>
              )}
            </div>
          </section>
        </>
      )}
    </main>
  )
}
