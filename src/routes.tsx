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
import { useEffect, useState } from 'react';

const AppRoutes: React.FC = () => {
  const { user, logout, isTokenExpired } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const timeoutId = setTimeout(() => setShowLoading(true), 3000);

    if (!token || isTokenExpired()) {
      logout();
      setLoading(false);
      navigate('/login');
    } else {
      setLoading(false);
    }

    return () => clearTimeout(timeoutId); 
  }, [navigate, logout, isTokenExpired, location.pathname]);

  if (loading) {
    return showLoading ? <div>Chargement en cours...</div> : null;
  }

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Navigate to="/fiches-paie" />} />
          <Route path="/fiches-paie" element={<Fiches />} />
          <Route path="/conges" element={<Conges />} />
          <Route path="/compte" element={<div>Mon compte</div>} />
          <Route path="/administration" element={<Admin />} />
          <Route path="*" element={<div>Page non trouvée</div>} /> 
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/requete-motdepasse" element={<ForgotPassword />} />
          <Route path="/confirmation-renit" element={<PasswordRequest />} />
          <Route path="/nouveau-motdepasse" element={<NewPassword />} />
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
