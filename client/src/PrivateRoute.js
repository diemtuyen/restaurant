import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userService } from  './services/user.service';
import {globalConstants} from './constants/global.constants';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        // userService.checkTokenExpired()
        localStorage.getItem(globalConstants.USER)
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)