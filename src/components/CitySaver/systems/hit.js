const SupplyHit = (entities, { events, dispatch, window, time }) => {
  const supplyHitEvents = events.filter(event => event.type === 'supplyHit')
  if (supplyHitEvents.length > 0) {
    const supply = supplyHitEvents[0].target
    if (entities[supply]) {
      dispatch({ type: 'score', value: Number(supply.slice(7)) })
      entities[supply].scored = true
    }
  }

  const obstacleHitEvents = events.filter(event => event.type === 'obstacleHit')
  if (obstacleHitEvents.length > 0) {
    dispatch({ type: 'gameOver' })
  }

  return entities
}

export default SupplyHit