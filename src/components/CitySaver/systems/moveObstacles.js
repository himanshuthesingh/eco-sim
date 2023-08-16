import Matter from 'matter-js'
import getConstants from '../utils/constants'

const MoveObstacles = (entities, { dispatch }) => {
  const Constants = getConstants()

  const obstacles = Object.keys(entities).filter((entity) => entity.startsWith('Obstacle_'))
  var obstacleEntity = null

  if (obstacles.length > 0) {
    obstacles.forEach((obstacle) => {
      obstacleEntity = entities[obstacle]
      const newX = obstacleEntity.body.position.x - entities.physics.speed.step
      Matter.Body.setPosition(obstacleEntity.body, { x: newX, y: obstacleEntity.body.position.y })

      if (newX < entities.Player.body.position.x ) {
        dispatch({ type: 'score', value: Number(obstacle.slice(9)) })
      }

      if (obstacleEntity.body.position.x < -obstacleEntity.size.width) {
        delete entities[obstacle]
      }
    })
  }

  return { ...entities }
}

export default MoveObstacles