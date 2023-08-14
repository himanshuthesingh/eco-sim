import Matter from 'matter-js'
import Entities from '../entities'

const Cleanup = (entities, { events, dispatch }) => {
  const restartEvents = events.filter(event => event.type === 'restart')
  if (restartEvents.length > 0) {
    Matter.Engine.clear(entities.physics.engine)
    return Entities(restartEvents[0].payload)
  }
  return entities
}

export default Cleanup