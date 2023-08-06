import { actions } from './actions'

const player = (state = { name: '', coins: 0 }, action) => {
  switch (action.type) {
    case actions.setName:
      return { ...state, name: action.name }
    case actions.setCoins:
      return { ...state, coins: action.coins }
    default:
      return state
  }
}

export default player