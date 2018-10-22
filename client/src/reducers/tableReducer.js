import constants from '../constants/actionTypes'

var initialState = {
    tables: [],
    itemLoading: true
}

export default (state = initialState, action) => {

  var updated = Object.assign({}, state)

  switch(action.type) {

    case constants.NEWS_RECEIVED:
      updated['tables'] = action.news
      return updated

    case constants.NEWSITEM_LOADING:
      updated['itemLoading'] = true;
      return updated

    

    default:
      return state
    }
}