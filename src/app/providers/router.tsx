import { createBrowserRouter, Navigate } from 'react-router-dom'
import { HomePage } from '../../pages/home/ui/HomePage'
import { EditUserPage } from '../../pages/edit-user/ui/EditUserPage'
import { AppRoutes } from '../../shared/config/routes'

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
