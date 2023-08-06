import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Common/Header'
import Modal from '../Common/Modal'
import './styles.css'

function Home() {
  let navigate = useNavigate()
  const [ showHelp, setShowHelp ] = useState(false)
  
  return (
    <div>
      <Modal title='Instructions' isOpen={showHelp} onClose={() => setShowHelp(false)}>
        <p>Welome to Eco-Sim</p>
        <p>Play some mini games and earn coins</p>
        <p>Use them wisely to maintain your city</p>
        <p>The city is in need of Sustainable Development</p>
        <p>And only you can do it !!</p>
      </Modal>
      <Header onHelpClick={() => setShowHelp(true)} backDisabled={showHelp} showBack={false} />
      <div className='content'>
        <div className='section' onClick={() => navigate('/Menu')}>
          <div className='option'>Play Mini Games</div>
        </div>
        <div className='section' onClick={() => navigate('/City')}>
          <div className='option'>Your City</div>
        </div>
      </div>
    </div>
  )
}

export default Home