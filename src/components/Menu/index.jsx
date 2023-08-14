import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bounce } from 'react-awesome-reveal'
import Header from '../Common/Header'
import Modal from '../Common/Modal'
import './styles.css'

function Menu() {
  let navigate = useNavigate()
  const [showHelp, setShowHelp] = useState(false)

  return (
    <div>
      <Modal
        title='About'
        isOpen={showHelp}
        btnTitle={'Close'}
        onBtnClick={() => setShowHelp(false)}
        altBtn={false}
        altBtnTitle={''}
        onAltBtnClick={() => { }}
      >
        <p>Eco-Sim is a Triad of Game</p>
        <p>That help you Learn</p>
        <p>While you have Fun</p>
        <p>Happy Gaming !!</p>
      </Modal>
      <Header onHelpClick={() => setShowHelp(true)} />
      <div className='menu-content'>
        <Bounce direction='left' delay={50} cascade triggerOnce >
          <div className='menu-section menu-item-1' onClick={() => navigate('/RelateTheWords')}>
            <div className='menu-option'>Relate The Words</div>
          </div>
          <div className='menu-section menu-item-2' onClick={() => navigate('/BrainyQuest')}>
            <div className='menu-option'>Brainy Quest</div>
          </div>
          <div className='menu-section menu-item-3' onClick={() => navigate('/CitySaver')}>
            <div className='menu-option'>City Saver</div>
          </div>
        </Bounce>
      </div>
    </div>
  )
}

export default Menu