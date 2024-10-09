import './main.css';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/dashboard';
import Conges from './pages/conges/conges';
import Fiches from './pages/fiches/fiches';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/fiches-paie" element={<Fiches/>} />
        <Route path="/conges" element={<Conges/>} />
        <Route path="/compte" element={<div>Mon compte</div>} />
        <Route path="/administration" element={<div>Administration</div>} />
      </Routes>
    </Router>
  );
};

export default App;
