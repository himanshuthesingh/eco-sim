const Aim = (entities, { window, input }) => {
  const { payload } = input.find(x => x.name === 'onMouseMove') || {}
  if (payload) {
    var player = window.document.getElementById('rw-player')
    if (player) {
      var playerX = player.offsetLeft + player.offsetWidth / 2
      var playerY = player.offsetTop + player.offsetHeight / 2
      var dX = playerX - payload.clientX
      var dY = playerY - payload.clientY
      var degree = Math.atan(- dX / dY) * 180 / Math.PI
      if (dY > 0) { degree += 180 }
      degree -= 90

      const playerEntity = entities.Player
      playerEntity.degree = degree
      return { ...entities, Player: playerEntity }
    }
  }
  return entities
}

export default Aim