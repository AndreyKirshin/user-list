import { Link } from 'react-router-dom'
import type { EditableUser } from '../model/types'

type UserCardProps = {
  user: EditableUser
  archived?: boolean
  onArchive?: (id: number) => void
  onActivate?: (id: number) => void
  onHide?: (id: number) => void
}

export function UserCard({ user, archived = false, onArchive, onActivate, onHide }: UserCardProps) {
  const avatarUrl = `https://i.pravatar.cc/160?img=${user.id + 10}`

  return (
    <article className="user-card">
      <img className="user-card__avatar" src={avatarUrl} alt={user.username} />
      <h3>{user.username}</h3>
      <p>Город: {user.city}</p>
      <p>Компания: {user.companyName}</p>
      <div className="user-card__actions">
        <Link className="btn btn--secondary" to={`/users/${user.id}/edit`}>
          Редактировать
        </Link>
        {archived ? (
          <button type="button" className="btn" onClick={() => onActivate?.(user.id)}>
            Сделать активным
          </button>
        ) : (
          <>
            <button type="button" className="btn" onClick={() => onArchive?.(user.id)}>
              Архивировать
            </button>
            <button type="button" className="btn btn--danger" onClick={() => onHide?.(user.id)}>
              Скрыть
            </button>
          </>
        )}
      </div>
    </article>
  )
}
