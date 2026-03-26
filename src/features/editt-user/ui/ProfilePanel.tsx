import panelStyles from './ProfilePanel.module.scss'

type ProfilePanelProps = {
  avatarUrl: string
  username: string
}

export function ProfilePanel({ avatarUrl, username }: ProfilePanelProps) {
  return (
    <aside className={panelStyles['profile-panel']}>
      <img className={panelStyles['profile-panel__avatar']} src={avatarUrl} alt={username} />
      <ul className={panelStyles['profile-panel__menu']}>
        <li className={`${panelStyles['profile-panel__menu-item']} ${panelStyles['profile-panel__menu-item--active']}`}>Данные профиля</li>
        <li className={panelStyles['profile-panel__menu-item']}>Рабочее пространство</li>
        <li className={panelStyles['profile-panel__menu-item']}>Приватность</li>
        <li className={panelStyles['profile-panel__menu-item']}>Безопасность</li>
      </ul>
    </aside>
  )
}
