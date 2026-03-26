# User List

Тестовое SPA-приложение на React с двумя страницами:

- главная со списком пользователей (`Активные` и `Архив`);
- страница редактирования профиля пользователя.

Данные загружаются с `https://jsonplaceholder.typicode.com/users` (первые 6 пользователей).  
Состояние архива/скрытия/локальных правок хранится на клиенте и может сбрасываться после перезагрузки.

## Стек

- `Vite`
- `React` + `TypeScript`
- `React Router v7`
- `Zustand`
- `TanStack Query`
- `React Hook Form` + `Zod`
- `SCSS`

## Скрипты

```bash
npm install
npm run dev
```

Дополнительно:

- `npm run build` — production build
- `npm run preview` — preview собранного приложения
- `npm run lint` — запуск линтера

## Маршруты

- `/` — главная страница со списком пользователей
- `/users/:userId/edit` — страница редактирования пользователя


## Структура проекта (FSD)

