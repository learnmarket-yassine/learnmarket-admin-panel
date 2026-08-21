import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'
import PersistLogin from './PersistLogin'
import LoginPage from './pages/LoginPage'
import RequireAuth from './RequireAuth'
import ResetPasswordPage from './pages/ResetPasswordPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import VerifCodePage from './pages/verifCodePage'
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="verif-code" element={<VerifCodePage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
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
