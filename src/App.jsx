








import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import NavBar from './Component/NavBar'
import Home from './Component/Home'
import CreateInvoice from './Main Section/CreateInvoice'

function AppWrapper() {
  const location = useLocation()

  // Only show NavBar if not on the invoice page
  const showNavBar = location.pathname !== '/invoice'

  return (
    <>
      {showNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invoice" element={<CreateInvoice />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  )
}

export default App


