import config from 'config';
import axios from 'axios';
import ApiEndpoints from '../constants/ApiEndpoints';
export const orderService = {
    getItems
};

function getItems() {
    let url = `${config.apiUrl}/${ApiEndpoints.order}/items`;
    return axios.get(url).then(res=>{        
        return res.data.content.items;
    }).catch(e=>{
        console.log(e);
    });
}
