import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './components/Welcome'
import Home from './components/Home'
import City from './components/City'
import Menu from './components/Menu'
import RelateTheWords from './components/RelateTheWords'
import PositionWords from './components/PositionWords'
import './App.css'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/City" element={<City />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/RelateTheWords" element={<RelateTheWords />} />
          <Route path="/PositionWords" element={<PositionWords />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App