import config from 'config';
import axios from 'axios';
import ApiEndpoints from '../constants/ApiEndpoints';
export const kindService = {
    getItems
};

function getItems() {
    let url = `${config.apiUrl}/${ApiEndpoints.kind}/items`;
    return axios.get(url).then(res=>{        
        return res.data.content.items;
    }).catch(e=>{
        console.log(e);
    });
}
