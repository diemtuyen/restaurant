import constants from '../constants/actionTypes'

var initialState = {
    tables: [],
    tableItem: {},
    tableItemLoading: true
}

export default (state = initialState, action) => {

  var updated = Object.assign({}, state)

  switch(action.type) {
    case constants.ADD_TABLE:
      updated['tables'] = action.tables
      return updated

    case constants.SHOW_TABLE:
      updated['tableItem'] = action.tableItem;
      updated['tableItemLoading'] = false;
      return updated
    
    case constants.TABLE_LOADING:
      updated['tableItemLoading'] = true;
      return updated
    
    case constants.ORDER_FOOD:
      var updatedFoods = Object.assign([], updated['tableItem'].foods);
      updatedFoods.push({"body": action.body});
      updated['tableItem'].foods = updatedFoods;
      return updated  
    
    default:
      return state
    }
}