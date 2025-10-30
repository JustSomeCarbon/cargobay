import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Ship } from 'lucide-react'
import './index.css'
import App from './App.tsx'
import ShipPage from './ship/ship.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='mainpageinfo'>
      <Ship size={36} />
      <p>
        Ship files from one place to another without the hassle of
        the cloud.
      </p>
    </div>

    <nav className='navigation'>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/ship' element={<ShipPage />} />
      </Routes>
    </BrowserRouter>
    </nav>
  </StrictMode>,
)
