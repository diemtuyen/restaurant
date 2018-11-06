import actionTypes from '../constants/actionTypes';

function userLoggedIn(username){
    return {
        type: actionTypes.USER_REGISTERED,
        username: username
    }
}

function userRegistered(username){
    return {
        type: actionTypes.USER_LOGGEDIN,
        username: username
    }
}

function logout(){
    return {
        type: actionTypes.USER_LOGOUT
    }
}

export function submitLogin(data){
    return dispatch => {
        return fetch(`/user/${data.username}`, { 
                method: 'POST', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(data), 
                mode: 'cors'})
            .then( (response) => {
                console.log('ko tim thay user nay');
                if (!response.ok) {
                    console.log('ko tim thay user nay');                    
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (data) => {
                localStorage.setItem('username', data.data.username);
                localStorage.setItem('token', data.data.tokenID);

                dispatch(userLoggedIn(data.data.username));
                console.log('co ton tai');  
            })        
            .catch( (e) => console.log(e) );
    }    
}

export function submitRegister(data){
    return dispatch => {
        return fetch('/user/', { 
            method: 'POST', 
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data), 
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (data) => {

                localStorage.setItem('username', data.data.username);
                localStorage.setItem('token', data.data.tokenID);

                dispatch(userLoggedIn(data.data.username));
            })        
            .catch( (e) => console.log(e) );
    }    
}

export function logoutUser() {
    return dispatch => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        dispatch(logout());
    }
}