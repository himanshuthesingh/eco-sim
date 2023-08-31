export const actions = {
  setRelateTheWordsQuestions: 'SET::RTW_QUESTIONS',
  setBrainyQuestQuestions: 'SET::BQ_QUESTIONS',
  setRelateTheWordsDefaultQuestions: 'SET::RTW_DEFAULT_QUESTIONS',
  setBrainyQuestDefaultQuestions: 'SET::BQ_DEFAULT_QUESTIONS',
}

export const setRelateTheWordsQuestions = questions => ({ type: actions.setRelateTheWordsQuestions, questions })
export const setBrainyQuestQuestions = questions => ({ type: actions.setBrainyQuestQuestions, questions })
export const setRelateTheWordsDefaultQuestions = () => ({ type: actions.setRelateTheWordsDefaultQuestions })
export const setBrainyQuestDefaultQuestions = () => ({ type: actions.setBrainyQuestDefaultQuestions })

export default actions