import axios from 'axios';
import {userService} from '../services/user.service';
import {common} from '../helpers/common';
import Axios from 'axios';
import { userActions } from '../actions/user.actions';
import {globalConstants} from '../constants/global.constants';
const baseApiAddress = ['/token']
axios.defaults.baseURL="/";

export default {
    setupInterceptors: (store, history) => {  
        axios.interceptors.response.use(response => {
            return response;
        }, error => {  
            if (error.response.status === 401) {
                const rf = localStorage.getItem(globalConstants.REFRESHING_TOKEN);                
                if(rf==='false'||rf===null){
                    localStorage.setItem(globalConstants.REFRESHING_TOKEN, true);
                    window.restaurant.refresh_token= userService.refreshToken(error.config);
                    //https://stackoverflow.com/questions/51563821/axios-interceptors-retry-original-request-and-access-original-promise
                    return window.restaurant.refresh_token.then(_=>{
                        error.config.baseURL = undefined;
                        localStorage.setItem(globalConstants.REFRESHING_TOKEN, false);
                        window.restaurant.refresh_token = null;
                        console.log(_.request.url);
                        return Axios.request(error.config);
                    },e=>{
                        store.dispatch(userActions.logout());
                    });
                }else{
                    return window.restaurant.refresh_token.then(_=>{
                        error.config.baseURL = undefined;
                        console.log(_.request.url);
                        return Axios.request(error.config);
                    });
                }
            }  
            if (error.response.status === 404) {
                history.push('/not-found');
            }  
            return Promise.reject(error);
        });
        axios.interceptors.request.use(
            config => {
                let flag = true;
                if(config.url.indexOf('.json')>-1){
                    return config;
                }
                baseApiAddress.forEach(function(item, idx){
                    if(config.url.indexOf(item)>-1){
                        flag = false;
                        return;
                    }
                });
                if(flag){
                    let token = common.getToken();
                    config.headers.Authorization = `Bearer ${token}`;
                }else{
                    config.headers={
                        'Content-Type': 'application/x-www-form-urlencoded'
                    } 
                }
                return config;
            },error => Promise.reject(error)
        );
    },
  };