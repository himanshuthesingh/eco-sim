import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReactSound from 'react-sound'
import Welcome from './components/Welcome'
import CitySaver from './components/CitySaver'
import Menu from './components/Menu'
import RelateTheWords from './components/RelateTheWords'
import BrainyQuest from './components/BrainyQuest'
import BgMusic from './assets/sounds/Space_Phonk.mp3'
import './App.css'

import './assets/fonts/Linotte-Bold.otf'
import './assets/fonts/Linotte-Heavy.otf'
import './assets/fonts/Linotte-Light.otf'
import './assets/fonts/Linotte-Regular.otf'
import './assets/fonts/Linotte-SemiBold.otf'
import './assets/fonts/Improvie.otf'
import './assets/fonts/Peace-Sans-Regular.ttf'
import './assets/fonts/scoreboard.ttf'

function App() {
  const [bgMusicStatus, setBgMusicStatus] = useState('PAUSED')

  const handleBgMusic = () => {
    if (bgMusicStatus === 'PAUSED') {
      setBgMusicStatus('PLAYING')
    }
  }

  return (
    <div className='App' onFocus={handleBgMusic} onClick={handleBgMusic}>
      <ReactSound url={BgMusic} playStatus={bgMusicStatus} autoLoad loop autoPlay />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/CitySaver" element={<CitySaver />} />
          <Route path="/RelateTheWords" element={<RelateTheWords />} />
          <Route path="/BrainyQuest" element={<BrainyQuest />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App