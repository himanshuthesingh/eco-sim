import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ReactSound from 'react-sound'

import RelateTheWords from './components/RelateTheWords'
import BrainyQuest from './components/BrainyQuest'
import CitySaver from './components/CitySaver'
import Welcome from './components/Welcome'
import Admin from './components/Admin'
import Menu from './components/Menu'
import './App.css'

import HomeBgMusic from './assets/sounds/Space_Phonk.mp3'
import BqBgMusic from './assets/sounds/Bassa_Island.mp3'
import CsBgMusic from './assets/sounds/Space_Jazz.mp3'
import RtwBgMusic from './assets/sounds/Hitman.mp3'

import './assets/fonts/Linotte-Bold.otf'
import './assets/fonts/Linotte-Heavy.otf'
import './assets/fonts/Linotte-Light.otf'
import './assets/fonts/Linotte-Regular.otf'
import './assets/fonts/Linotte-SemiBold.otf'
import './assets/fonts/Peace-Sans-Regular.ttf'
import './assets/fonts/scoreboard.ttf'
import './assets/fonts/Improvie.otf'

function App() {
  const [bgMusicStatus, setBgMusicStatus] = useState('STOPPED')
  const screen = useSelector((state) => state.screen)

  let BgMusic = HomeBgMusic
  let volume = 35
  switch (screen.name) {
    case 'Home':
      BgMusic = HomeBgMusic
      volume = 35
      break
    case 'RelateTheWords':
      BgMusic = RtwBgMusic
      volume = 50
      break
    case 'BrainyQuest':
      BgMusic = BqBgMusic
      volume = 50
      break
    case 'CitySaver':
      BgMusic = CsBgMusic
      volume = 70
      break
    default:
      break
  }

  const handleBgMusic = () => {
    if (bgMusicStatus === 'STOPPED') {
      setBgMusicStatus('PLAYING')
    }
  }

  return (
    <div className='App' onClick={handleBgMusic}>
      <ReactSound url={BgMusic} playStatus={bgMusicStatus} playFromPosition={0} volume={volume} autoLoad loop={true} autoPlay />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/RelateTheWords" element={<RelateTheWords />} />
          <Route path="/BrainyQuest" element={<BrainyQuest />} />
          <Route path="/CitySaver" element={<CitySaver />} />
          <Route path="/Admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App