import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCoins } from '../../store/player/actions'
import Header from '../Common/Header'
import Modal from '../Common/Modal'
import data from '../../data/positionWords.json'
import './styles.css'

const helpContent = <>
  <p>In this game you need to select the correct answer</p>
  <p>from below options which will complete the sentence</p>
  <p>Happy Gaming !!</p>
</>

const wrongAnswerText = <>
  <p>Try Again</p>
</>

const gameOverText = (coins) => <>
  <p>You won ${coins} !!</p>
  <p>Start Again</p>
</>

function PositionWords() {
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const [modalTitle, setModalTitle] = useState('')
  const [answered, setAnswered] = useState(false)
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(5)
  const [gameOver, setGameOver] = useState(false)
  const dispatch = useDispatch()

  const fetchData = () => {
    const questionsData = data.map((x) => x)
    questionsData.sort(() => Math.random() - 0.5)
    setQuestions(questionsData)
  }

  useEffect(() => {
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

  const optionStyle = answered ? 'pw-option pw-option-disabled' : 'pw-option'
  const nextBtnStyle = answered ? 'pw-next-btn-box' : 'hidden'
  const blankStyle = answered ? 'pw-ques-blank pw-answer' : 'pw-ques-blank'
  const blankContent = answered ? options[correctOption - 1] : '______'

  const handleOptionClick = (option) => {
    if (option === correctOption) {
      setScore(prevState => prevState + 1)
      setAnswered(true)
    }
    else {
      if (lives === 0) {
        const coinsWon = score * 2
        dispatch(setCoins(coinsWon))
        handleShowModal('Game Over !!', gameOverText(coinsWon))
        setGameOver(true)
      }
      else {
        handleShowModal('Wrong Answer !!', wrongAnswerText)
        setLives(prevState => prevState - 1)
      }
    }
  }

  const handleNextClick = () => {
    if (index === questions.length-1) {
      setIndex(0)
    }
    else {
      setIndex(prevState => prevState + 1)
    }
    setAnswered(false)
  }

  const handleShowModal = (title, content) => {
    setModalTitle(title)
    setModalContent(content)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    if (gameOver) {
      setQuestions([])
      fetchData()
      setIndex(0)
      setScore(0)
      setLives(5)
      setGameOver(false)
    }
  }

  return (
    <div>
      <Modal title={modalTitle} isOpen={showModal} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
      <Header onHelpClick={() => handleShowModal('Position Words', helpContent)} backDisabled={showModal} />
      <div className='position-words'>
        <div className='pw-header'>
          <div className='pw-heading'>Position Words</div>
          <div className='pw-score'>Score - {score}</div>
          <div className='pw-life'>Lives - {lives}</div>
        </div>
        <div className='pw-instruction'>Click on the correct word and complete the given sentence.</div>
        <div className='pw-ques'>
          <div className='pw-ques-part'>{quesPart1}</div>
          <div className={blankStyle}>{blankContent}</div>
          <div className='pw-ques-part'>{quesPart2}</div>
        </div>
        <div className='pw-options'>
          <div className={optionStyle} onClick={() => handleOptionClick(1)}>{options[0]}</div>
          <div className={optionStyle} onClick={() => handleOptionClick(2)}>{options[1]}</div>
          <div className={optionStyle} onClick={() => handleOptionClick(3)}>{options[2]}</div>
          <div className={optionStyle} onClick={() => handleOptionClick(4)}>{options[3]}</div>
        </div>
        <div className={nextBtnStyle}>
          <button className='pw-next-btn' onClick={handleNextClick}>Click to continue</button>
        </div>
      </div>
    </div>
  )
}

export default PositionWords