import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setName } from '../../store/player/actions'
import './styles.css'

function Welcome() {
  const player = useSelector((state) => state.player)
  const [playerName, setPlayer] = useState(player.name)
  const dispatch = useDispatch()
  let navigate = useNavigate()

  useEffect(() => {
    if (player.name !== '') {
      navigate('/Home')
    }
  },[])

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(setName(playerName))
    navigate('/Home')
  }

  return (
    <div className='welcomePage'>
      <div className='primary-heading'>Welcome to Eco-Sim</div>
      <div className='secondary-heading'>Please Enter Your Name</div>
      <input className='input' value={playerName} onChange={(event) => setPlayer(event.target.value)} />
      <button className='submit' type='submit' onClick={handleSubmit} disabled={playerName === ''}>Play</button>
    </div>
  )
}

export default Welcome