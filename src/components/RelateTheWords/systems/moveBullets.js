import Matter from 'matter-js'

const MoveBullets = (entities, { window, time }) => {

  const bullets = Object.keys(entities).filter((entity) => entity.startsWith('Bullet_'))
  var bulletEntity = null
  let timeDiff = 0
  let stepX = 0
  let stepY = 0

  if (bullets.length > 0) {
    bullets.forEach((bullet) => {
      bulletEntity = entities[bullet]

      timeDiff = time.current - bulletEntity.updatedOn
      if (timeDiff !== 0) {
        
        stepX = (timeDiff / 16) * bulletEntity.step.x
        stepY = (timeDiff / 16) * bulletEntity.step.y

        const newX = bulletEntity.body.position.x + stepX
        const newY = bulletEntity.body.position.y + stepY
        Matter.Body.setPosition(bulletEntity.body, { x: newX, y: newY })

        entities[bullet].updatedOn = time.current

        var element = window.document.getElementById('rw-game-engine')
        const gameScreen = element.getBoundingClientRect()
        const topX = gameScreen.x + (bulletEntity.size[0] / 2)
        const topY = gameScreen.y + (bulletEntity.size[0] / 2)
        const bottomX = gameScreen.right - (bulletEntity.size[0] / 2)
        const bottomY = gameScreen.bottom - (bulletEntity.size[0] / 2)

        if (bulletEntity.body.position.x < topX || bulletEntity.body.position.x > bottomX ||
          bulletEntity.body.position.y < topY || bulletEntity.body.position.y > bottomY) {

          Matter.World.remove(entities.physics.world, entities[bullet].body)
          delete entities[bullet]
        }
      }
    })
  }

  return entities
}

export default MoveBullets