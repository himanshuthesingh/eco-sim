import React from 'react'
import { object, string } from 'prop-types'
import Matter from 'matter-js'

import obstacleImg1 from '../../../assets/obstacle_1.gif'
import obstacleImg2 from '../../../assets/obstacle_2.gif'
import obstacleImg3 from '../../../assets/obstacle_3.png'
import obstacleImg4 from '../../../assets/obstacle_4.gif'
import obstacleImg5 from '../../../assets/obstacle_5.gif'
import obstacleImg6 from '../../../assets/obstacle_6.gif'

const ObstacleRenderer = props => {
  const width = props.size.width
  const height = props.size.height
  const x = props.body.position.x - width / 2
  const y = props.body.position.y - height / 2
  const obstacleImages = [ obstacleImg1, obstacleImg2, obstacleImg3, obstacleImg4, obstacleImg5, obstacleImg6 ]

  return (
    <img
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height
      }}
      src={obstacleImages[props.obstacleNum-1]}
      alt={`Obstacle_${props.obstacleNum}`}
    />
  )
}

const Obstacle = (world, type, position, size, index, createdOn, obstacleNum) => {
  const bodyWidth = obstacleNum < 4 ? size.width * 0.6 : size.width * 0.4
  const bodyHeight = obstacleNum < 4 ? size.height * 0.6 : size.height * 0.4
  const initialObstacle = Matter.Bodies.rectangle(
    position.x,
    position.y,
    bodyWidth,
    bodyHeight,
    { isStatic: true, friction: 1, label: `Obstacle_${index}` },
  )
  Matter.World.add(world, [initialObstacle])

  return {
    body: initialObstacle,
    size, type, createdOn, obstacleNum, 
    updatedOn: createdOn,
    scored: false,
    renderer: <ObstacleRenderer />,
  }
}

ObstacleRenderer.propTypes = {
  size: object,
  body: object,
  color: string,
}

export default Obstacle