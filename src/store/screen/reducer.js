import { actions } from './actions'

const screen = (state = { name: 'Home' }, action) => {
  switch (action.type) {
    case actions.setScreen:
      return { ...state, name: action.name }
    default:
      return state
  }
}

export default screen