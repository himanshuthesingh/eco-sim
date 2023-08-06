import { actions } from './actions'

const city = (state = { level: 1 }, action) => {
  switch (action.type) {
    case actions.setCityLevel:
      return { ...state, level: action.level }
    default:
      return state
  }
}

export default city