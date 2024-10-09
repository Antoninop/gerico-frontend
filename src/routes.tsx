import './main.css';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/dashboard';
import Conges from './pages/conges/conges';
import Fiches from './pages/fiches/fiches';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import { useAuth } from './services/AuthContext'; 

const App: React.FC = () => {
  const { user } = useAuth(); // Get the user state from the auth context

  return (
    <Router>
      <Routes>
        {/* If user is logged in, show the main app routes */}
        {user ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/fiches-paie" element={<Fiches />} />
            <Route path="/conges" element={<Conges />} />
            <Route path="/compte" element={<div>Mon compte</div>} />
            <Route path="/administration" element={<div>Administration</div>} />
            {/* Add a catch-all redirect for unknown routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            {/* Redirect any unknown routes to Login */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
