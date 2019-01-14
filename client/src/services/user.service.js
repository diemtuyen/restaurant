import config from 'config';
// import { authHeader } from '../helpers/auth-header';
import axios from 'axios';
import ApiEndpoints from '../constants/ApiEndpoints';
export const userService = {
    login,
    logout,
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
function checkTokenExpired(){
    let token = localStorage.getItem('user');
    token = JSON.parse(token);
    if( new Date(token[".expires"]) > new Date() ){
        console.log('token expires OK');
        return true;
    }
    console.log('token expired !!!!!!!!!!!!!!');
    return false;
}
function logout() {
    // remove user from local storage to log user out
    console.log('axios logout ');
    localStorage.removeItem('user');
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
