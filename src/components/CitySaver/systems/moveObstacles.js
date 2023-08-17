import Matter from 'matter-js'

const MoveObstacles = (entities, { dispatch, time }) => {
  const obstacles = Object.keys(entities).filter((entity) => entity.startsWith('Obstacle_'))
  var obstacleEntity = null
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

      if (newX < entities.Player.body.position.x ) {
        dispatch({ type: 'score', value: Number(obstacle.slice(9)) })
      }

      entities[obstacle].updatedOn = time.current

      if (obstacleEntity.body.position.x < -obstacleEntity.size.width) {
        delete entities[obstacle]
      }
    })
  }

  return { ...entities }
}

export default MoveObstacles