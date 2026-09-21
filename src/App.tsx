import './App.css'

import { Link, Outlet } from 'react-router';

export default function App() {

  return (
    <>
      <nav className='navigation-bar'>
        <Link to="/">Spill</Link>
        <Link to="/players">Players</Link>
        <Link to="/rules">Rules</Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  )
}
