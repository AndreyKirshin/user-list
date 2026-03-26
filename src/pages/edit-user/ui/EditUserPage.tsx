import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../../../entities/user/api/usersApi'
import { useUsersStore } from '../../../entities/user/model/useUsersStore'
import type { EditableUser } from '../../../entities/user/model/types'
import { Loader } from '../../../shared/ui/Loader'
import { Popup } from '../../../shared/ui/Popup'
import { EditUserFormWidget } from '../../../widgets/edit-user-form/ui/EditUserFormWidget'
import type { UserFormData } from '../../../features/edit-user/model/formSchema'
import { AppRoutes } from '../../../shared/config/routes'

export function EditUserPage() {
  const navigate = useNavigate()
  const { userId } = useParams()
  const id = Number(userId)
  const [showPopup, setShowPopup] = useState(false)
  const { mergeUser, saveUser } = useUsersStore()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  const user = useMemo(() => {
    const found = (data ?? []).find((item) => item.id === id)
    return found ? mergeUser(found) : null
  }, [data, id, mergeUser])

  const onSubmit = (formData: UserFormData) => {
    if (!user) {
      return
    }

    saveUser({
      id: user.id,
      ...formData,
    } satisfies EditableUser)
    setShowPopup(true)
  }

  return (
    <main className="page">
      <header className="page__header page__header--inline">
        <h1>Редактирование</h1>
        <Link className="btn btn--secondary" to={AppRoutes.home}>
          На главную
        </Link>
      </header>

      {isLoading && <Loader />}
      {isError && <p>Ошибка загрузки пользователя</p>}
      {!isLoading && !isError && !user && <p>Пользователь не найден</p>}

      {user && (
        <EditUserFormWidget user={user} onSave={onSubmit} onCancel={() => navigate(AppRoutes.home)} />
      )}

      <Popup open={showPopup} title="Данные успешно сохранены" onClose={() => setShowPopup(false)} />
    </main>
  )
}
