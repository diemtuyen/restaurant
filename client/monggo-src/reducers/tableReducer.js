import actionTypes from '../constants/actionTypes'

var initialState = {
    tables: [],
    tableItem: {},
    tableItemLoading: true
}

export default (state = initialState, action) => {

  var updated = Object.assign({}, state);

  switch(action.type) {
    case actionTypes.ADD_TABLE:
      updated['tables'] = action.tables
      return updated

    case actionTypes.SHOW_TABLE:
      updated['tableItem'] = action.tableItem;
      updated['tableItemLoading'] = false;
      return updated
    
    case actionTypes.TABLE_LOADING:
      updated['tableItemLoading'] = true;
      return updated
    
    case actionTypes.ORDER_FOOD:
      var updatedFoods = Object.assign([], updated['tableItem'].foods);
      updatedFoods.push({"username": action.username, "noodle": action.noodle, "meat": action.meat, "reject": action.reject, "note": action.note, "count": action.count});     
      updated['tableItem'].foods = updatedFoods;
      return updated
    case actionTypes.BOOKING_ADD_TABLE_REQUEST:
      updated.books=action;
      return updated;
    default:
      return state
    }
}