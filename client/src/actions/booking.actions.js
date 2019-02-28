import actionTypes from '../constants/booking.constants';
import { bookingService } from  '../services/booking.service';

export const bookingActions = {
    getOrder,
    setSelectOrder,
    addOrder,
    updateOrder,
    getOrders,
    markDone,
    getServed,
    setPageType
};
function getServed() {
    return dispatch => {
        let action = actionTypes.GET_SERVED;       
        bookingService.getItems()
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
function markDone(obj) {
    return dispatch => {
        let action = actionTypes.MARK_DONE;
        dispatch(success(action, obj));
    };
}
function addOrder(client, key) {
    return dispatch => {
        let action = actionTypes.ADD_ORDER;
        bookingService.getOrder(client, key)
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
function getOrder(key) {
    return dispatch => {
        let action = actionTypes.GET_ORDER;
        bookingService.getOrder(key)
            .then(
                obj => {                  
                    dispatch(success(action, obj));
                },
                error => {
                    console.log('cannot get data ' + error)
                }
            );
    };
}
function setSelectOrder(item) {
    return dispatch => {
        let action = actionTypes.SET_SELECT_ORDER;
        dispatch(success(action, item));
    };
}
function setPageType(obj) {
    return dispatch => {
        let action = actionTypes.SET_PAGETYPE;
        dispatch(success(action, obj));
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

function successOrder(action, orderObj) {
    return { 
        type: action, 
        obj:orderObj
    } 
}
function addOrder(orderObj) {
    return dispatch => {
        let action = actionTypes.ADD_ORDER;
        bookingService.addOrder(orderObj)
            .then(
                obj => {
                    dispatch(successOrder(action, orderObj));
                },
                error => {
                    console.log('fail');
                }
            );
    };
}
function updateOrder(orderObj) {
    return dispatch => {
        let action = actionTypes.UPDATE_ORDER;
        bookingService.updateOrder(orderObj)
            .then(
                obj => {
                    dispatch(successOrder(action, orderObj));
                },
                error => {
                    console.log('fail');
                }
            );
    };
}
function success(action, obj) {
    return { 
        type: action, 
        obj
    }
}
function getOrders() {
    return dispatch => {
        let action = actionTypes.GET_ORDERS;       
        bookingService.getItems()
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