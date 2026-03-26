import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../../../entities/user/api/usersApi'
import { useUsersStore } from '../../../entities/user/model/useUsersStore'
import type { EditableUser } from '../../../entities/user/model/types'
import { Loader } from '../../../shared/ui/Loader'
import { Popup } from '../../../shared/ui/Popup'
import { EditUserFormWidget } from '../../../widgets/edit-user-form/ui/EditUserFormWidget'
import type { UserFormData } from '../../../features/edit-user/model/formSchema'

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
    <main className="page page--edit">
      <button type="button" className="back-link" onClick={() => navigate(-1)}>
        <span aria-hidden="true">&#8592;</span> Назад
      </button>

      {isLoading && <Loader />}
      {isError && <p>Ошибка загрузки пользователя</p>}
      {!isLoading && !isError && !user && <p>Пользователь не найден</p>}

      {user && (
        <div className="edit-layout">
          <aside className="profile-panel">
            <img
              className="profile-panel__avatar"
              src={`https://i.pravatar.cc/320?img=${user.id + 10}`}
              alt={user.username}
            />
            <ul className="profile-panel__menu">
              <li className="profile-panel__menu-item profile-panel__menu-item--active">Данные профиля</li>
              <li className="profile-panel__menu-item">Рабочее пространство</li>
              <li className="profile-panel__menu-item">Приватность</li>
              <li className="profile-panel__menu-item">Безопасность</li>
            </ul>
          </aside>
          <EditUserFormWidget user={user} onSave={onSubmit} />
        </div>
      )}

      <Popup open={showPopup} title="Данные успешно сохранены" onClose={() => setShowPopup(false)} />
    </main>
  )
}
