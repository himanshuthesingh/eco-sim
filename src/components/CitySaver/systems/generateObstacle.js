import Obstacle from '../entities/obstacle'
import getConstants from '../utils/constants'
import { getRandom } from '../utils/random'
import obstaclesData from '../utils/obstacles.json'

const GenerateObstacle = (entities, { time, dispatch }) => {
  const Constants = getConstants()
  let obsNum = 1

  const gameScreen = document.getElementById('cs-game-engine')
  if (gameScreen && entities.physics.pause === false) {

    const obstacles = Object.keys(entities).filter((entity) => entity.startsWith('Obstacle_'))
    if (obstacles.length === 0) {
      obsNum = getRandom(1,7) - 1
      entities['Obstacle_1'] = Obstacle(
        entities.physics.world,
        'bottom',
        {
          x: Constants.WIDTH + Constants.OBSTACLE_WIDTH / 2,
          y: getRandom(Constants.OBSTACLE_BOTTOM_RANGE.min, Constants.OBSTACLE_BOTTOM_RANGE.max),
        },
        { height: Constants.OBSTACLE_WIDTH * obstaclesData[obsNum].h2w, width: Constants.OBSTACLE_WIDTH },
        1,
        time.current,
        obstaclesData[obsNum].index
      )
    }
    else {
      const indexes = obstacles.map((obstacle) => Number(obstacle.slice(9)))
      const lastIndex = Math.max(...indexes)
      const timeDelta = time.current - entities[`Obstacle_${lastIndex}`].createdOn

      if (timeDelta > entities.physics.speed.delay) {
        obsNum = getRandom(1,7) - 1
        const newIndex = lastIndex + 1
        const type = entities[`Obstacle_${lastIndex}`].type === 'top' ? 'bottom' : 'top'
        const posY = type === 'top' ?
          getRandom(Constants.OBSTACLE_TOP_RANGE.min, Constants.OBSTACLE_TOP_RANGE.max) :
          getRandom(Constants.OBSTACLE_BOTTOM_RANGE.min, Constants.OBSTACLE_BOTTOM_RANGE.max)

        entities[`Obstacle_${newIndex}`] = Obstacle(
          entities.physics.world,
          type,
          {
            x: Constants.WIDTH + Constants.OBSTACLE_WIDTH / 2,
            y: posY,
          },
          { height: Constants.OBSTACLE_WIDTH * obstaclesData[obsNum].h2w, width: Constants.OBSTACLE_WIDTH },
          newIndex,
          time.current,
          obstaclesData[obsNum].index
        )
      }
    }
  }

  return { ...entities }
}

export default GenerateObstacle