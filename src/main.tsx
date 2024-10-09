import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import App from './routes';
import { AuthProvider } from './services/AuthContext'; // Importer votre AuthProvider

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
