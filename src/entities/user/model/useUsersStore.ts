import { create } from 'zustand'
import type { ApiUser, EditableUser, UserOverrides } from './types'

type UsersState = {
  archivedIds: number[]
  hiddenIds: number[]
  overridesById: Record<number, UserOverrides>
  archiveUser: (id: number) => void
  activateUser: (id: number) => void
  hideUser: (id: number) => void
  saveUser: (user: EditableUser) => void
  mergeUser: (user: ApiUser) => EditableUser
}

const toEditableUser = (user: ApiUser): EditableUser => ({
  id: user.id,
  name: user.name,
  username: user.username,
  email: user.email,
  city: user.address.city,
  phone: user.phone,
  companyName: user.company.name,
})

export const useUsersStore = create<UsersState>((set, get) => ({
  archivedIds: [],
  hiddenIds: [],
  overridesById: {},
  archiveUser: (id) =>
    set((state) => ({
      archivedIds: state.archivedIds.includes(id) ? state.archivedIds : [...state.archivedIds, id],
    })),
  activateUser: (id) =>
    set((state) => ({
      archivedIds: state.archivedIds.filter((item) => item !== id),
    })),
  hideUser: (id) =>
    set((state) => ({
      hiddenIds: state.hiddenIds.includes(id) ? state.hiddenIds : [...state.hiddenIds, id],
    })),
  saveUser: (user) =>
    set((state) => ({
      overridesById: {
        ...state.overridesById,
        [user.id]: {
          name: user.name,
          username: user.username,
          email: user.email,
          city: user.city,
          phone: user.phone,
          companyName: user.companyName,
        },
      },
    })),
  mergeUser: (user) => {
    const editable = toEditableUser(user)
    const override = get().overridesById[user.id]

    if (!override) {
      return editable
    }

    return {
      ...editable,
      ...override,
    }
  },
}))
