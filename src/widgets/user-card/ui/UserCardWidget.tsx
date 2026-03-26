import type { EditableUser } from '../../../entities/user/model/types'
import { ActiveUserActions, ArchivedUserActions } from '../../../features/user-actions/ui/UserActions'

type UserCardWidgetProps = {
  user: EditableUser
  archived?: boolean
  onArchive?: (id: number) => void
  onActivate?: (id: number) => void
  onHide?: (id: number) => void
}

export function UserCardWidget({
  user,
  archived = false,
  onArchive = () => {},
  onActivate = () => {},
  onHide = () => {},
}: UserCardWidgetProps) {
  const avatarUrl = `https://i.pravatar.cc/160?img=${user.id + 10}`

  return (
    <article className="user-card">
      <img className="user-card__avatar" src={avatarUrl} alt={user.username} />
      <h3 className="user-card__title">{user.username}</h3>
      <p className="user-card__meta">City: {user.city}</p>
      <p className="user-card__meta">Company: {user.companyName}</p>
      {archived ? (
        <ArchivedUserActions userId={user.id} onActivate={onActivate} />
      ) : (
        <ActiveUserActions userId={user.id} onArchive={onArchive} onHide={onHide} />
      )}
    </article>
  )
}
