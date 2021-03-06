import config from 'config';
import axios from 'axios';
import ApiEndpoints from '../constants/ApiEndpoints';
export const utilityService = {
    getItems,
    addItem,
    deleteItem,
    updateItem
};

function getItems() {
    let url = `${config.apiUrl}/${ApiEndpoints.utility}/items`;
    return new Promise((resolve, reject) => {
        axios.get(url).then(res=>{
            resolve(res.data.content.items);
        },function(e){
            reject(e);
        });
    });
}
function addItem(obj) {
    let url = `${config.apiUrl}/${ApiEndpoints.utility}`;
    return new Promise((resolve,reject)=>{
        axios.post(url, obj).then(res=>{
            resolve(res.data.content);
        },e=>{
            reject(e);
        });
    });
}
function deleteItem(obj) {
    let url = `${config.apiUrl}/${ApiEndpoints.utility}`;
    return new Promise((resolve, reject)=>{
        axios.delete(url, { data: { id: obj.id } }).then(res=>{
            resolve(res.data.content);
        }, e=>{
            reject(e);
        });
    });
}
function updateItem(obj) {
    let url = `${config.apiUrl}/${ApiEndpoints.utility}`;
    return new Promise((resolve, reject)=>{
        axios.put(url, { data: { obj } }).then(res=>{
            resolve(res.data.content);
        },e=>{
            reject(e);
        });
    });
}