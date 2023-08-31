import Matter from 'matter-js'

const MoveObstacles = (entities, { dispatch, time }) => {
  const obstacles = Object.keys(entities).filter((entity) => entity.startsWith('Obstacle_'))
  const supplies = Object.keys(entities).filter((entity) => entity.startsWith('Supply_'))
  var obstacleEntity = null
  var supplyEntity = null
  let timeDiff = 0
  let step = 0
  let newX = 0

  if (obstacles.length > 0) {
    obstacles.forEach((obstacle) => {
      obstacleEntity = entities[obstacle]
      timeDiff = time.current - obstacleEntity.updatedOn
      step = (timeDiff / 16) * entities.physics.speed.step
      newX = obstacleEntity.body.position.x - step
      
      Matter.Body.setPosition(obstacleEntity.body, { x: newX, y: obstacleEntity.body.position.y })

      entities[obstacle].updatedOn = time.current

      if (obstacleEntity.body.position.x < -obstacleEntity.size.width) {
        Matter.World.remove(entities.physics.world, entities[obstacle].body)
        delete entities[obstacle]
      }
    })
  }

  if (supplies.length > 0) {
    supplies.forEach((supply) => {
      supplyEntity = entities[supply]
      timeDiff = time.current - supplyEntity.updatedOn
      step = (timeDiff / 16) * entities.physics.speed.step
      newX = supplyEntity.body.position.x - step
      
      Matter.Body.setPosition(supplyEntity.body, { x: newX, y: supplyEntity.body.position.y })

      entities[supply].updatedOn = time.current

      if (supplyEntity.body.position.x < -supplyEntity.size.width) {
        Matter.World.remove(entities.physics.world, entities[supply].body)
        delete entities[supply]
      }
    })
  }

  return { ...entities }
}

export default MoveObstacles