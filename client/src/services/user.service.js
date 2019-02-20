import config from 'config';
// import { authHeader } from '../helpers/auth-header';
import axios from 'axios';
import ApiEndpoints from '../constants/ApiEndpoints';
import {common} from '../helpers/common';
import {globalConstants} from '../constants/global.constants';
export const userService = {
    login,
    logout,
    refreshToken,
    getItems,
    addItem,
    deleteItem,
    updateItem,
    checkTokenExpired
};

function login(username, password) {
    let params = {
        'username': username,
        'password': password,
        'grant_type': 'password',
        'client_id': 'web'
    };
    const searchParams = Object.keys(params).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');
    let url = `${config.apiUrl}/${ApiEndpoints.login}`;
    return axios.post(url, searchParams).then(res=>{
        if (res.data.access_token) {
            localStorage.setItem(globalConstants.USER, JSON.stringify(res.data));
            return res.data;
        }
    }).catch(e=>{
        console.log(e);
    });
}
function refreshToken(oldRequest){
    let params = {
        'grant_type': 'refresh_token',
        'client_id': 'web',
        'refresh_token': common.getRefreshToken()
    };
    const searchParams = Object.keys(params).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');
    let url = `${config.apiUrl}/${ApiEndpoints.login}`;
    localStorage.removeItem(globalConstants.USER);
    return axios.post(url, searchParams).then(res=>{
        if (res.data.access_token) {
            localStorage.setItem(globalConstants.USER, JSON.stringify(res.data));
        }
        return Promise.resolve({
            response: res,
            request: oldRequest
        });
    }).catch(e=>{
        return Promise.reject(e);
    });
}
function checkTokenExpired(){
    let token = localStorage.getItem(globalConstants.USER);
    token = JSON.parse(token);
    if( new Date(token[".expires"]) > new Date() ){
        console.log('token expires OK');
        return true;
    }
    console.log('token expired !!!!!!!!!!!!!!');
    return false;
}
function logout() {
    localStorage.removeItem(globalConstants.USER);
}
function getItems() {
    let url = `${config.apiUrl}/${ApiEndpoints.user}/items`;
    return axios.get(url).then(res=>{        
        return res.data.content.items;
    }).catch(e=>{
        console.log(e);
    });
}
function addItem(obj) {
    console.log(obj); 
    let url = `${config.apiUrl}/${ApiEndpoints.user}`;
    return axios.post(url, obj).then(res=>{
        console.log(res.data.content);
        Promise.resolve(res.data.content);
    },e=>{
        Promise.reject(e);
    });
}
function deleteItem(obj) {
    console.log(obj); 
    let url = `${config.apiUrl}/${ApiEndpoints.user}`;
    return axios.delete(url, { data: { id: obj.id } }).then(res=>{
        console.log(res.data.content);
    });
}
function updateItem(obj) {
    console.log(obj); 
    let url = `${config.apiUrl}/${ApiEndpoints.user}`;
    return axios.put(url, { data: { obj } }).then(res=>{
        console.log(res.data.content);
        Promise.resolve(res.data.content);
    },e=>{
        Promise.reject(e);
    });
}
