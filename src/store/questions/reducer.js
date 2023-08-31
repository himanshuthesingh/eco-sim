import { actions } from './actions'
import rtwData from '../../data/relatedWords.json'
import bqData from '../../data/brainyQuest.json'

const initialQuestions = {
  relateTheWords: rtwData,
  brainyQuest: bqData
}

const questions = (state = initialQuestions, action) => {
  switch (action.type) {
    case actions.setRelateTheWordsQuestions:
      return { ...state, relateTheWords: action.questions }
    case actions.setBrainyQuestQuestions:
      return { ...state, brainyQuest: action.questions }
    case actions.setRelateTheWordsDefaultQuestions:
      return { ...state, relateTheWords: rtwData }
    case actions.setBrainyQuestDefaultQuestions:
      return { ...state, brainyQuest: bqData }
    default:
      return state
  }
}

export default questions