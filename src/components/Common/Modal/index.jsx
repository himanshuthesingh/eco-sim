import React, { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'
import options from './particlesConfig'
import './styles.css'

function Modal(props) {
  const { altBtn = false } = props

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine)
  }, [])

  return (
    <div>
      {props.isOpen
        ?
        <div className='modal-overlay'>
          <div className='modal' id='modal'>
            <Particles id='modal-particles' loaded={() => { }} init={particlesInit} options={options} />
            <div className='modal-container'>
              <div className='modal-heading'>{props.title}</div>
              <div className='modal-content'>{props.children}</div>
              <div className='modal-btn-group'>
                <button className='modal-button' onClick={() => props.onBtnClick()}>
                  {props.btnTitle}
                </button>
                {altBtn &&
                  <button className='modal-button' onClick={() => props.onAltBtnClick()}>
                    {props.altBtnTitle}
                  </button>
                }
              </div>
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