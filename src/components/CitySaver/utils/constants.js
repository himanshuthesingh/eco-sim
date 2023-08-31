const getConstants = () => {
  const width = window.document.body.offsetWidth
  const height = window.document.body.offsetHeight * 0.92
  const screenHeight = window.document.body.offsetHeight

  return {
    WIDTH: width,
    HEIGHT: height,
    SCREEN_HEIGHT: screenHeight,
    OBSTACLE_WIDTH: 200,
    OBSTACLE_TOP_RANGE: { min: screenHeight * 0.2, max: screenHeight * 0.35 },
    OBSTACLE_BOTTOM_RANGE: { min: screenHeight * 0.55, max: screenHeight * 0.7 },
    OBJECTIVE: {
      MONEY: 1,
      FOOD: 2,
      EDUCATION: 3,
      SANITATION: 4,
      MEDICAL: 5,
      ENERGY: 6
    }
  }
}

export default getConstants