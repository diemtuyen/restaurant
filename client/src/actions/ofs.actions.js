import _ from 'lodash';
import { commonActions } from './common.action';
import ofsActionType from '../constants/ofs.constants';
import { tableService } from  '../services/table.service';
import { foodService } from  '../services/food.service';
import { foodGroupService } from  '../services/foodgroup.service';
import { drinkService } from  '../services/drink.service';
import { kindService } from  '../services/kind.service';
import { exceptService } from  '../services/except.service';
import { utilityService } from  '../services/utility.service';
export const ofsActions = {
    getCategories, submitCategory, deleteCategory
};
const fnApi={
    FOODS:{
        add: foodService.addItem,
        update: foodService.updateItem,
        delete: foodService.deleteItem
    },
    TABLES:{
        add: tableService.addItem,
        update: tableService.updateItem,
        delete: tableService.deleteItem
    }
}
function success(action, type_action, catalog_name, request, response) {
    return { 
        type: action, 
        data:{
            catalog_name, type_action, request, response,
        }
    } 
}
// ------------ category -------------
function getCategories() {
    return dispatch => {
        let action = ofsActionType.CATALOG_REQUEST;
        Promise.all([
            tableService.getItems(),
            foodGroupService.getItems(),
            foodService.getItems(), 
            kindService.getItems(), 
            exceptService.getItems(), 
            utilityService.getItems(),
            drinkService.getItems()])
            .then(
                obj => {
                    dispatch({
                        type: ofsActionType.CATALOG_GETS,
                        data: obj
                    });
                },
                error => {
                    console.log('fail');
                }
            );
    };
}
function submitCategory(props, data) {
    return dispatch => {
        let action = ofsActionType.CATALOG_REQUEST;
        dispatch(commonActions.request(ofsActionType.CATALOG_REQUEST, data));
        let type_action = props.type_action;
        fnApi[props.catalogName.toUpperCase()][type_action](data).then(
            obj => {
                dispatch(success(ofsActionType.CATALOG_UPDATE_STORE, type_action, props.catalogName, data, obj));
                dispatch(commonActions.success(ofsActionType.CATALOG_SUCCESS, obj));
            },
            error => {
                dispatch(commonActions.failure(ofsActionType.CATALOG_FAILURE, data));
            }
        );
    };
}
function deleteCategory(id) {
    return
}
