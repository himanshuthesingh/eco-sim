import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import ReactSound from 'react-sound'
import Header from '../Common/Header'
import Modal from '../Common/Modal'
import data from '../../data/brainyQuest.json'
import { setBrainyQuestHighScore } from '../../store/highScore/actions'
import { setScreen } from '../../store/screen/actions'
import CorrectSound from '../../assets/sounds/Correct_Answer.mp3'
import WrongSound from '../../assets/sounds/Wrong_Answer.mp3'
import './styles.css'

const aboutContent = <>
  <p>In this game you need to select the correct answer</p>
  <p>from the given options and complete the sentence</p>
  <p>Happy Gaming !!</p>
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

function BrainyQuest() {
  const [showModal, setShowModal] = useState(true)
  const [modalContent, setModalContent] = useState(aboutContent)
  const [modalTitle, setModalTitle] = useState('Brainy Quest')
  const [btnTitle, setBtnTitle] = useState('Play')
  const [altBtn, setAltBtn] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(5)
  const [gameOver, setGameOver] = useState(false)
  const [correctSound, setCorrectSound] = useState({ status: 'STOPPED' })
  const [wrongSound, setWrongSound] = useState({ status: 'STOPPED' })
  const highScore = useSelector((state) => state.highScore)
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const fetchData = () => {
    const questionsData = data.map((x) => x)
    questionsData.sort(() => Math.random() - 0.5)
    setQuestions(questionsData)
  }

  useEffect(() => {
    dispatch(setScreen('BrainyQuest'))
    fetchData()
  }, [])

  let quesPart1 = ''
  let quesPart2 = ''
  let options = []
  let correctOption = 0

  if (questions.length > index) {
    quesPart1 = questions[index].quesPart1
    quesPart2 = questions[index].quesPart2
    options = questions[index].options
    correctOption = questions[index].correctOption
  }

  const optionStyle = answered ? 'bq-option bq-option-disabled' : 'bq-option'
  const blankStyle = answered ? 'bq-ques-blank bq-answer' : 'bq-ques-blank'
  const blankContent = answered ? options[correctOption - 1] : '______'

  const handleOptionClick = (option) => {
    if (option === correctOption) {
      setCorrectSound({ status: 'PLAYING' })
      setScore(prevState => prevState + 1)
      setAnswered(true)
    }
    else {
      setWrongSound({ status: 'PLAYING' })
      if (lives === 1) {
        setModalTitle('Game Over !!')
        if (score > highScore.brainyQuest) {
          setModalContent(highestScoreText(score))
        }
        else {
          setModalContent(gameOverText(score, highScore.brainyQuest))
        }
        setBtnTitle('Play Again')
        setAltBtn(true)
        setShowModal(true)
        setGameOver(true)
      }
      else {
        setLives(prevState => prevState - 1)
      }
    }
  }

  const handleNextClick = () => {
    if (index === questions.length - 1) {
      setIndex(0)
    }
    else {
      setIndex(prevState => prevState + 1)
    }
    setAnswered(false)
  }

  const handleShowHelp = () => {
    setModalTitle('Brainy Quest')
    setModalContent(aboutContent)
    setBtnTitle('Play')
    setAltBtn(false)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    if (gameOver) {
      if (score > highScore.brainyQuest) {
        dispatch(setBrainyQuestHighScore(score))
      }
      setQuestions([])
      fetchData()
      setIndex(0)
      setScore(0)
      setLives(5)
      setGameOver(false)
    }
  }

  const livesContent = () => {
    return (
      <div className='bq-life'>
        {[...Array(5 - lives)].map((el, index) => (
          <FaRegHeart className='bq-life-icon' key={index} />
        ))}
        {[...Array(lives)].map((el, index) => (
          <FaHeart className='bq-life-icon' key={index} />
        ))}
      </div>
    )
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div>
      <ReactSound url={CorrectSound} playStatus={correctSound.status} volume={30} onFinishedPlaying={() => setCorrectSound({ status: 'STOPPED' })} autoLoad />
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
      <div className='brainy-quest'>
        <div className='bq-header'>
          <div className='bq-heading'>Brainy Quest</div>
          <div className='bq-score'>Score - {score}</div>
          {livesContent()}
        </div>
        <div className='bq-instruction'>Click on the correct word and complete the given sentence.</div>
        <div className='bq-ques'>
          <div>{quesPart1}</div>
          <div className={blankStyle}>{blankContent}</div>
          <div>{quesPart2}</div>
        </div>
        <div className='bq-options'>
          <div className={optionStyle} onClick={() => handleOptionClick(1)}>{options[0]}</div>
          <div className={optionStyle} onClick={() => handleOptionClick(2)}>{options[1]}</div>
          <div className={optionStyle} onClick={() => handleOptionClick(3)}>{options[2]}</div>
          <div className={optionStyle} onClick={() => handleOptionClick(4)}>{options[3]}</div>
        </div>
        <button className='bq-next-btn' onClick={handleNextClick} disabled={!answered}>Click to continue</button>
      </div>
    </div>
  )
}

export default BrainyQuest