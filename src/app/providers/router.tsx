import { createBrowserRouter, Navigate } from 'react-router-dom'
import { HomePage } from '../../pages/home'
import { EditUserPage } from '../../pages/edit-user'
import { AppRoutes } from '../../shared/config'

export const router = createBrowserRouter([
  {
    path: AppRoutes.home,
    element: <HomePage />,
  },
  {
    path: AppRoutes.editUser,
    element: <EditUserPage />,
  },
  {
    path: '*',
    element: <Navigate to={AppRoutes.home} replace />,
  },
])
