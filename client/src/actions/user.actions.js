import { userConstants } from '../constants/user.constants';
import { userService } from  '../services/user.service';
import { history } from '../helpers/history';

export const userActions = {
    login,
    logout
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        console.log('action dispatch request');
        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    console.log('action dispatch success');
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    console.log('action dispatch failure');                    
                    //dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    console.log('action logout');
    return { type: userConstants.LOGOUT };
}