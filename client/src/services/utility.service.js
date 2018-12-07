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
    return axios.get(url).then(res=>{        
        return res.data.content.items;
    }).catch(e=>{
        console.log(e);
    });
}
function addItem(obj) {
    console.log(obj); 
    let url = `${config.apiUrl}/${ApiEndpoints.utility}`;
    return axios.post(url, obj).then(res=>{
        console.log(res.data.content);
        Promise.resolve(res.data.content);
    },e=>{
        Promise.reject(e);
    });
}
function deleteItem(obj) {
    console.log(obj); 
    let url = `${config.apiUrl}/${ApiEndpoints.utility}`;
    return axios.delete(url, { data: { id: obj.id } }).then(res=>{
        console.log(res.data.content);
    });
}
function updateItem(obj) {
    console.log(obj); 
    let url = `${config.apiUrl}/${ApiEndpoints.utility}`;
    return axios.put(url, { data: { obj } }).then(res=>{
        console.log(res.data.content);
        Promise.resolve(res.data.content);
    },e=>{
        Promise.reject(e);
    });
}