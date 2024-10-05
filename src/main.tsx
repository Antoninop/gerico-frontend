import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import Navbar from './components/navbar/Navbar'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar></Navbar>
    <h1>Hey</h1>
  </StrictMode>,
)
