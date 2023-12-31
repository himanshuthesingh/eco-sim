import React, { Component } from 'react'
import { object, string } from 'prop-types'
import Matter from 'matter-js'

import playerImg from '../../../assets/helicopter.gif'

class PlayerRenderer extends Component {
  render() {
    const width = this.props.size.width
    const height = this.props.size.height
    const x = this.props.body.position.x - width / 2
    const y = this.props.body.position.y - height / 2

    return (
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: width,
          height: height,
          backgroundImage: `url(${playerImg})`,
          backgroundSize: 'contain'
        }}
      />
    )
  }
}

const Player = (world, color, position, size) => {
  const initialPlayer = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width * 0.6,
    size.height * 0.6,
    { label: 'player', isSensor: true }
  );
  Matter.World.add(world, [initialPlayer]);

  return {
    body: initialPlayer,
    size, color,
    renderer: <PlayerRenderer />,
  }
}

PlayerRenderer.propTypes = {
  size: object,
  body: object,
  color: string,
}

export default Player