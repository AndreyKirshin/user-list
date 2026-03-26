import { Loader } from '../../../shared/ui/Loader'
import { UsersSectionWidget } from '../../../widgets/users-list/ui/UsersSectionWidget'
import { useHomeUsers } from '../model/useHomeUsers'

export function HomeFeature() {
  const { isLoading, isError, activeUsers, archivedUsers, archiveUser, activateUser, hideUser } = useHomeUsers()

  return (
    <main className="page page--home">
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
