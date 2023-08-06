import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './styles.css'

import { BsCoin } from 'react-icons/bs';
import { FaQuestionCircle } from 'react-icons/fa';
import { RiAccountCircleFill } from 'react-icons/ri';

function Header(props) {
  const player = useSelector((state) => state.player)
  let navigate = useNavigate()
  const { showBack = true, backDisabled = false } = props

  const handleHelpClick = () => {
    props.onHelpClick()
  }

  return (
    <div className='header'>
      <div className='container'>
        <RiAccountCircleFill className='icon' />
        <div className='label'>{player.name}</div>
      </div>
      <div className='container'>
        <BsCoin className='icon' />
        <div className='label'>{player.coins}</div>
      </div>
      <FaQuestionCircle className='help' onClick={handleHelpClick} />
      <div className='header-back-button-container'>
        <button className={showBack ? 'header-back-button' : 'header-back-button back-hidden'} onClick={() => navigate(-1)} disabled={backDisabled}>
          Go Back
        </button>
      </div>
    </div>
  )
}

export default Header