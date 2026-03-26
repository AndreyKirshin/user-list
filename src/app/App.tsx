import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { HomePage } from '../pages/home/ui/HomePage'
import { EditUserPage } from '../pages/edit-user/ui/EditUserPage'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/users/:userId/edit',
    element: <EditUserPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
