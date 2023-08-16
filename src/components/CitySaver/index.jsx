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
import ExplosionSound from '../../assets/sounds/Explosion.mp3'
import './styles.css'

const aboutContent = <>
  <p>Save your City !!</p>
  <p>By clicking Arrow Up OR Space Button</p>
  <p>Fly through the obstacles</p>
  <p>And deliver supplies to the city</p>
  <p>Happy Flying !!</p>
</>

const gameOverText = (score, highScore) => <>
  <p>You scored {score} point(s).</p>
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
  const [showModal, setShowModal] = useState(true)
  const [modalContent, setModalContent] = useState(aboutContent)
  const [modalTitle, setModalTitle] = useState('City Saver')
  const [btnTitle, setBtnTitle] = useState('Play')
  const [altBtn, setAltBtn] = useState(false)
  const [isGameOn, setIsGameOn] = useState(false)
  const [running, setRunning] = useState(false)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [index, setIndex] = useState(0)
  const [objectives, setObjectives] = useState(data)
  const [explosionSound, setExplosionSound] = useState({ status: 'STOPPED' })
  const highScore = useSelector((state) => state.highScore)
  const dispatch = useDispatch()
  let navigate = useNavigate()

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
      if (score < event.value) {
        setScore(event.value)
      }
    }
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div>
      <ReactSound url={ExplosionSound} playStatus={explosionSound.status} volume={20} onFinishedPlaying={() => setExplosionSound({ status: 'STOPPED' })} autoLoad />
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
            entities={Entities()}
            running={running}>
          </GameEngine>
          <div className='cs-score'>Score - {score}</div>
        </div>
      }
    </div>
  )
}

export default CitySaver