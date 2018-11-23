import actionTypes from '../constants/booking.constants';
import { bookingService } from  '../services/booking.service';

export const bookingActions = {
    bookingAddTable
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
    debugger;
    return { 
        type: action, 
        obj 
    } 
}
function failure(error) { return { type: actionTypes.LOGIN_FAILURE, error } }