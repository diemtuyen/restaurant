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
        resolve([
            {
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
            },
            {
                "id": 2,
                "title": "Ban 11",
                "note": "11",
                "modified": null,
                "created": "2019-02-22T04:20:48.007",
                "rowGuid": "03deff00-2c48-4032-8bdc-89d708ca1c40",
                "ofsKey": "f9f7c5df-b697-47fb-bf6d-6bfe10ea2b5d",
                "createdBy": "admin",
                "modifiedBy": null,
                "deleted": null
            },
            {
                "id": 3,
                "title": "Ban undefined",
                "note": "11",
                "modified": null,
                "created": "2019-02-22T06:44:21.8",
                "rowGuid": "53d3d010-33e1-4f4b-8210-4afaf9a8db6f",
                "ofsKey": "f9f7c5df-b697-47fb-bf6d-6bfe10ea2b5d",
                "createdBy": "admin",
                "modifiedBy": null,
                "deleted": null
            },
            {
                "id": 4,
                "title": "Ban 1",
                "note": "aaa",
                "modified": null,
                "created": "2019-02-22T06:45:50.877",
                "rowGuid": "e06818c4-1265-4005-bb3d-375509b998a4",
                "ofsKey": "f9f7c5df-b697-47fb-bf6d-6bfe10ea2b5d",
                "createdBy": "admin",
                "modifiedBy": null,
                "deleted": null
            },
            {
                "id": 5,
                "title": "Ban 1",
                "note": "11",
                "modified": null,
                "created": "2019-02-23T04:35:01.417",
                "rowGuid": "d33a6015-8b2b-4d26-9387-a15be7e9cfc4",
                "ofsKey": "f9f7c5df-b697-47fb-bf6d-6bfe10ea2b5d",
                "createdBy": "admin",
                "modifiedBy": null,
                "deleted": null
            }
        ]);
    });
}