import config from 'config';
import axios from 'axios';
import ApiEndpoints from '../constants/ApiEndpoints';
export const detailService = {
    getItems
};

function getItems() {
    let url = `${config.apiUrl}/${ApiEndpoints.detail}/items`;
    return axios.get(url).then(res=>{        
        return res.data.content.items;
    }).catch(e=>{
        console.log(e);
    });
}
