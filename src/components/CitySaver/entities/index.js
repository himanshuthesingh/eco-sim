import Player from './player'
import Floor from './floor'
import Ceiling from './ceiling'
import Matter from 'matter-js'

import getConstants from '../utils/constants'

Matter.Common.isElement = () => false

const entities = (objective, restart) => {
  
  if (restart) {
    Matter.Engine.clear(restart.physics.engine)
  }

  let engine = Matter.Engine.create({enableSleeping: false})
  let world = engine.world
  engine.gravity.y = 0.25

  const Constants = getConstants()
  
  return {
    physics: { 
      engine: engine, world: world, pause: true, objective,
      speed: { step: 4, delay: 1800, lastUpdate: 0 }
    },
    Player: Player(
      world,
      'pink',
      {x: Constants.WIDTH / 2, y: Constants.HEIGHT / 2},
      {height: 75, width: 75 * 2.89719626},
    ),
    Floor: Floor(
      world,
      'white',
      {x: Constants.WIDTH / 2, y: Constants.SCREEN_HEIGHT - 25 },
      {height: 50 , width: Constants.WIDTH},
    ),
    Ceiling: Ceiling(
      world,
      'white',
      {x: Constants.WIDTH / 2, y: 5 / 2},
      {height: 5, width: Constants.WIDTH},
    )
  }
}

export default entities