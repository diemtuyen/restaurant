import { userConstants } from '../constants/user.constants';
import { userService } from  '../services/user.service';
import { history } from '../helpers/history';
import { commonActions } from './common.action';
export const userActions = {
    login,
    logout
};

function login(username, password) {
    return dispatch => {
        dispatch(commonActions.request(userConstants.LOGIN_REQUEST, { username }));
        userService.login(username, password)
            .then(
                user => {
                    dispatch(commonActions.success(userConstants.LOGIN_SUCCESS, user));
                    history.push('/');
                },
                error => {
                    dispatch(commonActions.failure(userConstants.LOGIN_FAILURE, error));
                    //dispatch(alertActions.error(error));
                }
            );
    };

    // function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    // function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    // function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}