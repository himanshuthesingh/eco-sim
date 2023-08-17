import React from 'react'
import { object, string } from 'prop-types'
import Matter from 'matter-js'

const FloorRenderer = props => {
  const width = props.size.width
  const height = props.size.height
  const y = props.body.position.y - height / 2

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: y,
        width: width,
        height: height,
      }} 
    />
  )
}

const Floor = (world, color, position, size) => {
  const initialFloor = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width,
    size.height,
    { isStatic: true, friction: 1, label: 'floor' },
  )
  Matter.World.add(world, [initialFloor])

  return {
    body: initialFloor,
    size, color,
    renderer: <FloorRenderer />,
  }
}

FloorRenderer.propTypes = {
  size: object,
  body: object,
  color: string,
}

export default Floor