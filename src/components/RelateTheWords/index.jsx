import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { GameEngine } from 'react-game-engine'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import Header from '../Common/Header'
import Modal from '../Common/Modal'
import data from '../../data/relatedWords.json'
import Systems from './systems'
import Entities from './entities'
import { setRelatedWordsHighScore } from '../../store/highScore/actions'
import './styles.css'

const aboutContent = <>
  <p>In this game you need to identify and shoot the related words</p>
  <p>Using your mouse aim and shoot the correct one</p>
  <p>Incorrect one will cost you 1 life</p>
  <p>and if you succeed with correct one</p>
  <p>Then you are definitely a Master !</p>
  <p>So, Fire Away !!</p>
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

function RelateTheWords() {
  const [showModal, setShowModal] = useState(true)
  const [modalContent, setModalContent] = useState(aboutContent)
  const [modalTitle, setModalTitle] = useState('Relate The Words')
  const [btnTitle, setBtnTitle] = useState('Play')
  const [altBtn, setAltBtn] = useState(false)
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(5)
  const [running, setRunning] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const highScore = useSelector((state) => state.highScore)
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const fetchData = () => {
    const questionsData = data.map((x) => x)
    questionsData.sort(() => Math.random() - 0.5)
    setQuestions(questionsData)
  }

  useEffect(() => {
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
        gameEngine.dispatch({ type: 'hit-check', success: true })
      }
      else {
        if (lives > 1) {
          setLives(prevState => prevState - 1)
        }
        gameEngine.dispatch({ type: 'hit-check', success: false, lives })
      }
    }

    if (event.type === 'next-level') {
      setScore(prevState => prevState + 1)

      gameEngine.clear()
      if (index === questions.length - 1) {
        setIndex(0)
        setQuestions(prevState => prevState.sort(() => Math.random() - 0.5))
        gameEngine.dispatch({ type: 'restart', payload: questions[0].options })
      }
      else {
        setIndex(prevState => prevState + 1)
        gameEngine.dispatch({ type: 'restart', payload: questions[index + 1].options })
      }
    }

    if (event.type === 'game-over') {
      setModalTitle('Game Over !!')
      if (score > highScore.relatedWords) {
        setModalContent(highestScoreText(score))
      }
      else {
        setModalContent(gameOverText(score, highScore.relatedWords))
      }
      setBtnTitle('Play Again')
      setAltBtn(true)
      setShowModal(true)
      setGameOver(true)
    }
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div>
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