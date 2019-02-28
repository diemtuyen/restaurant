import ofsActionType from '../constants/ofs.constants';
import _ from 'lodash';

var initialState = {
    cataglog:{
        foods:[]
    },
    catalogItem:{}
}

export function ofsReducer(state = initialState, action) {
  switch (action.type) {
    case ofsActionType.CATALOG_GETS:
        let foodGroup = action.data[1];
        let foods = action.data[2];
        _.each(foods, function(f,i){
            let gr = _.find(foodGroup, ['id', f.foodGroupId]);
            f.groupName = _.isUndefined(gr) ? '' : gr.title;
        });
        let suggestNote = _.map(action.data[5],function(itm){
            return{
            ...itm,
            newId: itm.id,
            groupId: 1,
            group:'Cho them'
            }
        });
        const n = suggestNote.length+1;
        suggestNote = _.concat(suggestNote, _.map(action.data[4], function(itm){
            return{
                ...itm,
                newId: n + itm.id,
                groupId: 2,
                group: 'Khong cho'
            }
        }));
        return {
            ...state,
            cataglog:{
                foodGroup, foods,suggestNote,
                tables: action.data[0],
                kinds: action.data[3],
                excepts: action.data[4],
                utilities: action.data[5],
                drinks: action.data[6]
            }
        }
    case ofsActionType.CATALOG_UPDATE_STORE:
        let stateClone = _.cloneDeep(state);
        const type_action = action.data.type_action;
        const catalog_name = action.data.catalog_name;
        let cl = stateClone.cataglog[catalog_name.toLowerCase()];
        const request_data = action.data.request, response_data = action.data.response
        if(type_action=='add'){
            cl.push(response_data);
        }else if(type_action === 'update'){
            const index = cl.findIndex(obj => obj.id === action.data.request.id);
            cl[index]=response_data;
        }else if(type_action === 'delete'){
            const index = cl.findIndex(obj => obj.id === action.data.request.id);
            cl = cl.splice(index, 1);
        }
        return stateClone;
    case ofsActionType.CATALOG_SELECTED:
        return {...state, catalogItem:action.data}
    default:
      return state
  }
}