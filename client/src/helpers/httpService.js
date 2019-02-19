import axios from 'axios';
import {common} from '../helpers/common';
const baseApiAddress = ['/token']
axios.defaults.baseURL="/";
export default {
    setupInterceptors: (store, history) => {  
        axios.interceptors.response.use(response => {
            return response;
        }, error => {  
            if (error.response.status === 401) {
                //https://stackoverflow.com/questions/51563821/axios-interceptors-retry-original-request-and-access-original-promise
                //store.dispatch(logoutUser());
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