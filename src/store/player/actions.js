export const actions = {
  setName: 'SET::PLAYER_NAME',
}

export const setName = name => ({ type: actions.setName, name: name })

export default actions