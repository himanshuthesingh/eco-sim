import Matter from 'matter-js'

const Physics = (entities, { time, dispatch }) => {
  let engine = entities.physics.engine

  if (entities.physics.pause === false) {
    Matter.Engine.update(engine, time.delta)
    Matter.Events.on(engine, 'collisionStart', event => {
      dispatch({ type: 'gameOver' })
    })
  }

  if (entities.physics.speed.lastUpdate === 0) {
    entities.physics.speed.lastUpdate = time.current
  }
  else if (entities.physics.speed.step < 8) {
    let timeDiff = time.current - entities.physics.speed.lastUpdate
    if (timeDiff > 600) {
      entities.physics.speed.lastUpdate = time.current
      entities.physics.speed.step += 0.02
      entities.physics.speed.delay -= 5
    }
  }

  return { ...entities }
}

export default Physics