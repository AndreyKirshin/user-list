import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { EditableUser } from '../../../entities/user/model/types'
import { userFormSchema, type UserFormData } from '../../../features/edit-user'

type EditUserFormWidgetProps = {
  user: EditableUser
  onSave: (data: UserFormData) => void
}

export function EditUserFormWidget({ user, onSave }: EditUserFormWidgetProps) {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      city: user.city,
      phone: user.phone.replace(/\D/g, ''),
      companyName: user.companyName,
    },
  })

  return (
    <form className="form" onSubmit={form.handleSubmit(onSave)}>
      <h2 className="form__title">Данные профиля</h2>
      <div className="form__divider" />

      <label>
        Имя
        <input {...form.register('name')} />
        <span>{form.formState.errors.name?.message}</span>
      </label>
      <label>
        Никнейм
        <input {...form.register('username')} />
        <span>{form.formState.errors.username?.message}</span>
      </label>
      <label>
        Почта
        <input {...form.register('email')} />
        <span>{form.formState.errors.email?.message}</span>
      </label>
      <label>
        Город
        <input {...form.register('city')} />
        <span>{form.formState.errors.city?.message}</span>
      </label>
      <label>
        Телефон
        <input
          {...form.register('phone')}
          onChange={(event) => {
            const digits = event.target.value.replace(/\D/g, '')
            form.setValue('phone', digits, { shouldValidate: true, shouldDirty: true })
          }}
        />
        <span>{form.formState.errors.phone?.message}</span>
      </label>
      <label>
        Название компании
        <input {...form.register('companyName')} />
        <span>{form.formState.errors.companyName?.message}</span>
      </label>

      <div className="form__actions">
        <button type="submit" className="btn btn--dark">
          Сохранить
        </button>
      </div>
    </form>
  )
}
