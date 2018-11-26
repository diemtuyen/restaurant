import config from 'config';
import axios from 'axios';
import ApiEndpoints from '../constants/ApiEndpoints';
export const tableService = {
    getListTable
};

function getListTable() {
    let url = `${config.apiUrl}/${ApiEndpoints.table}`;
    return axios.get(url).then(res=>{        
        console.log(res.data);
        return res.data;
    }).catch(e=>{
        console.log(e);
    });
}
