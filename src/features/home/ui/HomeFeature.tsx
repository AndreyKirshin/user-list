import { Loader } from '../../../shared/ui'
import { UsersSectionWidget } from '../../../widgets/users-list'
import { useHomeUsers } from '../model/useHomeUsers'
import pageStyles from '../../../pages/home/ui/Page.module.scss'

export function HomeFeature() {
  const { isLoading, isError, activeUsers, archivedUsers, archiveUser, activateUser, hideUser } = useHomeUsers()

  return (
    <main className={pageStyles['page']}>
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
