import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCoins } from '../../store/player/actions'
import { setCityLevel } from '../../store/city/actions'
import Header from '../Common/Header'
import Modal from '../Common/Modal'
import './styles.css'

const helpContent = <>
  <p>Welome to your City</p>
  <p>Here you will be spending coins</p>
  <p>to fulfill your city's needs</p>
  <p>by buying and building</p>
  <p>This will also level up your City</p>
  <p>Happy Building !!</p>
</>

const levelUpContent = (level) => {
  return (
    <>
      <p>Your city has been</p>
      <p>upgraded to Level {level}</p>
      <p>Great Job !!</p>
    </>
  )
}

const lowCoinContent = (coins) => {
  return (
    <>
      <p>You need {coins} more coins.</p>
      <p>Play mini games to earn more!</p>
    </>
  )
}

function City() {
  const player = useSelector((state) => state.player)
  const city = useSelector((state) => state.city)
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const [modalTitle, setModalTitle] = useState('')
  const dispatch = useDispatch()

  const objective = 'Provide food for the citizens who are in need..!!'
  const price = 10

  const handleBuyClick = () => {
    const newCityLevel = city.level + 1
    const currentCoins = player.coins
    if (player.coins >= price) {
      dispatch(setCityLevel(newCityLevel))
      dispatch(setCoins(currentCoins - price))
      handleShowModal('Congratulations !!', levelUpContent(newCityLevel))
    }
    else {
      handleShowModal('Low Balance !!', lowCoinContent(price - currentCoins))
    }
  }

  const handleShowModal = (title, content) => {
    setModalTitle(title)
    setModalContent(content)
    setShowModal(true)
  }

  return (
    <div>
      <Modal title={modalTitle} isOpen={showModal} onClose={() => setShowModal(false)}>
        {modalContent}
      </Modal>
      <Header onHelpClick={() => handleShowModal('City', helpContent)} backDisabled={showModal} />
      <div className='city-backdrop'>
        <div className='city-heading'>{`City Level - ${city.level}`}</div>
        <div className='city-content'>
          <div className='city-objective'>Objective</div>
          <div className='city-text'>{objective}</div>
          <button className='city-button' onClick={handleBuyClick}>{`Buy for $${price}`}</button>
        </div>
      </div>
    </div>
  )
}

export default City