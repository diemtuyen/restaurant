import config from 'config';
// import { authHeader } from '../helpers/auth-header';
import axios from 'axios';
import ApiEndpoints from '../constants/ApiEndpoints';
export const userService = {
    login,
    logout
};

function login(username, password) {
    let params = {
        'username': username,
        'password': password,
        'grant_type': 'password'
    };
    const searchParams = Object.keys(params).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');
    let url = `${config.apiUrl}/${ApiEndpoints.login}`;
    console.log('axios URL');
    return axios.post(url, searchParams).then(res=>{
        if (res.data.access_token) {
            console.log('axios access token OK');
            localStorage.setItem('user', JSON.stringify(res.data));
            return res.data;
        }
    }).catch(e=>{
        console.log(e);
    });
}

function logout() {
    // remove user from local storage to log user out
    console.log('axios logout ');
    localStorage.removeItem('user');
}
