import config from 'config';
import axios from 'axios';
import ApiEndpoints from '../constants/ApiEndpoints';
export const bookingService = {
    bookingAddTable
};

function bookingAddTable(client, key) {
    // return axios.post(url, searchParams).then(res=>{
    //     if (res.data.access_token) {
    //         localStorage.setItem('user', JSON.stringify(res.data));
    //         return res.data;
    //     }
    // },function(err){reject(err)}).catch(e=>{
    //     console.log(e);
    // });
    return new Promise((resolve, reject) => {
        // do something asynchronous which eventually calls either:
        //
            resolve({client,key});
        // or
        //   reject("failure reason"); // rejected
      });
}
