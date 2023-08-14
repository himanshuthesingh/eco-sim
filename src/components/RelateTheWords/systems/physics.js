import Matter from 'matter-js'

const Physics = (entities, { time, dispatch }) => {
  let engine = entities.physics.engine
  Matter.Engine.update(engine, time.delta)

  Matter.Events.on(engine, 'collisionStart', event => {
    if (event && event.pairs && event.pairs.length > 0) {
      const labelA = event.pairs[0].bodyA.label
      const labelB = event.pairs[0].bodyB.label

      if (labelA.includes('Enemy_')) {
        dispatch({ type: 'hit', payload: {
          option: Number(labelA.slice(6)),
          bullet: labelB
        }})
      }
      else if (labelB.includes('Enemy_')) {
        dispatch({ type: 'hit', payload: {
          option: Number(labelB.slice(6)),
          bullet: labelA
        }})
      }
    }
  })

  return entities
}

export default Physics