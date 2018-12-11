import config from 'config';
import axios from 'axios';
import ApiEndpoints from '../constants/ApiEndpoints';
export const bookingService = {
    getOrder,
    addOrder,
    getItems
};

function getOrder(client, key) {
    let url = `${config.apiUrl}/${ApiEndpoints.order}/items/${key}`;
    return new Promise((resolve, reject) => {
        axios.get(url).then(res=>{
            resolve(res.data.content.item);
        },function(e){
            reject(e);
        }).catch(e=>{
            reject(e);
        });
    });
    // return new Promise((resolve, reject) => {
    //     // do something asynchronous which eventually calls either:
    //     //
    //         resolve({client,key});
    //     // or
    //     //   reject("failure reason"); // rejected
    //   });
}

function addOrder(orderOjb) {
    let url = `${config.apiUrl}/${ApiEndpoints.order}`;
    return new Promise((resolve, reject) => {
        axios.post(url, orderOjb).then(res=>{
            Promise.resolve(res.data.content);
        },e=>{
            Promise.reject(e);
        });
    });
}
function getItems() {
    let url = `${config.apiUrl}/${ApiEndpoints.order}/items`;
    return axios.get(url).then(res=>{        
        return res.data.content.items;
    }).catch(e=>{
        console.log(e);
    });
}
