import config from 'config';
import axios from 'axios';
import ApiEndpoints from '../constants/ApiEndpoints';
export const categoryService = {
    getItems
};

function getItems() {
    let url = `${config.apiUrl}/${ApiEndpoints.category}/items`;
    return axios.get(url).then(res=>{        
        return res.data.content.items;
    }).catch(e=>{
        console.log(e);
    });
}
