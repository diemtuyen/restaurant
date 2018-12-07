import config from 'config';
import axios from 'axios';
import ApiEndpoints from '../constants/ApiEndpoints';
export const categoryService = {
    getItems,
    addItem,
    deleteItem,
    updateItem
};

function getItems() {
    let url = `${config.apiUrl}/${ApiEndpoints.category}/items`;
    return axios.get(url).then(res=>{        
        return res.data.content.items;
    }).catch(e=>{
        console.log(e);
    });
}
function addItem(obj) {
    console.log(obj); 
    let url = `${config.apiUrl}/${ApiEndpoints.category}`;
    return axios.post(url, obj).then(res=>{
        console.log(res.data.content);
        Promise.resolve(res.data.content);
    },e=>{
        Promise.reject(e);
    });
}
function deleteItem(obj) {
    console.log(obj); 
    let url = `${config.apiUrl}/${ApiEndpoints.category}`;
    return axios.delete(url, { data: { id: obj.id } }).then(res=>{
        console.log(res.data.content);
    });
}
function updateItem(obj) {
    console.log(obj); 
    let url = `${config.apiUrl}/${ApiEndpoints.category}`;
    return axios.put(url, { data: { obj } }).then(res=>{
        console.log(res.data.content);
        Promise.resolve(res.data.content);
    },e=>{
        Promise.reject(e);
    });
}