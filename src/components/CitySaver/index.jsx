import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { GameEngine } from 'react-game-engine'
import ReactSound from 'react-sound'
import Header from '../Common/Header'
import Modal from '../Common/Modal'
import Systems from './systems'
import Entities from './entities'
import data from '../../data/citySaver.json'
import { setCitySaverHighScore } from '../../store/highScore/actions'
import { setScreen } from '../../store/screen/actions'
import getConstants from './utils/constants'
import './styles.css'

import ExplosionSound from '../../assets/sounds/Explosion.mp3'
import CorrectSound from '../../assets/sounds/Correct_Answer.mp3'

import moneySupplyImg from '../../assets/money-supply.png'
import educationalSupplyImg from '../../assets/educational-supply.png'
import cleaningSupplyImg from '../../assets/cleaning-supply.png'
import foodSupplyImg from '../../assets/food-supply.png'
import medicalSupplyImg from '../../assets/medical-supply.png'
import energySupplyImg from '../../assets/energy-supply.png'

const aboutContent = <>
  <p>Save your City !!</p>
  <p>By clicking Arrow Up OR Space Button</p>
  <p>Fly through the obstacles</p>
  <p>And collect supplies for the city</p>
  <p>Happy Flying !!</p>
</>

const gameOverText = (score, highScore) => <>
  <p>You collected {score} supplies for the city.</p>
  <p><b>High Score</b> - {highScore}</p>
  {score < 5 ?
    <p>Better Luck Next Time !!</p>
    :
    <p>Good Game !!</p>
  }
</>

const highestScoreText = (score) => <>
  <p>Congratulations !!</p>
  <p>You've beaten the highest score.</p>
  <p>New High Score - {score}</p>
  <p>Bravo !!</p>
</>

let gameEngine = null

function CitySaver() {
  const [correctSound, setCorrectSound] = useState({ status: 'STOPPED' })
  const [showModal, setShowModal] = useState(true)
  const [modalContent, setModalContent] = useState(aboutContent)
  const [modalTitle, setModalTitle] = useState('City Saver')
  const [btnTitle, setBtnTitle] = useState('Play')
  const [altBtn, setAltBtn] = useState(false)
  const [isGameOn, setIsGameOn] = useState(false)
  const [running, setRunning] = useState(false)
  const [score, setScore] = useState(0)
  const [scored, setScored] = useState(new Set())
  const [gameOver, setGameOver] = useState(false)
  const [index, setIndex] = useState(0)
  const [objectives, setObjectives] = useState(data)
  const [explosionSound, setExplosionSound] = useState({ status: 'STOPPED' })
  const highScore = useSelector((state) => state.highScore)
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const Constants = getConstants()
  let supplyImg = ''

  switch (objectives[index].type) {
    case Constants.OBJECTIVE.MONEY:
      supplyImg = moneySupplyImg
      break
    case Constants.OBJECTIVE.FOOD:
      supplyImg = foodSupplyImg
      break
    case Constants.OBJECTIVE.EDUCATION:
      supplyImg = educationalSupplyImg
      break
    case Constants.OBJECTIVE.ENERGY:
      supplyImg = energySupplyImg
      break
    case Constants.OBJECTIVE.MEDICAL:
      supplyImg = medicalSupplyImg
      break
    case Constants.OBJECTIVE.SANITATION:
      supplyImg = cleaningSupplyImg
      break
    default:
      supplyImg = moneySupplyImg
  }

  const fetchData = () => {
    const objectiveData = data.map((x) => x)
    objectiveData.sort(() => Math.random() - 0.5)
    setObjectives(objectiveData)
  }

  useEffect(() => {
    dispatch(setScreen('CitySaver'))
    fetchData()
  }, [])

  const handleShowHelp = () => {
    setModalTitle('City Saver')
    setModalContent(aboutContent)
    setBtnTitle('Play')
    setAltBtn(false)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    if (gameOver) {
      if (index === objectives.length - 1) {
        setIndex(0)
      }
      else {
        setIndex(prevState => prevState + 1)
      }
      if (score > highScore.citySaver) {
        dispatch(setCitySaverHighScore(score))
      }
      setScore(0)
      setScored(new Set())
      setGameOver(false)
      setIsGameOn(false)
    }
  }

  const handleGameStart = () => {
    setIsGameOn(true)
    setRunning(true)
  }

  const onEvent = (event) => {
    if (event.type === 'gameOver') {
      setExplosionSound({ status: 'PLAYING' })
      setRunning(false)
      if (score > highScore.citySaver) {
        setModalContent(highestScoreText(score))
      }
      else {
        setModalContent(gameOverText(score, highScore.citySaver))
      }
      setModalTitle('Game Over !!')
      setBtnTitle('Play Again')
      setAltBtn(true)
      setShowModal(true)
      setGameOver(true)
    }

    if (event.type === 'score') {
      console.log(event.value, scored)
      if (!scored.has(event.value)) {
        setScore(prevScore => prevScore + 1)
        setScored(prevScored => prevScored.add(event.value))
        setCorrectSound({ status: 'PLAYING' })
        setTimeout(() => {
          setCorrectSound({ status: 'STOPPED' })
        }, 200)
      }
    }
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div>
      <ReactSound url={ExplosionSound} playStatus={explosionSound.status} volume={20} onFinishedPlaying={() => setExplosionSound({ status: 'STOPPED' })} autoLoad />
      <ReactSound url={CorrectSound} playStatus={correctSound.status} playFromPosition={0} volume={50} onFinishedPlaying={() => setCorrectSound({ status: 'STOPPED' })} autoLoad />
      <Modal
        title={modalTitle}
        isOpen={showModal}
        btnTitle={btnTitle}
        onBtnClick={handleCloseModal}
        altBtn={altBtn}
        altBtnTitle={'Exit Game'}
        onAltBtnClick={handleGoBack}
      >
        {modalContent}
      </Modal>
      <Header onHelpClick={handleShowHelp} />
      {!isGameOn ?
        <div className='city-backdrop'>
          <div className='city-heading'>City Saver</div>
          <div className='city-content'>
            <div className='city-objective'>Objective</div>
            <div className='city-text'>{objectives[index].objective}</div>
            <img className='city-supply-img' src={supplyImg} />
            <button className='city-button' onClick={handleGameStart}>Play</button>
          </div>
        </div>
        :
        <div id='cs-game-engine'>
          <GameEngine
            ref={ref => { gameEngine = ref }}
            className='cs-game-engine'
            systems={Systems}
            onEvent={onEvent}
            entities={Entities(objectives[index].type)}
            running={running}>
          </GameEngine>
          <div className='cs-score'>Score - {score}</div>
        </div>
      }
    </div>
  )
}

export default CitySaver