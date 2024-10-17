import './main.css';
import Login from './pages/login/Login';
import Conges from './pages/conges/conges';
import Fiches from './pages/fiches/fiches';
import CreateUser from './pages/admin/createUser/createUser';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'; 
import { AuthProvider, useAuth } from './services/AuthContext'; 
import { useEffect } from 'react';

const AppRoutes: React.FC = () => {
  const { user, logout, isTokenExpired } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token || isTokenExpired()) {
      logout();
      navigate('/login');
    }
  }, [navigate, logout, isTokenExpired]);

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Navigate to="/fiches-paie" />} />
          <Route path="/fiches-paie" element={<Fiches />} />
          <Route path="/conges" element={<Conges />} />
          <Route path="/compte" element={<div>Mon compte</div>} />
          <Route path="/administration" element={<CreateUser/>} />
          <Route path="*" element={<Navigate to="/fiches-paie" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;
