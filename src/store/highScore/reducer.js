import { actions } from './actions'

const highScore = (state = { relatedWords: 0, brainyQuest: 0, citySaver: 0 }, action) => {
  switch (action.type) {

    case actions.setRelatedWordsHighScore:
      return { ...state, relatedWords: action.score }

    case actions.setBrainyQuestHighScore:
      return { ...state, brainyQuest: action.score }

    case actions.setCitySaverHighScore:
      return { ...state, citySaver: action.score }

    default:
      return state
  }
}

export default highScore