import type { EditableUser } from '../../../entities/user/model/types'
import { UserCardWidget } from '../../user-card/ui/UserCardWidget'

type UsersSectionWidgetProps = {
  title: string
  users: EditableUser[]
  archived?: boolean
  onArchive?: (id: number) => void
  onActivate?: (id: number) => void
  onHide?: (id: number) => void
  emptyText: string
}

export function UsersSectionWidget({
  title,
  users,
  archived = false,
  onArchive,
  onActivate,
  onHide,
  emptyText,
}: UsersSectionWidgetProps) {
  return (
    <section className="cards-section">
      <div className="cards-section__head">
        <h2>{title}</h2>
      </div>
      <div className="cards-grid">
        {users.length === 0 ? (
          <p className="cards-section__empty">{emptyText}</p>
        ) : (
          users.map((user) => (
            <UserCardWidget
              key={user.id}
              user={user}
              archived={archived}
              onArchive={onArchive}
              onActivate={onActivate}
              onHide={onHide}
            />
          ))
        )}
      </div>
    </section>
  )
}
