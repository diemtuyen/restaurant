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
  selectOrder: null,
  serves:[]
}

export function bookingReducer(state = initialState, action) {
  let stateClone = _.cloneDeep(state);
  switch (action.type) {
    case bookingActionType.MARK_DONE:
      stateClone.serves =  Object.assign([], state.serves);
      stateClone.serves.push(action.obj);
      _.remove(stateClone.orders, order => order.rowGuid === action.obj.rowGuid);
      return stateClone;
    case bookingActionType.ADD_ORDER:
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
      /*let updated = Object.assign({}, state);
      updated['tables'] =  action.obj[0];
      updated['foods'] =  action.obj[1];
      updated['kinds'] =  action.obj[2];
      updated['excepts'] =  action.obj[3];
      updated['utilities'] =  action.obj[4];
      return updated;*/
      let foodGroup = action.obj[1];
      let foods = action.obj[2];
      _.each(foods, function(f,i){
          let gr = _.find(foodGroup, ['id', f.foodGroupId]);
          f.groupName = _.isUndefined(gr) ? '' : gr.title;
      });
      let suggestNote = _.map(action.obj[5],function(itm){
        return{
          ...itm,
          newId: itm.id,
          groupId: 1,
          group:'B? th�m'
        }
      });
      const n = suggestNote.length+1;
      suggestNote = _.concat(suggestNote, _.map(action.obj[4], function(itm){
          return{
            ...itm,
            newId: n + itm.id,
            groupId: 2,
            group: 'Kh�ng th�m'
          }
      }));
      return Object.assign(state,{
        tables: action.obj[0],
        foodGroup,
        foods,
        kinds: action.obj[3],
        excepts: action.obj[4],
        utilities: action.obj[5],
        suggestNote
      });
    case bookingActionType.GET_ORDERS:
      let updated = Object.assign({}, state);
      updated = Object.assign(updated, {
        orders: action.obj
      });
      if((_.isUndefined(updated.selectOrder) || _.isNull(updated.selectOrder))&&action.obj.length>0){
        updated = Object.assign(updated, {
          selectOrder: action.obj[0]
        });
      }
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
      stateClone = _.cloneDeep(state);
      stateClone.served =  action.obj;
      return stateClone;
    default:
      return state
  }
}