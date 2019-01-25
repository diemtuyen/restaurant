import config from 'config';
import axios from 'axios';
import ApiEndpoints from '../constants/ApiEndpoints';
export const drinkService = {
    getItems
};

function getItems() {
    let url = `${config.apiUrl}/${ApiEndpoints.drink}/items`;
    return new Promise((resolve, reject) => {
        axios.get(url).then(res=>{
            resolve(res.data.content.items);
        },function(e){
            reject(e);
        });
    });
}