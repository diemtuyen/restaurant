import config from 'config';
import axios from 'axios';
import ApiEndpoints from '../constants/ApiEndpoints';
export const drinkService = {
    getItems
};

function getItems() {
    let url = `${config.apiUrl}/${ApiEndpoints.drink}/items`;
    return new Promise((resolve, reject) => {
        // axios.get(url).then(res=>{
        //     resolve(res.data.content.items);
        // },function(e){
        //     reject(e);
        // });
        resolve([{
            "id": 1,
            "title": "Ban 1",
            "note": null,
            "modified": null,
            "created": "2018-12-31T09:04:21.977",
            "rowGuid": "eec84b90-fc53-4d8e-bee2-16b82d7d1282",
            "ofsKey": "f9f7c5df-b697-47fb-bf6d-6bfe10ea2b5d",
            "createdBy": "admin",
            "modifiedBy": null,
            "deleted": null
        }]);
    });
}