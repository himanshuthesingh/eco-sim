import { actions } from './actions'

const player = (state = { name: '' }, action) => {
  switch (action.type) {
    case actions.setName:
      return { ...state, name: action.name }
    default:
      return state
  }
}

export default player