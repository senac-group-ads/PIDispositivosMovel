import { RouterProvider } from 'react-router-dom'
import './global.css'
import { routes } from './pages/routes'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'

export function App() {
  return (
    <HelmetProvider>
      <Helmet  titleTemplate="%s | Find A Friend" />
      <Toaster duration={1000} closeButton richColors position="top-center"/>
      <RouterProvider router={routes}/>
    </HelmetProvider>
  )
}
