import React from 'react'
import Matter from 'matter-js'
import BulletImage from '../../../assets/bullet.png'

function BulletRenderer(props) {
  const width = props.size[0]
  const height = props.size[1]
  const x = props.body.position.x - width / 2
  const y = props.body.position.y - height / 2

  return (
    <img 
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height,
        transform: 'rotate(' + props.degree + 'deg)',
        overflow: 'hidden'
      }}
      src={BulletImage} 
      alt={`Bullet_${props.index}`}
    />
  )
}

const Bullet = (world, pos, size, angle, index, step, updatedOn) => {
  const initialBullet = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: `Bullet_${index}`
    }
  )
  Matter.World.add(world, [initialBullet])

  return {
    body: initialBullet,
    size: [size.width, size.height],
    degree: angle,
    index: index,
    step: step,
    updatedOn,
    renderer: <BulletRenderer />,
  }
}

export default Bullet