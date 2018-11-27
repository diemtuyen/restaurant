import actionTypes from '../constants/booking.constants';
import { bookingService } from  '../services/booking.service';
import { tableService } from  '../services/table.service';
import { categoryService } from  '../services/category.service';

export const bookingActions = {
    bookingAddTable,
    getItems
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
                    //dispatch(alertActions.error(error));
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
        Promise.all([tableService.getItems(),categoryService.getItems()])
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