import { RouterProvider } from 'react-router-dom'
import './global.css'
import { routes } from './pages/routes'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export function App() {
  return (
    <HelmetProvider>
      <Helmet  titleTemplate="%s | Find A Friend" />
      <RouterProvider router={routes}/>
    </HelmetProvider>
  )
}
