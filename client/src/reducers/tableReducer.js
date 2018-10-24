import constants from '../constants/actionTypes'

var initialState = {
    tables: []
}

export default (state = initialState, action) => {

  var updated = Object.assign({}, state)

  switch(action.type) {
    case constants.ADD_TABLE:
      updated['tables'] = action.tables
      return updated

    /*case constants.TABLE_LOADING:
      updated['tableLoading'] = true;
      return updated
    */
    default:
      return state
    }
}