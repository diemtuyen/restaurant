import actionTypes from '../constants/actionTypes';


function addRecord(report){
    return {
        type: actionTypes.ADD_RECORD,
        reports: report
    }
}

// export function fetchReport(){
//     return dispatch => {
//         return fetch(`/report`)
//         .then( (response) => response.json() )
//         .then( (data) => dispatch(addRecord(data.data)))
//         .catch( (e) => console.log(e) );
//     }    
// }
export function submitReport(data){
    return dispatch => {
        return fetch('/report', { 
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data), 
            mode: 'cors'})
            .then( (response) => response.json() )
            .then( (data) => dispatch(addRecord(data.data)))
            .catch( (e) => console.log(e) );
    }    
}
// export function submitRecord(data){
//     return dispatch => {
//         return fetch(`/report`, { 
//             method: 'POST', 
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//               },
//             body: JSON.stringify(data), 
//             mode: 'cors'})
//             .then( (response) => {
//                 if (!response.ok) {
//                     throw Error(response.statusText);
//                 }else{
//                     dispatch(addRecord(data.data.dtCount, data.data.dtFood, data.data.dtTotal))
//                 }
//             })
//             .catch( (e) => console.log(e) );
//     }    
// }