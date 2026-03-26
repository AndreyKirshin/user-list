import { useEffect } from 'react'

type PopupProps = {
  open: boolean
  title: string
  onClose: () => void
}

export function Popup({ open, title, onClose }: PopupProps) {
  useEffect(() => {
    if (!open) {
      return
    }

    const timeoutId = window.setTimeout(onClose, 4000)
    return () => window.clearTimeout(timeoutId)
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div className="popup-overlay" onClick={onClose} role="presentation">
      <div className="popup" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="popup__close" onClick={onClose} aria-label="Закрыть">
          x
        </button>
        <div className="popup__icon" aria-hidden="true">
          <span>✓</span>
        </div>
        <p className="popup__text">{title}</p>
      </div>
    </div>
  )
}
