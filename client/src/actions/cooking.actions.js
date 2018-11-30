import actionTypes from '../constants/booking.constants';
import { orderService } from  '../services/order.service';
import { history } from '../helpers/history';

export const cookingActions = {
    getItems
};
function success(action, obj) {
    return { 
        type: action, 
        obj 
    } 
}
function getItems() {
    return dispatch => {
        let action = actionTypes.COOKING_GET_ITEMS;       
        orderService.getItems()
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
