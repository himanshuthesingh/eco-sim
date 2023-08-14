import React from 'react'
import { object, string } from 'prop-types'
import Matter from 'matter-js'

const Ceiling = props => {
  const width = props.size.width
  const height = props.size.height

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: width,
        height: height,
      }}
    />
  )
}

export default (world, color, position, size) => {
  const initialCeiling = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width,
    size.height,
    { isStatic: true, friction: 1, label: 'ceiling' },
  )
  Matter.World.add(world, [initialCeiling])

  return {
    body: initialCeiling,
    size, color,
    renderer: <Ceiling />,
  }
}

Ceiling.propTypes = {
  size: object,
  body: object,
  color: string,
}