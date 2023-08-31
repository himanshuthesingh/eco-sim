import React from 'react'
import { object, string } from 'prop-types'
import Matter from 'matter-js'

import getConstants from '../utils/constants'

import moneySupplyImg from '../../../assets/money-supply.png'
import educationalSupplyImg from '../../../assets/educational-supply.png'
import cleaningSupplyImg from '../../../assets/cleaning-supply.png'
import foodSupplyImg from '../../../assets/food-supply.png'
import medicalSupplyImg from '../../../assets/medical-supply.png'
import energySupplyImg from '../../../assets/energy-supply.png'

const SupplyRenderer = props => {
  const width = props.size.width
  const height = props.size.height
  const x = props.body.position.x - width / 2
  const y = props.body.position.y - height / 2
  const displayStyle = props.scored ? { display: 'none' } : {}

  const Constants = getConstants()

  let supplyImg = ''

  switch (props.objective) {
    case Constants.OBJECTIVE.MONEY:
      supplyImg = moneySupplyImg
      break
    case Constants.OBJECTIVE.FOOD:
      supplyImg = foodSupplyImg
      break
    case Constants.OBJECTIVE.EDUCATION:
      supplyImg = educationalSupplyImg
      break
    case Constants.OBJECTIVE.ENERGY:
      supplyImg = energySupplyImg
      break
    case Constants.OBJECTIVE.MEDICAL:
      supplyImg = medicalSupplyImg
      break
    case Constants.OBJECTIVE.SANITATION:
      supplyImg = cleaningSupplyImg
      break
    default:
      supplyImg = moneySupplyImg
  }


  return (
    <img
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height,
        ...displayStyle
      }}
      src={supplyImg}
      alt={`Supply`}
    />
  )
}

const Supply = (world, type, position, size, index, createdOn, objective) => {
  const initialSupply = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width * 0.8,
    size.height * 0.8,
    { isStatic: true, friction: 1, label: `Supply_${index}`, isSensor: true },
  )
  Matter.World.add(world, [initialSupply])

  return {
    body: initialSupply,
    size, type, createdOn,
    updatedOn: createdOn,
    objective,
    scored: false,
    renderer: <SupplyRenderer />,
  }
}

SupplyRenderer.propTypes = {
  size: object,
  body: object,
  color: string,
}

export default Supply