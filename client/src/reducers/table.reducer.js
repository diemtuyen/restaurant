import bookingActionType from '../constants/booking.constants';
import _ from 'lodash';
export function bookingReducer(state = {}, action) {
  switch (action.type) {
    case bookingActionType.BOOKING_SUCCESS:
        debugger;   
        let stateClone = _.cloneDeep(state);
        stateClone.books =  Object.assign([], state.books);
        stateClone.books.push(action.obj);
        return stateClone;
    default:
        return state
  }
}