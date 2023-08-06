import React, { useState } from 'react'
import Header from '../Common/Header'
import Modal from '../Common/Modal'
import './styles.css'

function RelateTheWords () {
  const [ showHelp, setShowHelp ] = useState(false)

  return (
    <div>
      <Modal title='Relate The Words' isOpen={showHelp} onClose={() => setShowHelp(false)}>
        <p>In this game you need to identify and shoot the related words</p>
        <p>Using your mouse aim and shoot at correct answer</p>
        <p>Incorrect answer will get your tank backfired</p>
        <p>and if you succeed with correct answer</p>
        <p>Then you are definitely a master !</p>
        <p>So, Fire Away !!</p>
      </Modal>
      <Header onHelpClick={() => setShowHelp(true)} backDisabled={showHelp} />
      <div>Relate The Words</div>
    </div>
  )
}

export default RelateTheWords