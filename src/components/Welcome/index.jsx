import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'
import { setName } from '../../store/player/actions'
import { setScreen } from '../../store/screen/actions'
import options from './particlesConfig'
import './styles.css'

function Welcome() {
  const player = useSelector((state) => state.player)
  const screen = useSelector((state) => state.screen)
  const [playerName, setPlayer] = useState(player.name)
  const dispatch = useDispatch()
  let navigate = useNavigate()
  
  useEffect(() => {
    if (screen !== 'Home') {
      dispatch(setScreen('Home'))
    }
  }, [])

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine)
  }, [])
  
  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(setName(playerName))
    navigate('/Menu')
  }

  return (
    <div className='welcome-bg'>
      <Particles id='welcome-particles' loaded={() => {}} init={particlesInit} options={options} />
      <div className='welcomePage'>
        <div className='welcome-text'>Welcome To</div>
        <div className='welcome-title'>Eco-Sim</div>
        <input 
          className='welcome-input' 
          value={playerName} 
          placeholder='Enter Your Name'
          onChange={(event) => setPlayer(event.target.value)} 
          spellCheck={false}
        />
        <button className='submit' type='submit' onClick={handleSubmit} disabled={playerName === ''}>Play</button>
      </div>
    </div>
  )
}

export default Welcome