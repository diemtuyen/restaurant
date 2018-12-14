import bookingActionType from '../constants/booking.constants';
import _ from 'lodash';

var initialState = {
  tables: [],
  //categories: [],
  foods:[],
  kinds: [],
  excepts: [],
  utilities:[],
  orders:[],
  details:[]
}

export function bookingReducer(state = initialState, action) {
  let stateClone = _.cloneDeep(state);
  switch (action.type) {
    // case bookingActionType.BOOKING_SUCCESS:
    //   stateClone.orders =  Object.assign([], state.orders);
    //   stateClone.orders.push(action.obj);
    //   return stateClone;
    case bookingActionType.MARK_DONE:
      debugger;
      stateClone.orders =  Object.assign([], state.orders);
      _.remove(stateClone.orders, function (e) {
          return e.hp <= 0;
        });
      return stateClone;
    case bookingActionType.ADD_ORDER:
      // stateClone = _.cloneDeep(state);
      // stateClone.books =  Object.assign([], state.books); 
      // stateClone.books.push(action.obj);
      // return stateClone;
      stateClone.orders =  Object.assign([], state.orders);
      stateClone.orders.push(action.obj);
      return stateClone;
    case bookingActionType.TABLE_ADD_NEW:
      stateClone = _.cloneDeep(state);
      stateClone.tables.push(action.obj);
      return stateClone;
    case bookingActionType.TABLE_DELETE:
      stateClone = _.cloneDeep(state);
      _.remove(stateClone.tables, table => table.id === action.obj.id);
      return stateClone;
    case bookingActionType.CATEGORY_ADD_NEW:
      stateClone = _.cloneDeep(state);
      stateClone.categories.push(action.obj);
      return stateClone;
    case bookingActionType.KIND_ADD_NEW:
      stateClone = _.cloneDeep(state);
      stateClone.kinds.push(action.obj);
      return stateClone;
    case bookingActionType.EXCEPT_ADD_NEW:
      stateClone = _.cloneDeep(state);
      stateClone.excepts.push(action.obj);
      return stateClone;
    case bookingActionType.UTILITY_ADD_NEW:
      stateClone = _.cloneDeep(state);
      stateClone.utilities.push(action.obj);
      return stateClone;
    case bookingActionType.GET_CATEGORIES:
    debugger;
      let updated = Object.assign({}, state)
      updated['tables'] =  action.obj[0];
      updated['foods'] =  action.obj[1];
      updated['kinds'] =  action.obj[2];
      updated['excepts'] =  action.obj[3];
      updated['utilities'] =  action.obj[4];
      return updated;
    case bookingActionType.GET_ORDERS:
      updated = Object.assign({}, state)
      updated['orders'] =  action.obj;
      return updated;
    case bookingActionType.GET_SERVED:
      stateClone = _.cloneDeep(state);
      stateClone.served =  action.obj;
      return stateClone;
    default:
      return state
  }
}