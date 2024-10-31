import { RouterProvider } from 'react-router-dom'
import './global.css'
import { routes } from './pages/routes'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'

export function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster duration={1000} closeButton richColors position="top-center"/>
        <RouterProvider router={routes}/>
      </QueryClientProvider>
      <Helmet  titleTemplate="%s | Find A Friend" />
    </HelmetProvider>
  )
}
