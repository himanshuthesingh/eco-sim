import Matter from 'matter-js'

function animateScript(payload, dispatch) {
  const interval = 50
  var positionX = 192
  var positionY = 0
  const diff = 192

  var tID = setInterval(() => {
    const enemyElement = document.getElementById(`rw-enemy-dead-${payload.option}`)
    if (enemyElement) {
      enemyElement.style.backgroundPosition =
        `-${positionX}px -${positionY}px`

      if (positionX < 768) {
        positionX += diff
      }
      else {
        positionX = diff
        positionY += diff
      }

      if (positionX === 768 && positionY === 576) {
        enemyElement.style.display = 'none'
        dispatch({ type: 'deleteEnemy', payload })
        dispatch({ type: 'enemyHit', payload })
        clearInterval(tID)
      }
    }
    else {
      clearInterval(tID)
    }
  }, interval)
}

const Hit = (entities, { events, dispatch, window }) => {
  const hitEvents = events.filter(event => event.type === 'hit')
  if (hitEvents.length > 0) {
    const hitEvent = hitEvents[0]

    const enemy = entities[`Enemy_${hitEvent.payload.option}`]
    enemy.dead = true
    entities[`Enemy_${hitEvent.payload.option}`] = enemy

    Matter.World.remove(entities.physics.world, entities[hitEvent.payload.bullet].body)
    delete entities[hitEvent.payload.bullet]

    entities.Player.dontShoot = true

    dispatch({ type: 'startExplosion', payload: hitEvent.payload })
  }

  const animationEvents = events.filter(event => event.type === 'startExplosion')
  if (animationEvents.length > 0) {
    animateScript(animationEvents[0].payload, dispatch)
  }

  const hitCheckEvents = events.filter(event => event.type === 'hit-check')
  if (hitCheckEvents.length > 0) {
    const hitSuccess = hitCheckEvents[0].success
    const player = document.getElementById('rw-player')
    const gameScreen = document.getElementById('rw-game-engine')

    const infoText = document.createElement('div')
    infoText.innerHTML = hitSuccess ? 'CORRECT' : 'WRONG'
    infoText.style.cssText = `
      position: absolute;
      left: ${player.offsetLeft + (player.offsetWidth / 2) - (gameScreen.offsetWidth * 0.059829)}px;
      top: ${player.offsetTop + (player.offsetHeight / 2) - (gameScreen.offsetHeight * 0.389105)}px;
      transform: translate(-50%, -50%);
      z-index: 100;
      font-size: 3rem;
      font-family: 'Peace Sans';
      color: #3d1010;
      animation: wrongAnimation 0.8s ease 0s 1 normal forwards;
    `
    const css = window.document.styleSheets[0]
    css.insertRule(`
      @keyframes wrongAnimation {
        0% { opacity: 0; transform: scale(0.2); }
        70% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(1); }
      }
    `, css.cssRules.length)

    document.getElementById('rw-section').appendChild(infoText)

    setTimeout(() => {
      infoText.remove()
      entities.Player.dontShoot = false
      if (hitSuccess) {
        dispatch({ type: 'next-level' })
      }
      else if (hitCheckEvents[0].lives === 1) {
        dispatch({ type: 'game-over' })
      }
    }, 800)
  }

  const deleteEnemyEvents = events.filter(event => event.type === 'deleteEnemy')
  if (deleteEnemyEvents.length > 0) {
    Matter.World.remove(entities.physics.world, entities[`Enemy_${deleteEnemyEvents[0].payload.option}`].body)
    delete entities[`Enemy_${deleteEnemyEvents[0].payload.option}`]
  }

  return entities
}

export default Hit