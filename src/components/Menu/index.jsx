import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Common/Header'
import Modal from '../Common/Modal'
import './styles.css'

function Menu () {
  let navigate = useNavigate()
  const [ showHelp, setShowHelp ] = useState(false)

  return (
    <div>
      <Modal title='Mini Games' isOpen={showHelp} onClose={() => setShowHelp(false)}>
        <p>We have 2 different games here</p>
        <p>Play them to earn coins</p>
        <p>Happy Gaming !!</p>
      </Modal>
      <Header onHelpClick={() => setShowHelp(true)} backDisabled={showHelp} />
      <div className='menu-content'>
        <div className='menu-section' onClick={() => navigate('/RelateTheWords')}>
          <div className='menu-option'>Relate The Words</div>
        </div>
        <div className='menu-section' onClick={() => navigate('/PositionWords')}>
          <div className='menu-option'>Position Words</div>
        </div>
      </div>
    </div>
  )
}

export default Menu