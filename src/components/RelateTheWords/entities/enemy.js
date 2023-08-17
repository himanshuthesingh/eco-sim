import React from 'react'
import Matter from 'matter-js'
import Tank from '../../../assets/tank-enemy.png'
import ExplosionSprite from '../../../assets/explosion.png'
import '../styles.css'

function EnemyRenderer(props) {
  const width = props.size[0]
  const height = props.size[1]

  const x = props.body.position.x - width / 2
  const y = props.body.position.y - height / 2

  const angleRad = ((45 - props.degree) * Math.PI) / 180
  const shadowX = Math.cos(angleRad) * 10
  const shadowY = Math.sin(angleRad) * 10

  let labelX = 0, labelY = 0
  if (props.index === 2 || props.index === 3) {
    labelX = x + 10
    labelY = y + 10
  }
  else if (props.index === 1 || props.index === 4) {
    labelX = x + 20
    labelY = y - 5
  }

  return (<>
    {props.dead &&
      <div
        id={`rw-enemy-dead-${props.index}`}
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 192,
          height: 192,
          background: `url(${ExplosionSprite}) ${0}px ${0}px`,
        }}
      ></div>
    }
    {!props.dead &&
      <>
        <img
          style={{
            position: 'absolute',
            left: x,
            top: y,
            width: width,
            height: height,
            transform: 'rotate(' + props.degree + 'deg)',
            filter: `drop-shadow(${shadowX}px ${shadowY}px 2px black)`
          }}
          id={`rw-enemy-${props.index}`}
          src={Tank}
          alt={`Enemy ${props.index}`}
        />
        <div
          className='rw-enemy-value'
          style={{
            position: 'absolute',
            left: labelX,
            top: labelY,
          }}
        >
          {props.value}
        </div>
      </>
    }
  </>)
}

const Enemy = (world, pos, size, angle, index, value, dead) => {
  const initialEnemy = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      isStatic: true,
      friction: 1,
      label: `Enemy_${index}`
    }
  )
  Matter.World.add(world, [initialEnemy])

  return {
    body: initialEnemy,
    size: [size.width, size.height],
    degree: angle,
    index, value, dead,
    renderer: <EnemyRenderer />,
  }
}

export default Enemy