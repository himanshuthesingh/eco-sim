export const actions = {
  setRelatedWordsHighScore: 'SET::RELATED_WORDS_HIGH_SCORE',
  setBrainyQuestHighScore: 'SET::BRAINY_QUEST_HIGH_SCORE',
  setCitySaverHighScore: 'SET::CITY_SAVER_HIGH_SCORE'
}

export const setRelatedWordsHighScore = score => ({ type: actions.setRelatedWordsHighScore, score })
export const setBrainyQuestHighScore = score => ({ type: actions.setBrainyQuestHighScore, score })
export const setCitySaverHighScore = score => ({ type: actions.setCitySaverHighScore, score })

export default actions