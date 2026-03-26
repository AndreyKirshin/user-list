import { useEffect, useRef, useState } from 'react'
import type { EditableUser } from '../../../entities/user/model/types'
import { ActiveUserActions, ArchivedUserActions } from '../../../features/user-actions'
import styles from './UserCard.module.scss'

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
  const [menuOpen, setMenuOpen] = useState(false)
  const cardRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!cardRef.current?.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <article ref={cardRef} className={`${styles['user-card']} ${archived ? styles['user-card--archived'] : ''}`}>
      <img className={styles['user-card__avatar']} src={avatarUrl} alt={user.username} />
      <div className="user-card__content">
        <div className={styles['user-card__head']}>
          <h3 className={styles['user-card__title']}>{user.username}</h3>
          <div className={styles['user-card__menu']}>
            <button
              type="button"
              className={styles['user-card__menu-button']}
              aria-label="Действия с пользователем"
              onClick={() => setMenuOpen((value) => !value)}
            >
              &#8942;
            </button>
            {menuOpen &&
              (archived ? (
                <ArchivedUserActions userId={user.id} onActivate={onActivate} />
              ) : (
                <ActiveUserActions userId={user.id} onArchive={onArchive} onHide={onHide} />
              ))}
          </div>
        </div>
        <p className={styles['user-card__company']}>{user.companyName}</p>
        <p className={styles['user-card__city']}>{user.city}</p>
      </div>
    </article>
  )
}
