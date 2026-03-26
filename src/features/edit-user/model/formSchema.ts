import { z } from 'zod'

export const userFormSchema = z.object({
  name: z.string().min(2, 'Имя должно быть от 2 до 64 символов').max(64, 'Имя должно быть от 2 до 64 символов'),
  username: z
    .string()
    .min(2, 'Никнейм должен быть от 2 до 64 символов')
    .max(64, 'Никнейм должен быть от 2 до 64 символов'),
  email: z.email('Введите корректную почту'),
  city: z.string().min(2, 'Город должен быть от 2 до 64 символов').max(64, 'Город должен быть от 2 до 64 символов'),
  phone: z.string().regex(/^\d+$/, 'Телефон: только цифры'),
  companyName: z
    .string()
    .min(2, 'Название компании должно быть от 2 до 64 символов')
    .max(64, 'Название компании должно быть от 2 до 64 символов'),
})

export type UserFormData = z.infer<typeof userFormSchema>
