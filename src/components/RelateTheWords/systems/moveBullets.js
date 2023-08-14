import Matter from 'matter-js'

const MoveBullets = (entities, { window }) => {

  const bullets = Object.keys(entities).filter((entity) => entity.startsWith('Bullet_'))
  var bulletEntity = null

  if (bullets.length > 0) {
    bullets.forEach((bullet) => {
      bulletEntity = entities[bullet]
      const newX = bulletEntity.body.position.x + bulletEntity.step.x
      const newY = bulletEntity.body.position.y + bulletEntity.step.y
      Matter.Body.setPosition(bulletEntity.body, { x: newX, y: newY })

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
    })
  }

  return entities
}

export default MoveBullets