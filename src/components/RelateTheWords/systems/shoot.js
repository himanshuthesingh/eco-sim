import Matter from 'matter-js'
import Bullet from '../entities/bullet'
import { BULLET_SPEED, BULLET_WIDTH, BULLET_HEIGHT } from '../utils/constants'

const bulletSize = {
  width: BULLET_WIDTH,
  height: BULLET_HEIGHT
}

const Shoot = (entities, { window, input, dispatch }) => {
  const { payload } = input.find(x => x.name === 'onClick') || {}
  if (payload && !entities.Player.dontShoot) {
    dispatch({ type: 'playGunFireSound' })

    var player = window.document.getElementById('rw-player')
    if (player) {
      var playerX = player.offsetLeft + player.offsetWidth / 2
      var playerY = player.offsetTop + player.offsetHeight / 2
      var dX = playerX - payload.clientX
      var dY = playerY - payload.clientY
      var degree = Math.atan(- dX / dY) * 180 / Math.PI
      if (dY > 0) { degree += 180 }
      degree += 90
      
      const dist = Math.sqrt((dX*dX)+(dY*dY))
      const stepX = (-dX * BULLET_SPEED) / dist
      const stepY = (-dY * BULLET_SPEED) / dist

      const posX = playerX - ((player.offsetWidth/(2*dist)) * dX)
      const posY = playerY - ((player.offsetWidth/(2*dist)) * dY)

      const bullets = Object.keys(entities).filter((entity) => entity.startsWith('Bullet_'))
      if (bullets.length === 0) {
        entities['Bullet_1'] = Bullet(
          entities.physics.world,
          { x: posX, y: posY },
          bulletSize,
          degree,
          1,
          { x: stepX, y: stepY }
        )
        Matter.Detector.create({
          bodies: [ entities.Enemy_1, entities.Enemy_2,entities.Enemy_3, entities.Enemy_4, entities['Bullet_1']]
        })
      }
      else {
        const indexes = bullets.map((bullet) => Number(bullet.slice(7)))
        const lastIndex = Math.max(...indexes)
        const newIndex = lastIndex + 1
        entities[`Bullet_${newIndex}`] = Bullet(
          entities.physics.world,
          { x: posX, y: posY },
          bulletSize,
          degree,
          newIndex,
          { x: stepX, y: stepY }
        )
        Matter.Detector.create({
          bodies: [ entities.Enemy_1, entities.Enemy_2,entities.Enemy_3, entities.Enemy_4, entities[`Bullet_${newIndex}`]]
        })
      }
    }
  }
  return entities
}

export default Shoot