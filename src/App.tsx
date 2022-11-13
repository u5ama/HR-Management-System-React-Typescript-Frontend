import { Routes, Route, Navigate } from 'react-router-dom';
import NotFound from '@pages/dashboard/404';
import LoginPage from '@pages/login';
import Dashboard from '@pages/dashboard';
import DashboardHome from '@pages/dashboard/home';
import DashboardStaff from '@pages/dashboard/staff';
import DashboardAddStaff from '@pages/dashboard/staff/add';
import DashboardEmployee from '@pages/dashboard/staff/[id]';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="home" element={<DashboardHome />} />
        <Route path="staff" element={<DashboardStaff />} />
        <Route path="staff/:id" element={<DashboardEmployee />} />
        <Route path="staff/add" element={<DashboardAddStaff />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
