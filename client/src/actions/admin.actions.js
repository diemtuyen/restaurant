import actionTypes from '../constants/booking.constants';
import { bookingService } from  '../services/booking.service';
import { tableService } from  '../services/table.service';
import { categoryService } from  '../services/category.service';
import { kindService } from  '../services/kind.service';
import { exceptService } from  '../services/except.service';
import { utilityService } from  '../services/utility.service';
import { history } from '../helpers/history';

export const adminActions = {
    addTable,
    deleteTable,
    updateTable
};

function success(action, orderObj) {
    return { 
        type: action, 
        obj:orderObj
    } 
}
function addTable(orderObj) {
    return dispatch => {
        let action = actionTypes.TABLE_ADD_NEW;
        tableService.addItem(orderObj)
            .then(
                obj => {
                    dispatch(success(action, orderObj));
                },
                error => {
                    console.log('fail');
                }
            );
    };
}
function deleteTable(id) {
    return dispatch => {
        let action = actionTypes.TABLE_DELETE;
        tableService.deleteItem(id)
            .then(
                obj => {
                    dispatch(success(action, id));
                },
                error => {
                    console.log('fail');
                }
            );
    };
}
function updateTable(orderObj) {
    return dispatch => {
        let action = actionTypes.TABLE_UPDATE;
        tableService.updateItem(orderObj)
            .then(
                obj => {
                    dispatch(success(action, orderObj));
                },
                error => {
                    console.log('fail');
                }
            );
    };
}