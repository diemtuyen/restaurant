import bookingActionType from '../constants/booking.constants';
import _ from 'lodash';

var initialState = {
  tables: [],
  categories: [],
  kinds: [],
  excepts: [],
  utilities:[]
}

export function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case bookingActionType.BOOKING_SUCCESS:
      let stateClone = _.cloneDeep(state);
      stateClone.books =  Object.assign([], state.books);
      stateClone.books.push(action.obj);
      return stateClone;
    case bookingActionType.ADD_ORDER_FOOD:
      debugger;
      stateClone = _.cloneDeep(state);
      stateClone.books =  Object.assign([], state.books);      
      stateClone.books.push(action.obj);
      return stateClone;
    case bookingActionType.GET_ITEMS:
      let updated = Object.assign({}, state)
      updated['tables'] =  action.obj[0];
      updated['categories'] =  action.obj[1];
      updated['kinds'] =  action.obj[2];
      updated['excepts'] =  action.obj[3];
      updated['utilities'] =  action.obj[4];
      return updated;
    default:
      return state
  }
}