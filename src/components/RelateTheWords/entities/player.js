import React from 'react'
import Matter from 'matter-js'
import Tank from '../../../assets/tank-player.png'

function PlayerRenderer(props) {
  const width = props.size[0]
  const height = props.size[1]
  const x = props.body.position.x - width / 2
  const y = props.body.position.y - height / 2
  const angleRad = ((45 - props.degree) * Math.PI) / 180
  const shadowX = Math.cos(angleRad) * 10
  const shadowY = Math.sin(angleRad) * 10

  return (
    <img 
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height,
        transform: 'rotate(' + props.degree + 'deg)',
        filter: `drop-shadow(${shadowX}px ${shadowY}px 2px black)`,
        overflow: 'hidden'
      }}
      id='rw-player' 
      src={Tank} 
      alt='Player' 
    />
  )
}

const Player = (world, pos, size) => {
  const initialPlayer = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
  );
  Matter.World.add(world, [initialPlayer])

  return {
    body: initialPlayer,
    size: [size.width, size.height],
    degree: 0, dontShoot: false,
    renderer: <PlayerRenderer />,
  }
}

export default Player