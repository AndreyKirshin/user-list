import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { EditableUser } from '../../../entities/user/model/types'
import { userFormSchema, type UserFormData } from '../../../features/edit-user/model/formSchema'

type EditUserFormWidgetProps = {
  user: EditableUser
  onSave: (data: UserFormData) => void
  onCancel: () => void
}

export function EditUserFormWidget({ user, onSave, onCancel }: EditUserFormWidgetProps) {
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
      <img className="form__avatar" src={`https://i.pravatar.cc/180?img=${user.id + 10}`} alt={user.username} />
      <h2 className="form__title">Данные пользователя</h2>

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
            form.setValue('phone', digits, { shouldValidate: true, shouldDirty: true })
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
        <button type="button" className="btn btn--secondary" onClick={onCancel}>
          Отмена
        </button>
      </div>
    </form>
  )
}
