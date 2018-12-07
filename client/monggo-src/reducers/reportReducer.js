import constants from '../constants/actionTypes'

var initialState = {
    reports: []
}

export default (state = initialState, action) => {

  var updated = Object.assign({}, state)

  switch(action.type) {
    
    case constants.ADD_RECORD:
      updated['reports'] = action.reports;    
      return updated
    
    default:
      return state
    }
}