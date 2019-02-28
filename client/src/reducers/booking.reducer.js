import bookingActionType from '../constants/booking.constants';
import _ from 'lodash';

var initialState = {
  orders:[],
  served:[],
  selectOrder: null,
  pageType: null
}

export function bookingReducer(state = initialState, action) {
  let stateClone = _.cloneDeep(state);
  switch (action.type) {
    case bookingActionType.MARK_DONE:
      let updated = Object.assign({}, state);
      updated = Object.assign(updated, {
        orders: _.map(updated.orders, order => order.rowGuid === action.obj.rowGuid ? _.assign({}, order, { statusId: 2 }) : order )
      }); 
      updated.served.push(_.find(updated.orders, {'statusId': 2}));
      updated.orders =_.filter(updated.orders, { 'statusId': 1 });   
      updated.selectOrder = _.first(updated.orders);
      return updated;
    case bookingActionType.ADD_ORDER:
      stateClone.orders =  Object.assign([], state.orders);
      stateClone.orders.push(action.obj);
      return stateClone;
    case bookingActionType.UPDATE_ORDER:
      stateClone.orders =  Object.assign([], state.orders);
      stateClone.orders.push(action.obj);
      return stateClone;
    case bookingActionType.GET_ORDERS:
      updated = Object.assign({}, state);      
      updated = Object.assign(updated, {
        orders: action.obj
      });
      updated.orders =_.filter(updated.orders, { 'statusId': 1 });
      // if (_.isUndefined(action.obj))
      //   window.location.reload();
      // if((_.isUndefined(updated.selectOrder) || _.isNull(updated.selectOrder)) && action.obj.length>0){
      //   updated = Object.assign(updated, {
      //     selectOrder: updated.orders[0]
      //   });
      // }
      return updated;
      //return Object.assign(state, {orders: action.obj});
    case bookingActionType.GET_ORDER:
      updated = Object.assign({}, state)
      updated['selectOrder'] =  action.obj;
      return updated;  
    case bookingActionType.SET_SELECT_ORDER:
      stateClone = _.cloneDeep(state);
      stateClone = Object.assign(stateClone, {
        selectOrder: action.obj
      });
      return stateClone;
    case bookingActionType.GET_SERVED:
      updated = Object.assign({}, state);      
      updated = Object.assign(updated, {
        served: action.obj
      });
      updated.served =_.filter(updated.served, { 'statusId': 2 });
      return updated;
    case bookingActionType.SET_PAGETYPE:
      stateClone = _.cloneDeep(state);
      stateClone = Object.assign(stateClone, {
        pageType: action.obj
      });
      return stateClone;
    default:
      return state
  }
}