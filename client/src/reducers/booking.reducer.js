import bookingActionType from '../constants/booking.constants';
import _ from 'lodash';

var initialState = {
  tables: [],
  categories: [],
  kinds: [],
  excepts: [],
  utilities:[],
  orders:[],
  details:[]
}

export function bookingReducer(state = initialState, action) {
  let stateClone = _.cloneDeep(state);
  switch (action.type) {
    case bookingActionType.BOOKING_SUCCESS:
      stateClone.orders =  Object.assign([], state.orders);
      stateClone.orders.push(action.obj);
      return stateClone;
    case bookingActionType.ADD_ORDER_FOOD:
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
    case bookingActionType.GET_ITEMS:
      let updated = Object.assign({}, state)
      updated['tables'] =  action.obj[0];
      updated['categories'] =  action.obj[1];
      updated['kinds'] =  action.obj[2];
      updated['excepts'] =  action.obj[3];
      updated['utilities'] =  action.obj[4];
      return updated;
    case bookingActionType.COOKING_GET_ITEMS:
      updated = Object.assign({}, state)
      updated['orders'] =  action.obj;
      return updated;
    default:
      return state
  }
}