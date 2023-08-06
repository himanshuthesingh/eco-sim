export const actions = {
  setCityLevel: 'SET::CITY_LEVEL'
}

export const setCityLevel = level => ({ type: actions.setCityLevel, level: level })

export default actions