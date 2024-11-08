import './main.css';
import Login from './pages/login/Login';
import Conges from './pages/conges/conges';
import Fiches from './pages/fiches/fiches';
import Admin from './pages/admin/admin';
import ForgotPassword from './pages/login/ForgotPassword/ForgotPassword';
import PasswordRequest from './pages/login/PasswordRequest/PasswordRequest';
import NewPassword from './pages/login/NewPassword/NewPassword';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'; 
import { useAuth } from './services/AuthContext'; 
import { useEffect } from 'react';

const AppRoutes: React.FC = () => {
  const { user, logout, isTokenExpired } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    
    const isPublicRoute = ['/login', '/requete-motdepasse','/confirmation-renit' , '/nouveau-motdepasse'].includes(location.pathname);    
    if (!isPublicRoute && (!token || isTokenExpired())) {
      logout();
      navigate('/login');
    }
  }, [navigate, logout, isTokenExpired, location.pathname]);

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Navigate to="/fiches-paie" />} />
          <Route path="/fiches-paie" element={<Fiches />} />
          <Route path="/conges" element={<Conges />} />
          <Route path="/compte" element={<div>Mon compte</div>} />
          <Route path="/administration" element={<Admin />} />
          <Route path="*" element={<Navigate to="/fiches-paie" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/requete-motdepasse" element={<ForgotPassword />} />
          <Route path="/confirmation-renit" element={<PasswordRequest/>}/>
          <Route path="/nouveau-motdepasse" element={<NewPassword/>}/>
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
