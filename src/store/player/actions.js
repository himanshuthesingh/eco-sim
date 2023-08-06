export const actions = {
  setName: 'SET::PLAYER_NAME',
  setCoins: 'SET::PLAYER_COIN'
}

export const setName = name => ({ type: actions.setName, name: name })
export const setCoins = coins => ({ type: actions.setCoins, coins: coins })

export default actions