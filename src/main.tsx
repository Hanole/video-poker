import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter, Routes, Route } from 'react-router'

import './index.css'

import GamePage from './pages/GamePage.tsx'
import RulesPage from './pages/RulesPage.tsx'
import PlayersPage from './pages/PlayersPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route  path='/' element={<GamePage/>} />
        <Route  path='rules' element={<RulesPage/>} />
        <Route  path='players' element={<PlayersPage/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
