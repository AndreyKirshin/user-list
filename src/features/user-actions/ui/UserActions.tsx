import { Link } from 'react-router-dom'
import { AppRoutes } from '../../../shared/config'
import cardStyles from '../../../widgets/user-card/ui/UserCard.module.scss'

type ActiveActionsProps = {
  userId: number
  onArchive: (id: number) => void
  onHide: (id: number) => void
}

type ArchivedActionsProps = {
  userId: number
  onActivate: (id: number) => void
}

export function ActiveUserActions({ userId, onArchive, onHide }: ActiveActionsProps) {
  return (
    <div className={cardStyles['user-card__menu-list']}>
      <Link className={cardStyles['user-card__menu-item']} to={AppRoutes.editUser.replace(':userId', String(userId))}>
        Редактировать
      </Link>
      <button type="button" className={cardStyles['user-card__menu-item']} onClick={() => onArchive(userId)}>
        Архивировать
      </button>
      <button type="button" className={`${cardStyles['user-card__menu-item']}`} onClick={() => onHide(userId)}>
        Скрыть
      </button>
    </div>
  )
}

export function ArchivedUserActions({ userId, onActivate }: ArchivedActionsProps) {
  return (
    <div className={cardStyles['user-card__menu-list']}>
      <button type="button" className={cardStyles['user-card__menu-item']} onClick={() => onActivate(userId)}>
        Активировать
      </button>
    </div>
  )
}
