export const actions = {
  setScreen: 'SET::SCREEN_NAME',
}

export const setScreen = name => ({ type: actions.setScreen, name: name })

export default actions