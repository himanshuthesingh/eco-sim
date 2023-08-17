import Matter from 'matter-js'
import Player from './player'
import Enemy from './enemy'
import { PLAYER_WIDTH, PLAYER_HEIGHT, ENEMY_WIDTH, ENEMY_HEIGHT } from '../utils/constants'

Matter.Common.isElement = () => false;

const entities = (options, restart) => {
  if (restart) {
    Matter.Engine.clear(restart.physics.engine);
  }

  let engine = Matter.Engine.create({enableSleeping: false});
  let world = engine.world;
  engine.gravity.y = 0
  engine.gravity.scale = 0

  return {
    physics: {engine: engine, world: world},
    Player: Player(
      world,
      {x: 500, y: 250},
      {width: PLAYER_WIDTH, height: PLAYER_HEIGHT},
    ),
    Enemy_1: Enemy(
      world,
      {x: 500, y: 250},
      {width: ENEMY_WIDTH, height: ENEMY_HEIGHT}, 0, 1, options[0], false
    ),
    Enemy_2: Enemy(
      world,
      {x: 500, y: 250},
      {width: ENEMY_WIDTH, height: ENEMY_HEIGHT}, 90, 2, options[1], false
    ),
    Enemy_3: Enemy(
      world,
      {x: 500, y: 250},
      {width: ENEMY_WIDTH, height: ENEMY_HEIGHT}, 270, 3, options[2], false
    ),
    Enemy_4: Enemy(
      world,
      {x: 500, y: 250},
      {width: ENEMY_WIDTH, height: ENEMY_HEIGHT}, 180, 4, options[3], false
    ),
  }
}

export default entities