import Obstacle from '../entities/obstacle'
import Supply from '../entities/supply'
import getConstants from '../utils/constants'
import { getRandom } from '../utils/random'
import obstaclesData from '../utils/obstacles.json'

const GenerateObstacle = (entities, { time, dispatch }) => {
  const Constants = getConstants()
  const objective = entities.physics.objective
  let obsNum = 1

  const gameScreen = document.getElementById('cs-game-engine')
  if (gameScreen && entities.physics.pause === false) {

    const obstacles = Object.keys(entities).filter((entity) => entity.startsWith('Obstacle_'))
    if (obstacles.length === 0) {
      obsNum = getRandom(4,6) - 1
      entities['Obstacle_1'] = Obstacle(
        entities.physics.world,
        'bottom',
        {
          x: Constants.WIDTH + obstaclesData[obsNum].width / 2,
          y: getRandom(Constants.OBSTACLE_BOTTOM_RANGE.min, Constants.OBSTACLE_BOTTOM_RANGE.max),
        },
        { height: obstaclesData[obsNum].width * obstaclesData[obsNum].h2w, width: obstaclesData[obsNum].width },
        1,
        time.current,
        obstaclesData[obsNum].index
      )
      entities['Supply_1'] = Supply(
        entities.physics.world,
        'top',
        {
          x: Constants.WIDTH + 25,
          y: getRandom(Constants.OBSTACLE_TOP_RANGE.min, Constants.OBSTACLE_TOP_RANGE.max),
        },
        { height: 120, width: 120 },
        1,
        time.current,
        objective
      )
    }
    else {
      const indexes = obstacles.map((obstacle) => Number(obstacle.slice(9)))
      const lastIndex = Math.max(...indexes)
      const timeDelta = time.current - entities[`Obstacle_${lastIndex}`].createdOn

      if (timeDelta > entities.physics.speed.delay) {
        const newIndex = lastIndex + 1
        const type = entities[`Obstacle_${lastIndex}`].type === 'top' ? 'bottom' : 'top'
        obsNum = type === 'top' ? getRandom(1,3) - 1 : getRandom(4,6) - 1

        const posY_TOP = getRandom(Constants.OBSTACLE_TOP_RANGE.min, Constants.OBSTACLE_TOP_RANGE.max)
        const poxY_BOTTOM = getRandom(Constants.OBSTACLE_BOTTOM_RANGE.min, Constants.OBSTACLE_BOTTOM_RANGE.max)
        const obstacle_posY = type === 'top' ? posY_TOP : poxY_BOTTOM
        const supply_posY = type === 'top' ? poxY_BOTTOM : posY_TOP

        entities[`Obstacle_${newIndex}`] = Obstacle(
          entities.physics.world,
          type,
          {
            x: Constants.WIDTH + obstaclesData[obsNum].width / 2,
            y: obstacle_posY,
          },
          { height: obstaclesData[obsNum].width * obstaclesData[obsNum].h2w, width: obstaclesData[obsNum].width },
          newIndex,
          time.current,
          obstaclesData[obsNum].index
        )
        entities[`Supply_${newIndex}`] = Supply(
          entities.physics.world,
          entities[`Obstacle_${lastIndex}`].type,
          {
            x: Constants.WIDTH + 25,
            y: supply_posY,
          },
          { height: 120, width: 120 },
          newIndex,
          time.current,
          objective
        )
      }
    }
  }

  return { ...entities }
}

export default GenerateObstacle