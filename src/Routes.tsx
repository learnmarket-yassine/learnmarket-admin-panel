import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/learn-requests" replace />} />
        <Route path="/learn-requests" element={<h1>learn requests</h1>} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
