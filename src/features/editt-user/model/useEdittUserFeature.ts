import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getUsers } from '../../../entities/user/api/usersApi'
import { useUsersStore } from '../../../entities/user/model/useUsersStore'
import type { EditableUser } from '../../../entities/user/model/types'
import type { UserFormData } from '../../edit-user/model/formSchema'

export function useEdittUserFeature() {
  const { userId } = useParams()
  const id = Number(userId)
  const [showPopup, setShowPopup] = useState(false)
  const { mergeUser, saveUser } = useUsersStore()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  const user = useMemo(() => {
    const found = (data ?? []).find((item) => item.id === id)
    return found ? mergeUser(found) : null
  }, [data, id, mergeUser])

  const onSubmit = (formData: UserFormData) => {
    if (!user) {
      return
    }

    saveUser({
      id: user.id,
      ...formData,
    } satisfies EditableUser)
    setShowPopup(true)
  }

  return {
    isLoading,
    isError,
    user,
    showPopup,
    setShowPopup,
    onSubmit,
  }
}
