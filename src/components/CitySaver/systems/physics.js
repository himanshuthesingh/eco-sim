import Matter from 'matter-js'

const Physics = (entities, { time, dispatch }) => {
  let engine = entities.physics.engine

  if (entities.physics.pause === false) {
    Matter.Engine.update(engine, time.delta)
    Matter.Events.on(engine, 'collisionStart', event => {
      if (event && event.pairs && event.pairs.length > 0) {
        const labelA = event.pairs[0].bodyA.label
        const labelB = event.pairs[0].bodyB.label

        if (labelA.includes('Supply_') || labelB.includes('Supply_')) {
          const supply = labelB.includes('Supply_') ? labelB : labelA
          dispatch({ type: 'supplyHit', target: supply })
        }
        else {
          dispatch({ type: 'obstacleHit' })
        }
      }
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