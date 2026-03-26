import { useNavigate } from 'react-router-dom'
import { Loader } from '../../../shared/ui/Loader'
import { Popup } from '../../../shared/ui/Popup'
import { EditUserFormWidget } from '../../../widgets/edit-user-form/ui/EditUserFormWidget'
import { useEdittUserFeature } from '../model/useEdittUserFeature'
import { ProfilePanel } from './ProfilePanel'
import pageStyles from '../../../pages/home/ui/Page.module.scss'
import layoutStyles from './EdittUserLayout.module.scss'

export function EdittUserFeature() {
  const navigate = useNavigate()
  const { isLoading, isError, user, showPopup, setShowPopup, onSubmit } = useEdittUserFeature()

  return (
    <main className={`${pageStyles['page']} ${pageStyles['page--edit']}`}>
      <button type="button" className={layoutStyles['back-link']} onClick={() => navigate(-1)}>
        <span aria-hidden="true">&#8592;</span> Назад
      </button>

      {isLoading && <Loader />}
      {isError && <p>Ошибка загрузки пользователя</p>}
      {!isLoading && !isError && !user && <p>Пользователь не найден</p>}

      {user && (
        <div className={layoutStyles['edit-layout']}>
          <ProfilePanel avatarUrl={`https://i.pravatar.cc/320?img=${user.id + 10}`} username={user.username} />
          <EditUserFormWidget user={user} onSave={onSubmit} />
        </div>
      )}

      <Popup open={showPopup} title="Изменения сохранены!" onClose={() => setShowPopup(false)} />
    </main>
  )
}
