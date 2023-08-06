import React from 'react'
import './styles.css'

function Modal(props) {
  return (
    <div>
      {props.isOpen
        ?
        <div className='modal-overlay'>
          <div className='modal'>
            <div className='modal-heading'>{props.title}</div>
            <div className='modal-content'>{props.children}</div>
            <div className='modal-close'>
              <button className='modal-close-button' onClick={() => props.onClose()}>
                Close
              </button>
            </div>
          </div>
        </div>
        :
        null
      }
    </div>
  )
}

export default Modal