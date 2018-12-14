import actionTypes from '../constants/booking.constants';
import { bookingService } from  '../services/booking.service';
import { tableService } from  '../services/table.service';
import { foodService } from  '../services/food.service';
import { kindService } from  '../services/kind.service';
import { exceptService } from  '../services/except.service';
import { utilityService } from  '../services/utility.service';
import { history } from '../helpers/history';

export const adminActions = {
    addTable, deleteTable, updateTable,
    addCategory, deleteCategory, updateCategory,
    addKind, deleteKind, updateKind,
    addExcept, deleteExcept, updateExcept,
    addUtility, deleteUtility, updateUtility,
};

function success(action, orderObj) {
    return { 
        type: action, 
        obj:orderObj
    } 
}
// ------------ table -------------
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
// ------------ category -------------
function addCategory(orderObj) {
    return dispatch => {
        let action = actionTypes.CATEGORY_ADD_NEW;
        foodService.addItem(orderObj)
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
function deleteCategory(id) {
    return
}
function updateCategory(orderObj) {
    return
}
// ------------ kind -------------
function addKind(orderObj) {
    return dispatch => {
        let action = actionTypes.KIND_ADD_NEW;
        kindService.addItem(orderObj)
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
function deleteKind(id) {
    return
}
function updateKind(orderObj) {
    return
}
// ------------ except -------------
function addExcept(orderObj) {
    return dispatch => {
        let action = actionTypes.EXCEPT_ADD_NEW;
        exceptService.addItem(orderObj)
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
function deleteExcept(id) {
    return
}
function updateExcept(orderObj) {
    return
}
// ------------ utility -------------
function addUtility(orderObj) {
    return dispatch => {
        let action = actionTypes.UTILITY_ADD_NEW;
        utilityService.addItem(orderObj)
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
function deleteUtility(id) {
    return
}
function updateUtility(orderObj) {
    return
}