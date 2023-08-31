import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './styles.css'

import { TiArrowBack } from 'react-icons/ti'
import { FaQuestionCircle } from 'react-icons/fa'
import { RiAccountCircleFill } from 'react-icons/ri'

function Header(props) {
  const player = useSelector((state) => state.player)
  let navigate = useNavigate()

  const handleHelpClick = () => {
    props.onHelpClick()
  }

  return (
    <div className='header'>
      <div className='header-item'>
        <RiAccountCircleFill className='header-icon' />
        <div className='header-name'>{props.admin ? 'Admin' : player.name}</div>
      </div>
      <FaQuestionCircle className='header-icon header-btn' onClick={handleHelpClick} />
      <TiArrowBack className='header-icon header-btn' onClick={() => navigate(-1)} />
    </div>
  )
}

export default Header