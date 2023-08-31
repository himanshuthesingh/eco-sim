import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'
import JM from 'json-msg'
import Header from '../Common/Header'
import Modal from '../Common/Modal'
import { setScreen } from '../../store/screen/actions'
import { setRelateTheWordsQuestions, setBrainyQuestQuestions, setRelateTheWordsDefaultQuestions, setBrainyQuestDefaultQuestions } from '../../store/questions/actions'
import { setRelatedWordsHighScore, setBrainyQuestHighScore } from '../../store/highScore/actions'
import options from '../Welcome/particlesConfig'
import './styles.css'

const rtwSample = <>
  <p>{`[`}</p>
  <p>&nbsp;&nbsp;{`{`}</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;"category": "Renewable",</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;"options": ["Coal", "Wind Power", "Oil", "Gas" ],</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;"correctOption": 2</p>
  <p>&nbsp;&nbsp;{`},`}</p>
  <p>&nbsp;&nbsp;{`{`}</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;"category": "Renewable",</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;"options": ["Tidal Energy", "Gasoline", "Nuclear Power", "Coal" ],</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;"correctOption": 1</p>
  <p>&nbsp;&nbsp;{`}`}</p>
  <p>{`]`}</p>
</>

const bqSample = <>
  <p>{`[`}</p>
  <p>&nbsp;&nbsp;{`{`}</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;"quesPart1": "Every Child has the right to",</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;"quesPart2": "and Health.",</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;"options": ["Phone", "Candy", "Life", "Drive" ],</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;"correctOption": 3</p>
  <p>&nbsp;&nbsp;{`},`}</p>
  <p>&nbsp;&nbsp;{`{`}</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;"quesPart1": "Children have the right to",</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;"quesPart2": "and Protection without discrimination.",</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;"options": ["Education", "Shop", "Party", "Sleep" ],</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;"correctOption": 1</p>
  <p>&nbsp;&nbsp;{`}`}</p>
  <p>{`]`}</p>
</>

const rtwSchema = {
  category: JM.str(),
  options: JM.array({ min: 4, max: 4, items: JM.str() }),
  correctOption: JM.num({ min: 1, max: 4 })
}

const bqSchema = {
  quesPart1: JM.str(),
  quesPart2: JM.str(),
  options: JM.array({ min: 4, max: 4, items: JM.str() }),
  correctOption: JM.num({ min: 1, max: 4 })
}

const aboutContent = <>
  <p>Welcome to Admin module of Eco-Sim.</p>
  <p>Here you can upload custom questions in the form of a JSON file.</p>
  <p>Please follow the JSON data format from respective sample.</p>
  <p>'Set to Default' will reset respective game's questions to Default.</p>
</>

function Admin() {
  const questions = useSelector((state) => state.questions)
  const dispatch = useDispatch()

  const [modalContent, setModalContent] = useState(aboutContent)
  const [modalTitle, setModalTitle] = useState('Brainy Quest')
  const [showModal, setShowModal] = useState(true)
  const [tabOpen, setTabOpen] = useState(1)

  const fileInput = useRef(null)

  const rtwBtnStyle = `admin-tab-${tabOpen === 1 ? 'selected' : 'unselected'}`
  const bqBtnStyle = `admin-tab-${tabOpen === 2 ? 'selected' : 'unselected'}`

  const rtwQuesDataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions.relateTheWords, null, 4))
  const bqQuesDataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions.brainyQuest, null, 4))

  const rtwFileName = 'RelateTheWords_Questions.json'
  const bqFileName = 'BrainyQuest_Questions.json'

  let dataStr = ''
  let fileName = ''

  if (tabOpen === 1) {
    dataStr = rtwQuesDataStr
    fileName = rtwFileName
  }
  else if (tabOpen === 2) {
    dataStr = bqQuesDataStr
    fileName = bqFileName
  }

  useEffect(() => {
    dispatch(setScreen('Admin'))
  }, [])

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine)
  }, [])

  const handleTabClick = (tab) => {
    if (tab === 1) {
      setTabOpen(1)
    }
    else if (tab === 2) {
      setTabOpen(2)
    }
  }

  const handleUploadClick = (event) => {
    event.preventDefault()
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const handleFileUpload = (event) => {
    if (event.target.files.length > 0) {
      if (event.target.files[0].type !== 'application/json') {
        setModalTitle('Upload Failed')
        setModalContent(<p>Please upload a JSON file only.</p>)
        setShowModal(true)
      }
      else {
        var reader = new FileReader()
        reader.onload = (e) => {
          try {
            var obj = JSON.parse(e.target.result)
            if (Array.isArray(obj)) {
              let res = null
              let schema = tabOpen === 1 ? rtwSchema : bqSchema
              let setQuestions = tabOpen === 1 ? setRelateTheWordsQuestions : setBrainyQuestQuestions
              let setHighScore = tabOpen === 1 ? setRelatedWordsHighScore : setBrainyQuestHighScore
              let gameName = tabOpen === 1 ? 'Relate The Words' : 'Brainy Quest'
              for (let i = 0; i < obj.length; i++) {
                res = JM.validate(obj[i], schema)
                if (res !== null) {
                  break
                }
              }
              if (res !== null) {
                setModalTitle('Upload Failed')
                setModalContent(<>
                  <p>Error :</p>
                  <pre>{JSON.stringify(res, null, 1).slice(2, -2)}</pre>
                </>)
                setShowModal(true)
              }
              else {
                dispatch(setQuestions(obj))
                dispatch(setHighScore(0))
                setModalTitle('Upload Successful')
                setModalContent(<p>New Questions are uploaded successfully for {gameName} Game.</p>)
                setShowModal(true)
              }
            }
            else {
              setModalTitle('Upload Failed')
              setModalContent(<p>Please upload a valid JSON file by following given sample.</p>)
              setShowModal(true)
            }
          }
          catch (error) {
            setModalTitle('Upload Failed')
            setModalContent(<p>Something went wrong. Please try again !!</p>)
            setShowModal(true)
          }
        }
        reader.readAsText(event.target.files[0])
      }
    }
    event.target.value = null
  }

  const handleShowAbout = () => {
    setModalTitle('Eco-Sim Admin')
    setModalContent(aboutContent)
    setShowModal(true)
  }

  const handleDefaultClick = (event) => {
    event.preventDefault()
    const setDefaultQues = tabOpen === 1 ? setRelateTheWordsDefaultQuestions : setBrainyQuestDefaultQuestions
    dispatch(setDefaultQues())
  }

  return (
    <div className='admin-bg'>
      <Particles id='admin-particles' loaded={() => { }} init={particlesInit} options={options} />
      <div className='admin-page'>
        <Modal
          title={modalTitle}
          isOpen={showModal}
          btnTitle={'Close'}
          onBtnClick={() => setShowModal(false)}
          altBtn={false}
          altBtnTitle={''}
          onAltBtnClick={() => { }}
        >
          {modalContent}
        </Modal>
        <Header onHelpClick={handleShowAbout} admin={true} />
        <div className='admin-title'>Eco-Sim Admin</div>
        <div className='admin-tabs'>
          <div className={rtwBtnStyle} onClick={() => handleTabClick(1)} style={{ marginLeft: '0.5rem' }}>Relate The Words</div>
          <div className={bqBtnStyle} onClick={() => handleTabClick(2)}>Brainy Quest</div>
        </div>
        <div className='admin-btns'>
          <a className='admin-btn' href={dataStr} download={fileName}>Download Current Questions</a>
          <a className='admin-btn' onClick={(e) => handleUploadClick(e)}>Upload New Questions</a>
          <a className='admin-btn' onClick={(e) => handleDefaultClick(e)}>Set to Default</a>
          <input className='admin-file-input' ref={fileInput} onChange={handleFileUpload} type='file' accept='application/json' multiple={false} />
        </div>
        <div className='admin-sample-bg'>
          <div className='admin-sample-title'>Sample JSON Data</div>
          <div className='admin-ques-sample'>{tabOpen === 1 ? rtwSample : bqSample}</div>
        </div>
      </div>
    </div>
  )
}

export default Admin