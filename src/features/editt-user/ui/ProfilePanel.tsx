type ProfilePanelProps = {
  avatarUrl: string
  username: string
}

export function ProfilePanel({ avatarUrl, username }: ProfilePanelProps) {
  return (
    <aside className="profile-panel">
      <img className="profile-panel__avatar" src={avatarUrl} alt={username} />
      <ul className="profile-panel__menu">
        <li className="profile-panel__menu-item profile-panel__menu-item--active">Данные профиля</li>
        <li className="profile-panel__menu-item">Рабочее пространство</li>
        <li className="profile-panel__menu-item">Приватность</li>
        <li className="profile-panel__menu-item">Безопасность</li>
      </ul>
    </aside>
  )
}
