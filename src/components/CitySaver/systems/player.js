import Matter from 'matter-js'

const UpdatePlayer = (entities, { input, time }) => {
  const engine = entities.physics.engine

  const { payload } = input.find(x => x.name === 'onKeyDown' &&
    (x.payload.code === 'ArrowUp' || x.payload.code === 'Space')
  ) || {}

  if (payload) {
    if (entities.physics.pause === true) {
      entities.physics.pause = false
    }

    if (entities.physics.pause === false) {
      Matter.Body.setVelocity(entities.Player.body, {
        x: entities.Player.body.velocity.x,
        y: -3,
      })
    }
  }

  if (entities.physics.pause === false) {
    Matter.Engine.update(engine, time.delta)
  }

  return { ...entities }
}

export default UpdatePlayer