import bookingActionType from '../constants/booking.constants';
import _ from 'lodash';

var initialState = {
  tables: [],
  foods:[],
  kinds: [],
  excepts: [],
  utilities:[],
  orders:[],
  served:[],
  selectOrder: null,
  pageType: null,
  currentTable: null,
  currentDetails: null
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
      updated = Object.assign({}, state);      
      updated = Object.assign(updated, {
        orders: action.obj
      });
      updated.orders =_.filter(updated.orders, { 'statusId': 1 });
      // if (_.isUndefined(action.obj))
      //   window.location.reload();
      if((_.isUndefined(updated.selectOrder) || _.isNull(updated.selectOrder)) && action.obj.length>0){
        updated = Object.assign(updated, {
          selectOrder: updated.orders[0]
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
    case bookingActionType.SET_CURRENT_DETAILS:
      stateClone = _.cloneDeep(state);
      stateClone = Object.assign(stateClone, {
        currentDetails: action.obj
      });
      return stateClone;
    case bookingActionType.SET_CURRENT_TABLE:
      stateClone = _.cloneDeep(state);
      stateClone = Object.assign(stateClone, {
        currentTable: action.obj
      });
      return stateClone;
    default:
      return state
  }
}