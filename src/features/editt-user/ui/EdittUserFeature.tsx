import { useNavigate } from 'react-router-dom'
import { Loader } from '../../../shared/ui/Loader'
import { Popup } from '../../../shared/ui/Popup'
import { EditUserFormWidget } from '../../../widgets/edit-user-form/ui/EditUserFormWidget'
import { useEdittUserFeature } from '../model/useEdittUserFeature'
import { ProfilePanel } from './ProfilePanel'

export function EdittUserFeature() {
  const navigate = useNavigate()
  const { isLoading, isError, user, showPopup, setShowPopup, onSubmit } = useEdittUserFeature()

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
          <ProfilePanel avatarUrl={`https://i.pravatar.cc/320?img=${user.id + 10}`} username={user.username} />
          <EditUserFormWidget user={user} onSave={onSubmit} />
        </div>
      )}

      <Popup open={showPopup} title="Изменения сохранены!" onClose={() => setShowPopup(false)} />
    </main>
  )
}
