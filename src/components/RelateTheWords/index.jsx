import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { GameEngine } from 'react-game-engine'
import ReactSound from 'react-sound'
import Header from '../Common/Header'
import Modal from '../Common/Modal'
import Systems from './systems'
import Entities from './entities'
import { setRelatedWordsHighScore } from '../../store/highScore/actions'
import { setScreen } from '../../store/screen/actions'
import GunFireSound from '../../assets/sounds/Gun_Fire.mp3'
import ExplosionSound from '../../assets/sounds/Explosion.mp3'
import CorrectSound from '../../assets/sounds/Correct_Answer.mp3'
import WrongSound from '../../assets/sounds/Wrong_Answer.mp3'
import './styles.css'

const aboutContent = <>
  <p>In this game you need to identify and shoot the related words</p>
  <p>Using your mouse aim and shoot the correct one</p>
  <p>Incorrect one will cost you 1 life</p>
  <p>and if you succeed with correct one</p>
  <p>Then you are definitely a Master !</p>
  <p>So, Fire Away !!</p>
</>

const gameOverText = (score, highScore, total) => <>
  <p>You scored {score} out of {total}.</p>
  <p><b>High Score</b> - {highScore}</p>
  {(score / total) < 0.5 ?
    <p>Better Luck Next Time !!</p>
    :
    <p>Good Game !!</p>
  }
</>

const highestScoreText = (score, total) => <>
  <p>Congratulations !!</p>
  <p>You've beaten the highest score.</p>
  <p>You scored {score} out of {total}.</p>
  <p>New High Score - {score}</p>
  <p>Bravo !!</p>
</>

const gameCompletedText = (score, total) => <>
  <p>Congratulations !!</p>
  <p>You've completed the game.</p>
  <p>You scored - {score} out of {total}</p>
  {score < total ?
    <p>Bravo !!</p>
    :
    <p>Excellent !!</p>
  }
</>

let gameEngine = null

function RelateTheWords() {
  const highScore = useSelector((state) => state.highScore)
  const questionsData = useSelector((state) => state.questions.relateTheWords)

  const [explosionSound, setExplosionSound] = useState({ status: 'STOPPED', enemy: 0 })
  const [gunFireSound, setGunFireSound] = useState({ status: 'STOPPED', pos: 0 })
  const [correctSound, setCorrectSound] = useState({ status: 'STOPPED' })
  const [wrongSound, setWrongSound] = useState({ status: 'STOPPED' })
  const [modalTitle, setModalTitle] = useState('Relate The Words')
  const [modalContent, setModalContent] = useState(aboutContent)
  const [btnTitle, setBtnTitle] = useState('Play')
  const [showModal, setShowModal] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const [questions, setQuestions] = useState([])
  const [running, setRunning] = useState(true)
  const [altBtn, setAltBtn] = useState(false)
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(5)

  const dispatch = useDispatch()
  let navigate = useNavigate()

  const fetchData = () => {
    let temp = questionsData
    temp.sort(() => Math.random() - 0.5)
    setQuestions(temp)
  }

  useEffect(() => {
    dispatch(setScreen('RelateTheWords'))
    fetchData()
  }, [])

  let category = ''
  let options = []
  let correctOption = 0

  if (questions.length > index) {
    category = questions[index].category
    options = questions[index].options
    correctOption = questions[index].correctOption
  }

  const handleShowHelp = () => {
    setModalTitle('Relate The Words')
    setModalContent(aboutContent)
    setBtnTitle('Play')
    setAltBtn(false)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    if (gameOver) {
      if (score > highScore.relatedWords) {
        dispatch(setRelatedWordsHighScore(score))
      }
      const newQuestions = questions.sort(() => Math.random() - 0.5)
      setGameOver(false)
      setScore(0)
      setLives(5)
      setIndex(0)
      setQuestions(newQuestions)
      gameEngine.dispatch({ type: 'restart', payload: newQuestions[0].options })
    }
  }

  const livesContent = () => {
    return (
      <div className='rw-life'>
        {[...Array(5 - lives)].map((elementInArray, index) => (
          <FaRegHeart className='rw-life-icon' key={index} />
        ))}
        {[...Array(lives)].map((elementInArray, index) => (
          <FaHeart className='rw-life-icon' key={index} />
        ))}
      </div>
    )
  }

  const onEvent = (event) => {
    if (event.type === 'enemyHit') {
      if (event.payload.option === correctOption) {
        setCorrectSound({ status: 'PLAYING' })
        gameEngine.dispatch({ type: 'hit-check', success: true })
        setScore(prevState => prevState + 1)
      }
      else {
        if (lives > 1) {
          setLives(prevState => prevState - 1)
        }
        setWrongSound({ status: 'PLAYING' })
        gameEngine.dispatch({ type: 'hit-check', success: false, lives })
      }
    }

    if (event.type === 'next-level') {
      gameEngine.clear()
      if (index === questions.length - 1) {
        setModalTitle('Game Completed !!')
        if (score > highScore.relatedWords) {
          setModalContent(highestScoreText(score, questions.length))
        }
        else {
          setModalContent(gameCompletedText(score, questions.length))
        }
        setBtnTitle('Play Again')
        setAltBtn(true)
        setShowModal(true)
        setGameOver(true)
      }
      else {
        setIndex(prevState => prevState + 1)
        gameEngine.dispatch({ type: 'restart', payload: questions[index + 1].options })
      }
    }

    if (event.type === 'game-over') {
      setModalTitle('Game Over !!')
      if (score > highScore.relatedWords && highScore.relatedWords > 0) {
        setModalContent(highestScoreText(score, questions.length))
      }
      else {
        setModalContent(gameOverText(score, highScore.relatedWords, questions.length))
      }
      setBtnTitle('Play Again')
      setAltBtn(true)
      setShowModal(true)
      setGameOver(true)
    }

    if (event.type === 'playGunFireSound') {
      setGunFireSound({ status: 'PLAYING', pos: 0 })
      setTimeout(() => {
        setGunFireSound({ status: 'STOPPED', pos: 0 })
      }, 1000)
    }

    if (event.type === 'playExplosionSound') {
      if (explosionSound.enemy !== event.enemy) {
        setExplosionSound({ status: 'PLAYING', enemy: event.enemy })
      }
    }
  }

  const handleGoBack = () => {
    if (score > highScore.relatedWords) {
      dispatch(setRelatedWordsHighScore(score))
    }
    navigate(-1)
  }

  return (
    <div>
      <ReactSound url={GunFireSound} playStatus={gunFireSound.status} playFromPosition={gunFireSound.pos} volume={50} autoLoad />
      <ReactSound url={ExplosionSound} playStatus={explosionSound.status} volume={50} onFinishedPlaying={() => setExplosionSound({ status: 'STOPPED', enemy: 0 })} autoLoad />
      <ReactSound url={CorrectSound} playStatus={correctSound.status} volume={50} onFinishedPlaying={() => setCorrectSound({ status: 'STOPPED' })} autoLoad />
      <ReactSound url={WrongSound} playStatus={wrongSound.status} volume={50} onFinishedPlaying={() => setWrongSound({ status: 'STOPPED' })} autoLoad />
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
      <div className='related-words'>
        <div className='rw-header'>
          <div className='rw-heading'>Relate The Words</div>
          <div className='rw-score'>Score - {score}</div>
          {livesContent()}
        </div>
        <div className='rw-section' id='rw-section'>
          <div className='rw-instruction'>Identify the word which best relates to given category</div>
          <div className='rw-category'>{category}</div>
          {questions.length > 0 &&
            <div id='rw-game-engine' className='rw-game-engine'>
              <GameEngine
                ref={ref => { gameEngine = ref }}
                className='rw-game-engine'
                systems={Systems}
                onEvent={onEvent}
                entities={Entities(options)}
                running={running}>
              </GameEngine>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default RelateTheWords