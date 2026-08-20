import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'
import PersistLogin from './PersistLogin'
import LoginLayout from './features/auth/components/layout/LoginLayout'
import LoginPage from './pages/LoginPage'
import RequireAuth from './RequireAuth'
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route
          path="login"
          element={
            <LoginLayout>
              <LoginPage />
            </LoginLayout>
          }
        ></Route>
      </Route>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/learn-requests" replace />} />
          <Route element={<RequireAuth />}>
            <Route path="/learn-requests" element={<h1>learn requests</h1>} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
