import actionTypes from '../constants/booking.constants';
import { bookingService } from  '../services/booking.service';
import { tableService } from  '../services/table.service';
import { categoryService } from  '../services/category.service';
import { kindService } from  '../services/kind.service';
import { exceptService } from  '../services/except.service';
import { utilityService } from  '../services/utility.service';
import { history } from '../helpers/history';

export const bookingActions = {
    bookingAddTable,
    getItems,
    addOrder
};

function bookingAddTable(client, key) {
    return dispatch => {
        let action = actionTypes.BOOKING_SUCCESS;
        bookingService.bookingAddTable(client, key)
            .then(
                obj => {                  
                    dispatch(success(action, obj));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
}
function request(user) { return { type: actionTypes.LOGIN_REQUEST, user } }
function success(action, obj) {
    return { 
        type: action, 
        obj 
    } 
}
function failure(error) { return { type: actionTypes.LOGIN_FAILURE, error } }

function getItems() {
    return dispatch => {
        let action = actionTypes.GET_ITEMS;
        Promise.all([
            tableService.getItems(), 
            categoryService.getItems(), 
            kindService.getItems(), 
            exceptService.getItems(), 
            utilityService.getItems()])
            .then(
                obj => {
                    dispatch(success(action, obj));
                },
                error => {
                    console.log('fail');
                }
            );
    };
}

function successOrder(action, orderObj) {
    debugger;
    return { 
        type: action, 
        tableId: orderObj.table.id,
        details: orderObj.table.Details
    } 
}
function addOrder(orderObj) {
    return dispatch => {
        let action = actionTypes.ADD_ORDER_FOOD;
        bookingService.addOrder(orderObj)
            .then(
                obj => {
                    debugger;
                    dispatch(successOrder(action, orderObj));
                    history.push('/');
                },
                error => {
                    console.log('fail');
                }
            );
    };
}