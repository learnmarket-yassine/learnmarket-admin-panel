import { Navigate, Outlet } from 'react-router-dom'
import { useStore } from './store/store'

const RequireGuest = () => {
  const auth = useStore((state) => state.auth.authenticationResult)

  if (auth?.token) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
export default RequireGuest
