import { useEffect } from 'react'
import styles from './Popup.module.scss'

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
    <div className={styles['popup-overlay']} onClick={onClose} role="presentation">
      <div className={styles['popup']} onClick={(event) => event.stopPropagation()}>
        <button type="button" className={styles['popup__close']} onClick={onClose} aria-label="Закрыть">
          x
        </button>
        <div className={styles['popup__icon']} aria-hidden="true">
          <span>✓</span>
        </div>
        <p className={styles['popup__text']}>{title}</p>
      </div>
    </div>
  )
}
