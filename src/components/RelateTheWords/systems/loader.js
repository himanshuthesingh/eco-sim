import { ENEMY_WIDTH, ENEMY_HEIGHT } from '../utils/constants'
import Matter from 'matter-js'

const Loader = (entities, { window }) => {
  const gameScreen = document.getElementById('rw-game-engine')
  if (gameScreen) {

    const playerX = (gameScreen.offsetWidth * 0.45) + gameScreen.offsetLeft
    const playerY = (gameScreen.offsetHeight * 0.45) + gameScreen.offsetTop
    Matter.Body.setPosition(entities.Player.body, { x: playerX, y: playerY })

    if (Object.keys(entities).includes('Enemy_1')) {
      const enemy1X = (gameScreen.offsetWidth * 0.1) + gameScreen.offsetLeft
      const enemy1Y = (gameScreen.offsetHeight * 0.15) + gameScreen.offsetTop
      Matter.Body.setPosition(entities.Enemy_1.body, { x: enemy1X, y: enemy1Y })
    }

    if (Object.keys(entities).includes('Enemy_2')) {
      const enemy2X = gameScreen.offsetWidth - ENEMY_WIDTH + gameScreen.offsetLeft
      const enemy2Y = (gameScreen.offsetHeight * 0.15) + gameScreen.offsetTop
      Matter.Body.setPosition(entities.Enemy_2.body, { x: enemy2X, y: enemy2Y })
    }

    if (Object.keys(entities).includes('Enemy_3')) {
      const enemy3X = (gameScreen.offsetWidth * 0.1) + gameScreen.offsetLeft
      const enemy3Y = (gameScreen.offsetHeight * 0.93) - ENEMY_HEIGHT / 2 + gameScreen.offsetTop
      Matter.Body.setPosition(entities.Enemy_3.body, { x: enemy3X, y: enemy3Y })
    }

    if (Object.keys(entities).includes('Enemy_4')) {
      const enemy4X = gameScreen.offsetWidth - ENEMY_WIDTH + gameScreen.offsetLeft
      const enemy4Y = (gameScreen.offsetHeight * 0.93) - ENEMY_HEIGHT / 2 + gameScreen.offsetTop
      Matter.Body.setPosition(entities.Enemy_4.body, { x: enemy4X, y: enemy4Y })
    }

    var playerElement = window.document.getElementById('rw-player')
    var enemy1Element = window.document.getElementById('rw-enemy-1')
    var enemy2Element = window.document.getElementById('rw-enemy-2')
    var enemy3Element = window.document.getElementById('rw-enemy-3')
    var enemy4Element = window.document.getElementById('rw-enemy-4')

    if (playerElement) {
      var playerElementX = playerElement.offsetLeft + playerElement.offsetWidth / 2
      var playerElementY = playerElement.offsetTop + playerElement.offsetHeight / 2

      if (enemy1Element && Object.keys(entities).includes('Enemy_1')) {
        //Enemy 1 angle
        var enemy1ElementX = enemy1Element.offsetLeft + enemy1Element.offsetWidth / 2
        var enemy1ElementY = enemy1Element.offsetTop + enemy1Element.offsetHeight / 2
        var dX1 = enemy1ElementX - playerElementX
        var dY1 = enemy1ElementY - playerElementY
        var degree1 = Math.atan(- dX1 / dY1) * 180 / Math.PI
        if (dY1 > 0) { degree1 += 180 }
        degree1 += 45
        entities.Enemy_1.degree = degree1
      }

      if (enemy2Element && Object.keys(entities).includes('Enemy_2')) {
        //Enemy 2 angle
        var enemy2ElementX = enemy2Element.offsetLeft + enemy2Element.offsetWidth / 2
        var enemy2ElementY = enemy2Element.offsetTop + enemy2Element.offsetHeight / 2
        var dX2 = enemy2ElementX - playerElementX
        var dY2 = enemy2ElementY - playerElementY
        var degree2 = Math.atan(- dX2 / dY2) * 180 / Math.PI
        if (dY2 > 0) { degree2 += 180 }
        degree2 += 45
        entities.Enemy_2.degree = degree2
      }
      
      if (enemy3Element && Object.keys(entities).includes('Enemy_3')) {
        //Enemy 3 angle
        var enemy3ElementX = enemy3Element.offsetLeft + enemy3Element.offsetWidth / 2
        var enemy3ElementY = enemy3Element.offsetTop + enemy3Element.offsetHeight / 2
        var dX3 = enemy3ElementX - playerElementX
        var dY3 = enemy3ElementY - playerElementY
        var degree3 = Math.atan(- dX3 / dY3) * 180 / Math.PI
        if (dY3 > 0) { degree3 += 180 }
        degree3 += 45
        entities.Enemy_3.degree = degree3
      }
      
      if (enemy4Element && Object.keys(entities).includes('Enemy_4')) {
        //Enemy 4 angle
        var enemy4ElementX = enemy4Element.offsetLeft + enemy4Element.offsetWidth / 2
        var enemy4ElementY = enemy4Element.offsetTop + enemy4Element.offsetHeight / 2
        var dX4 = enemy4ElementX - playerElementX
        var dY4 = enemy4ElementY - playerElementY
        var degree4 = Math.atan(- dX4 / dY4) * 180 / Math.PI
        if (dY4 > 0) { degree4 += 180 }
        degree4 += 45
        entities.Enemy_4.degree = degree4
      }
    }
  }

  return entities
}

export default Loader