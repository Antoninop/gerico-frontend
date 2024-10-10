import './main.css';
import Login from './pages/login/Login';
import Conges from './pages/conges/conges';
import Fiches from './pages/fiches/fiches';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import { useAuth } from './services/AuthContext'; 

const App: React.FC = () => {
  const { user } = useAuth(); 

  return (
    <Router>
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Navigate to="/fiches-paie" />} />
            <Route path="/fiches-paie" element={<Fiches />} />
            <Route path="/conges" element={<Conges />} />
            <Route path="/compte" element={<div>Mon compte</div>} />
            <Route path="/administration" element={<div>Administration</div>} />
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
    </Router>
  );
};

export default App;
