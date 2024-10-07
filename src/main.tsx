import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import Login from './pages/login/Login'
import Dashboard from './pages/dashboard/dashboard'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>
      <Dashboard></Dashboard>
    </div>
  </StrictMode>
)
