import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../../../entities/user/api/usersApi'
import { useUsersStore } from '../../../entities/user/model/useUsersStore'
import type { EditableUser } from '../../../entities/user/model/types'
import { Loader } from '../../../shared/ui/Loader'
import { Popup } from '../../../shared/ui/Popup'

const schema = z.object({
  name: z.string().min(2).max(64),
  username: z.string().min(2).max(64),
  email: z.email(),
  city: z.string().min(2).max(64),
  phone: z.string().regex(/^\d+$/, 'Только цифры'),
  companyName: z.string().min(2).max(64),
})

type FormData = z.infer<typeof schema>

export function EditUserPage() {
  const navigate = useNavigate()
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

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    values: user
      ? {
          name: user.name,
          username: user.username,
          email: user.email,
          city: user.city,
          phone: user.phone,
          companyName: user.companyName,
        }
      : undefined,
  })

  const onSubmit = (formData: FormData) => {
    if (!user) {
      return
    }

    saveUser({
      id: user.id,
      ...formData,
    } satisfies EditableUser)
    setShowPopup(true)
  }

  return (
    <main className="page">
      <header className="page__header page__header--inline">
        <h1>Редактирование</h1>
        <Link className="btn btn--secondary" to="/">
          На главную
        </Link>
      </header>

      {isLoading && <Loader />}
      {isError && <p>Ошибка загрузки пользователя</p>}
      {!isLoading && !isError && !user && <p>Пользователь не найден</p>}

      {user && (
        <form className="form" onSubmit={form.handleSubmit(onSubmit)}>
          <img className="form__avatar" src={`https://i.pravatar.cc/180?img=${user.id + 10}`} alt={user.username} />

          <label>
            Name
            <input {...form.register('name')} />
            <span>{form.formState.errors.name?.message}</span>
          </label>
          <label>
            Username
            <input {...form.register('username')} />
            <span>{form.formState.errors.username?.message}</span>
          </label>
          <label>
            Email
            <input {...form.register('email')} />
            <span>{form.formState.errors.email?.message}</span>
          </label>
          <label>
            City
            <input {...form.register('city')} />
            <span>{form.formState.errors.city?.message}</span>
          </label>
          <label>
            Phone
            <input
              {...form.register('phone')}
              onChange={(event) => {
                const digits = event.target.value.replace(/\D/g, '')
                form.setValue('phone', digits, { shouldValidate: true })
              }}
            />
            <span>{form.formState.errors.phone?.message}</span>
          </label>
          <label>
            Company Name
            <input {...form.register('companyName')} />
            <span>{form.formState.errors.companyName?.message}</span>
          </label>

          <div className="form__actions">
            <button type="submit" className="btn">
              Сохранить
            </button>
            <button type="button" className="btn btn--secondary" onClick={() => navigate('/')}>
              Отмена
            </button>
          </div>
        </form>
      )}

      <Popup open={showPopup} title="Данные успешно сохранены" onClose={() => setShowPopup(false)} />
    </main>
  )
}
