import React from 'react'
import { object, string } from 'prop-types'
import Matter from 'matter-js'

import obstacleImg1 from '../../../assets/obstacle-1.gif'
import obstacleImg2 from '../../../assets/obstacle-2.gif'
import obstacleImg3 from '../../../assets/obstacle-3.gif'
import obstacleImg4 from '../../../assets/obstacle-4.gif'
import obstacleImg5 from '../../../assets/obstacle-5.gif'
import obstacleImg6 from '../../../assets/obstacle-6.gif'
import obstacleImg7 from '../../../assets/obstacle-7.gif'

const Obstacle = props => {
  const width = props.size.width
  const height = props.size.height
  const x = props.body.position.x - width / 2
  const y = props.body.position.y - height / 2
  const obstacleImages = [ obstacleImg1, obstacleImg2, obstacleImg3, obstacleImg4, obstacleImg5, obstacleImg6, obstacleImg7 ]

  return (
    <img
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height,
        transform: props.obstacleNum === 7 ? 'rotate(-141deg)' : 'rotate(0deg)'
      }}
      src={obstacleImages[props.obstacleNum-1]}
    />
  )
}

export default (world, type, position, size, index, createdOn, obstacleNum) => {
  const initialObstacle = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width * 0.6,
    size.height * 0.6,
    { isStatic: true, friction: 1, label: `Obstacle_${index}` },
  )
  Matter.World.add(world, [initialObstacle])

  return {
    body: initialObstacle,
    size, type, createdOn, obstacleNum, 
    updatedOn: createdOn,
    scored: false,
    renderer: <Obstacle />,
  }
}

Obstacle.propTypes = {
  size: object,
  body: object,
  color: string,
}